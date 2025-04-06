// src/centerPage/centerPage/charts/CandlestickChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CandlestickChart = ({ candlestickData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!candlestickData || !candlestickData.dates || !candlestickData.data) {
      console.error('无效的 K 线图数据:', candlestickData);
      return;
    }

    if (candlestickData.dates.length !== candlestickData.data.length) {
      console.error('日期和数据长度不匹配:', candlestickData);
      return;
    }

    const chart = echarts.init(chartRef.current);

    // 计算 Y 轴的最小值和最大值，增加缓冲
    const values = candlestickData.data.flat();
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    const padding = range * 0.2 || 1000;
    const adjustedMin = minValue - padding;
    const adjustedMax = maxValue + padding;

    const option = {
      backgroundColor: 'rgba(19, 25, 47, 0.6)',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',  // 增加底部空间，显示X轴标签
        top: '5%'      // 减少顶部空间，利用上部区域
      },
      xAxis: {
        type: 'category',
        data: candlestickData.dates,
        boundaryGap: true,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10, // 缩小字体适应新宽度
          rotate: 30
        },
        axisLine: {
          lineStyle: {
            color: '#343f4b'
          }
        }
      },
      yAxis: {
        type: 'value',
        scale: true,
        min: adjustedMin,
        max: adjustedMax,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10 // 缩小字体适应新高度
        },
        axisLine: {
          lineStyle: {
            color: '#343f4b'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#343f4b'
          }
        }
      },
      series: [
        {
          type: 'candlestick',
          data: candlestickData.data,
          itemStyle: {
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a'
          },
          barWidth: '50%' // 缩小柱宽适应新宽度
        }
      ],
      // 滑动条的配置
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 10,           // 降低高度到10px
          bottom: 0,
          backgroundColor: 'rgba(19, 25, 47, 0.3)',  // 使背景更透明
          fillerColor: 'rgba(47, 69, 84, 0.2)',      // 使填充更透明
          borderColor: 'transparent',                // 移除边框
          handleSize: 8,        // 减小手柄大小
          handleStyle: {
            color: '#47dae8',
            opacity: 0.5        // 使手柄半透明
          },
          textStyle: {
            show: false         // 隐藏文本
          },
          showDetail: false,    // 隐藏详细信息
          showDataShadow: false // 隐藏数据阴影
        }
      ]
    };

    chart.setOption(option);

    const resizeChart = () => {
      chart.resize();
    };
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chart.dispose();
    };
  }, [candlestickData]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default CandlestickChart;