// src/centerPage/centerPage/charts/PieChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ prefixAmounts }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 数据验证
    if (!prefixAmounts || typeof prefixAmounts !== 'object') {
      console.error('无效的扇形图数据:', prefixAmounts);
      return;
    }

    const chart = echarts.init(chartRef.current);

    // 准备扇形图数据
    const data = Object.entries(prefixAmounts).map(([name, value]) => ({
      name: name.toUpperCase(),
      value: value,
    }));

    const option = {
      backgroundColor: 'rgba(19, 25, 47, 0.6)',
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: '成交金额',
          type: 'pie',
          radius: ['40%', '70%'], // 内外半径，设置成环形图
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%',
            color: '#bcdcff',
            fontSize: 12,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            lineStyle: {
              color: '#bcdcff',
            },
          },
          data: data,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2,
          },
          color: ['#ff6f61', '#6b5b95', '#feb236', '#d64161', '#88b04b'], // 自定义颜色
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
  }, [prefixAmounts]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PieChart;