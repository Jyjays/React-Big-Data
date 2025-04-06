import echarts from 'echarts/lib/echarts';

export const BrowseCategoriesOptions = params => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 使用阴影指示器
      },
    },
    legend: {
      data: ['成交量'], // 图例名称改为“成交量”
      textStyle: {
        color: '#BCDCFF',
      },
      top: '10%',
    },
    grid: {
      left: '3%',
      right: '20%',
      bottom: '15%',
      top: '25%',
      containLabel: true,
    },
    xAxis: {
      type: 'log', // 保持对数刻度
      min: 100000, // 设置最小值
      logBase: 10, // 对数基数为 10
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#BCDCFF',
          fontSize: 12,
        },
        formatter: function (value) {
          // 将对数刻度的值转为完整数字
          return Math.round(value).toLocaleString(); // 使用 toLocaleString() 格式化为完整数字
        },
      },
      splitLine: {
        lineStyle: {
          color: '#252938',
        },
      },
    },
    yAxis: {
      type: 'category', // Y 轴为分类轴，显示期货名称
      data: params.map(item => item.category), // 期货名称
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
        name: '成交量', // 数据系列名称改为“成交量”
        type: 'bar',
        stack: '总量', // 保持堆叠设置（单系列时无影响）
        data: params.map(item => item.volume), // 成交量数据
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#5A8BFA' },
            { offset: 1, color: '#32C5E9' },
          ]),
        },
      },
    ],
  };
};


export const OfflinePortalOptions = params => {
  // Generate random outbound flow and process the data
  // const processedData = params.map(item => ({
  //   time: item.time,
  //   inbound: item.count, // Inbound flow (count)
  // }));
  // console.log(JSON.stringify(params))

  // // Split data into 10 equal parts and take the first value of each part
  // const splitData = [];
  // const splitSize = Math.ceil(processedData.length / 10);
  // for (let i = 0; i < processedData.length; i += splitSize) {
  //   splitData.push(processedData[i]);
  // }

  // // Reduce x-axis labels to five evenly spaced labels
  // const xAxisLabels = splitData.map(item => item.time);
  // const labelCount = 10;
  // const reducedLabels = xAxisLabels.filter((_, index) => index % Math.ceil(xAxisLabels.length / labelCount) === 0);
  // 提取 dates 和 settles
  const { dates, settles } = params;

  // 验证数据
  if (!dates || !settles || dates.length !== settles.length) {
    console.error('无效的折线图数据:', params);
    return {};
  }
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
      data: ['结算价格'],
      textStyle: {
        color: '#BCDCFF',
      },
    },
    grid: {
      left: '3%',
      right: '20%',
      bottom: '10%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dates,
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
        name: '结算价格',
        max: Math.max(...settles) + 2000, // get the max value from the data
        // get the min value from the data
        min: Math.min(...settles) - 2000,
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
        name: '结算价格',
        type: 'bar',
        data: settles,
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
