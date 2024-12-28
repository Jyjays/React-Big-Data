export const trafficOptions = (params) => {
  const { passengerData, freightData } = params;

  return {
    tooltip: {
      trigger: 'item',
      formatter: (info) => {
        // Custom tooltip formatter to display two items per line
        const { name, value, percent } = info;
        return `${name}: ${value} (${percent}%)<br/>`;
      },
    },
    legend: {
      top: '5%',
      left: 'center',
      orient: 'horizontal', // Align items horizontally
      itemGap: 20, // Spacing between legend items
      textStyle: {
        color: '#c0c9d2',
      },
      formatter: (name) => name, // Optional: Custom formatter for legend text
      pageIconColor: '#c0c9d2', // Add paging controls in case items overflow
    },
    series: [
      {
        name: '客车统计',
        type: 'pie',
        radius: ['20%', '30%'], // Reduce the size of the pie chart (0.8 times original size)
        center: ['30%', '42%'], // Left pie chart position
        data: passengerData,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          color: '#c0c9d2',
        },
      },
      {
        name: '货车统计',
        type: 'pie',
        radius: ['20%', '30%'], // Reduce the size of the pie chart (0.8 times original size)
        center: ['60%', '68%'], // Right pie chart position
        data: freightData,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          color: '#c0c9d2',
        },
      },
    ],
  };
};

export const userSituationOptions = (data) => {
  const partitionedData = data.length > 10
    ? Array.from({ length: 10 }, (_, i) =>
        data[Math.floor((i * data.length) / 10)])
    : data;

  const timeData = partitionedData.map((item) => item.time); // X-axis (time)
  const actualFlow = partitionedData.map((item) => item.actualFlow); // Actual flow
  const predictFlow = partitionedData.map((item) => item.predictFlow); // Predicted flow

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      top: '5%',
      data: ['实际流量', '预测流量'],
      textStyle: {
        color: '#c0c9d2',
      },
    },
    grid: {
      top: '15%',
      left: '10%',
      right: '10%',
      bottom: '10%',
    },
    xAxis: {
      type: 'category',
      data: timeData,
      axisLine: {
        lineStyle: {
          color: '#94b5ca',
        },
      },
      axisLabel: {
        color: '#c0c9d2',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#c0c9d2',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
    series: [
      {
        name: '实际流量',
        type: 'line',
        smooth: true,
        data: actualFlow,
        itemStyle: {
          color: '#00b3f4',
        },
        areaStyle: {
          color: 'rgba(0,179,244,0.3)',
        },
      },
      {
        name: '预测流量',
        type: 'line',
        smooth: true,
        data: predictFlow,
        itemStyle: {
          color: '#00ca95',
        },
        areaStyle: {
          color: 'rgba(0,202,149,0.3)',
        },
      },
    ],
  };
};
