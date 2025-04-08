import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const CandlestickChart = ({ candlestickData }) => {
  const chartRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState('BC'); // 默认显示 BC

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
      title: {
        text: currentTitle, // 动态标题
        left: 'left',
        top: 'top',
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
        },
      },
      backgroundColor: 'rgba(19, 25, 47, 0.6)',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '5%',
      },
      xAxis: {
        type: 'category',
        data: candlestickData.dates,
        boundaryGap: true,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10,
          rotate: 30,
        },
        axisLine: {
          lineStyle: {
            color: '#343f4b',
          },
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        min: adjustedMin,
        max: adjustedMax,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10,
        },
        axisLine: {
          lineStyle: {
            color: '#343f4b',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#343f4b',
          },
        },
      },
      series: [
        {
          type: 'candlestick',
          data: candlestickData.data,
          itemStyle: {
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a',
          },
          barWidth: '50%',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 10,
          bottom: 0,
          backgroundColor: 'rgba(19, 25, 47, 0.3)',
          fillerColor: 'rgba(47, 69, 84, 0.2)',
          borderColor: 'transparent',
          handleSize: 8,
          handleStyle: {
            color: '#47dae8',
            opacity: 0.5,
          },
          textStyle: {
            show: false,
          },
          showDetail: false,
          showDataShadow: false,
        },
      ],
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
  }, [candlestickData, currentTitle]); // 依赖 currentTitle，切换时更新图表

  const handleTitleChange = () => {
    // 在 BC、EC、LU 之间切换
    setCurrentTitle((prevTitle) => {
      if (prevTitle === 'BC') return 'EC';
      if (prevTitle === 'EC') return 'LU';
      return 'BC';
    });
  };

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <button
          onClick={handleTitleChange}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
            backgroundColor: 'transparent', // 设置背景为透明
            color: '#ffffff', // 确保文字颜色可见
            border: 'none', // 移除边框
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >

        </button>
        <div
          ref={chartRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
};

export default CandlestickChart;