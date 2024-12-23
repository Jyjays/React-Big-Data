import echarts from 'echarts/lib/echarts';

export const BrowseCategoriesOptions = params => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 使用阴影指示器
    },
  },
  legend: {
    data: ['该站点客车入口数量', '该站点货车入口数量'],
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
    type: 'value', // x 轴为数值轴（水平）
    axisLine: {
      show: false, // 取消 y 轴主轴线
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
    type: 'category', // y 轴为类别轴
    data: params.map(item => item.category), // 使用类别数据
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
      name: '该站点客车入口数量',
      type: 'bar',
      stack: '总量', // 堆叠到一起
      data: params.map(item => item.outflow),
      barWidth: '30%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#5A8BFA' },
          { offset: 1, color: '#32C5E9' },
        ]),
      },
    },
    {
      name: '该站点货车入口数量',
      type: 'bar',
      stack: '总量', // 堆叠到一起
      data: params.map(item => item.inflow),
      barWidth: '30%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#FFD700' },
          { offset: 1, color: '#FFA500' },
        ]),
      },
    },
  ],
});

export const OfflinePortalOptions = params => ({
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
    data: ['出口流量', '进口流量'],
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
    data: params.map(item => item.time),
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
      name: '车辆流量          \n',
      axisLine: {
        show: false, // 取消 y 轴主轴线
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
      name: '出口流量',
      type: 'bar',
      data: params.map(item => item.count), // 使用数据源的 count 值
      barWidth: '30%',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5A8BFA' },
            { offset: 1, color: '#32C5E9' },
          ]),
        },
      },
    },
    {
      name: '进口流量',
      type: 'line',
      data: params.map(item => item.count / 2), // 假设另一组数据为原数据的一半
      smooth: true,
      lineStyle: {
        color: '#FFD700', // 设置线条颜色为黄色
      },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: '#FFD700', // 设置小球颜色与线条颜色相同
        },
      },
    },
  ],
});
