// src/centerPage/centerPage/charts/TransactionScroll.js
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const TransactionScroll = ({ transactionData }) => {
  const chartRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0); // 控制显示数据的起始索引
  const displayCount = 5; // 固定显示 5 条数据

  useEffect(() => {
    // 数据验证
    if (!transactionData || !Array.isArray(transactionData)) {
      console.error('无效的交易数据:', transactionData);
      return;
    }

    const chart = echarts.init(chartRef.current);

    // 准备数据
    const data = transactionData.map(item => ({
      contract: item.contract,
      date: item.date,
      volume: item.volume,
      amount: item.amount,
    }));

    // 表格列定义
    const columns = [
      { title: '时间', key: 'date', width: 150 },
      { title: '合约', key: 'contract', width: 100 },
      { title: '成交量', key: 'volume', width: 100 },
      { title: '成交额', key: 'amount', width: 100 },
    ];

    // 计算总宽度
    const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);

    // 鼠标滚轮事件处理
    const handleWheel = event => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 1 : -1; // 向下滚动 deltaY > 0，向上滚动 deltaY < 0
      setStartIndex(prevIndex => {
        let newIndex = prevIndex + delta;
        if (newIndex < 0) newIndex = 0; // 限制起始索引不小于 0
        if (newIndex > data.length - displayCount) newIndex = data.length - displayCount; // 限制起始索引不超过最大值
        if (newIndex < 0) newIndex = 0; // 防止负值
        return newIndex;
      });
    };

    // 添加滚轮事件监听
    const chartDom = chartRef.current;
    chartDom.addEventListener('wheel', handleWheel);

    // 仅显示当前范围内的数据
    const visibleData = data.slice(startIndex, startIndex + displayCount);

    const option = {
      backgroundColor: 'rgba(19, 25, 47, 0.6)',
      grid: {
        left: '5%',
        right: '5%',
        top: '0%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        show: false, // 隐藏 X 轴
        min: 0,
        max: totalWidth,
      },
      yAxis: {
        type: 'category',
        data: Array(displayCount).fill('').map((_, index) => index), // 固定 5 条数据的 Y 轴类别
        inverse: true, // 倒序显示（最新数据在顶部）
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          type: 'custom',
          renderItem: (params, api) => {
            const categoryIndex = api.value(0); // Y 轴索引
            const rowIndex = startIndex + categoryIndex; // 实际数据索引
            const rowData = rowIndex < data.length ? data[rowIndex] : null;
            const rowHeight = api.size([0, 1])[1]; // 每行高度
            const xOffset = 0;

            const elements = [];
            let x = xOffset;

            // 渲染表头（仅在第一行显示）
            if (categoryIndex === 0) {
              columns.forEach((col, colIndex) => {
                const text = col.title;
                const textCoord = api.coord([x, categoryIndex - 0.5]); // 表头在上方
                elements.push({
                  type: 'text',
                  style: {
                    x: textCoord[0] + col.width / 2,
                    y: textCoord[1],
                    text,
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    fill: '#bcdcff',
                    fontSize: 18, // 增大表头字体
                  },
                });
                x += col.width;
              });
            }

            // 渲染表格内容
            if (rowData) {
              x = xOffset;
              columns.forEach((col, colIndex) => {
                const text = col.key === 'volume' || col.key === 'amount'
                  ? Number(rowData[col.key]).toLocaleString()
                  : rowData[col.key].toString();
                const textCoord = api.coord([x, categoryIndex]);
                elements.push({
                  type: 'text',
                  style: {
                    x: textCoord[0] + col.width / 2,
                    y: textCoord[1] + rowHeight / 2,
                    text,
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    fill: '#bcdcff',
                    fontSize: 16, // 增大内容字体
                  },
                });
                x += col.width;
              });

              // 添加分隔线
              const lineY = api.coord([0, categoryIndex + 1])[1];
              elements.push({
                type: 'line',
                shape: {
                  x1: api.coord([0, categoryIndex])[0],
                  y1: lineY,
                  x2: api.coord([totalWidth, categoryIndex])[0],
                  y2: lineY,
                },
                style: {
                  stroke: '#343f4b',
                  lineWidth: 1,
                },
              });
            }

            return {
              type: 'group',
              children: elements,
            };
          },
          data: Array(displayCount).fill(0).map((_, index) => [index]), // 固定 5 条数据的索引
        },
      ],
    };

    chart.setOption(option);

    const resizeChart = () => {
      chart.resize();
    };
    window.addEventListener('resize', resizeChart);

    return () => {
      chartDom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', resizeChart);
      chart.dispose();
    };
  }, [transactionData, startIndex]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default TransactionScroll;