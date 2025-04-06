// src/centerPage/centerPage/charts/ScatterChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ScatterChart = ({ scatterData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 数据验证
    if (
      !scatterData ||
      !scatterData.contract ||
      !scatterData.volumes ||
      !scatterData.prices ||
      scatterData.volumes.length !== scatterData.prices.length
    ) {
      console.error('无效的散点图数据:', scatterData);
      return;
    }

    const chart = echarts.init(chartRef.current);

    // 准备散点图数据
    const data = scatterData.volumes.map((volume, index) => [
      scatterData.prices[index], // X 轴：价格
      volume, // Y 轴：成交量
      scatterData.contract, // 附加信息：合约名称
    ]);

    // 计算 X 和 Y 轴的范围，添加缓冲
    const prices = scatterData.prices;
    const volumes = scatterData.volumes;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minVolume = Math.min(...volumes);
    const maxVolume = Math.max(...volumes);
    const priceRange = maxPrice - minPrice;
    const volumeRange = maxVolume - minVolume;
    const pricePadding = priceRange * 0.1 || 100;
    const volumePadding = volumeRange * 0.1 || 1000;

    const option = {
      backgroundColor: 'rgba(19, 25, 47, 0.6)',
      tooltip: {
        trigger: 'item',
        formatter: params => {
          const [price, volume, contract] = params.data;
          return `合约: ${contract}<br/>价格: ${price.toLocaleString()}<br/>成交量: ${volume.toLocaleString()}`;
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        name: '价格',
        nameTextStyle: {
          color: '#bcdcff',
          fontSize: 12,
        },
        min: minPrice - pricePadding,
        max: maxPrice + pricePadding,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10,
          formatter: value => value.toLocaleString(),
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
      yAxis: {
        type: 'value',
        name: '成交量',
        nameTextStyle: {
          color: '#bcdcff',
          fontSize: 12,
        },
        min: minVolume - volumePadding,
        max: maxVolume + volumePadding,
        axisLabel: {
          color: '#bcdcff',
          fontSize: 10,
          formatter: value => value.toLocaleString(),
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
          type: 'scatter',
          data: data,
          symbolSize: 10,
          itemStyle: {
            color: '#47dae8',
          },
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
  }, [scatterData]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ScatterChart;