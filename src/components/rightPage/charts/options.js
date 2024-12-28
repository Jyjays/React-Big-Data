import echarts from 'echarts/lib/echarts';

export const BrowseCategoriesOptions = params => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // Use shadow indicator
    },
  },
  legend: {
    data: ['入站数量'],
    textStyle: {
      color: '#BCDCFF',
    },
    top: '10%',
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '25%',
    containLabel: true,
  },
  xAxis: {
    type: 'value', // X-axis as value axis (horizontal)
    axisLine: {
      show: false, // Hide the X-axis main line
    },
    axisLabel: {
      textStyle: {
        color: '#BCDCFF',
        fontSize: 12,
      },
    },
    splitLine: {
      lineStyle: {
        color: '#252938',
      },
    },
  },
  yAxis: {
    type: 'category', // Y-axis as category axis
    data: params.map(item => item.category), // Use categories
    axisLine: {
      lineStyle: {
        color: '#94b5ca',
      },
    },
    axisLabel: {
      textStyle: {
        color: '#BCDCFF',
        fontSize: 12,
      },
    },
  },
  series: [
    {
      name: '入站数量',
      type: 'bar',
      stack: '总量', // Stack bars together
      data: params.map(item => item.inflow),
      barWidth: '30%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#5A8BFA' },
          { offset: 1, color: '#32C5E9' },
        ]),
      },
    },
  ],
});


export const OfflinePortalOptions = params => {
  // Generate random outbound flow and process the data
  const processedData = params.map(item => ({
    time: item.time,
    inbound: item.count, // Inbound flow (count)
  }));
  console.log(JSON.stringify(params))

  // Split data into 10 equal parts and take the first value of each part
  const splitData = [];
  const splitSize = Math.ceil(processedData.length / 10);
  for (let i = 0; i < processedData.length; i += splitSize) {
    splitData.push(processedData[i]);
  }

  // Reduce x-axis labels to five evenly spaced labels
  const xAxisLabels = splitData.map(item => item.time);
  const labelCount = 10;
  const reducedLabels = xAxisLabels.filter((_, index) => index % Math.ceil(xAxisLabels.length / labelCount) === 0);

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      data: ['入站流量'],
      textStyle: {
        color: '#BCDCFF',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: reducedLabels, // Use reduced x-axis labels
      axisLine: {
        lineStyle: {
          color: '#94b5ca',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#BCDCFF',
          fontSize: 12,
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '车辆流量',
        axisLine: {
          show: false, // Remove y-axis main line
        },
        axisLabel: {
          textStyle: {
            color: '#BCDCFF',
            fontSize: 12,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#252938',
          },
        },
      },
    ],
    series: [
      {
        name: '入站流量',
        type: 'bar',
        data: splitData.map(item => item.inbound), // Use inbound flow data
        barWidth: '30%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#5A8BFA' },
              { offset: 1, color: '#32C5E9' },
            ]),
          },
        },
      }
    ],
  };
};
