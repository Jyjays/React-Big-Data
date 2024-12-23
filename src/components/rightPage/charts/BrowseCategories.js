import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { BrowseCategoriesOptions } from './options';

class BrowseCategories extends PureComponent {
  render() {
    // 假数据：每个类别包含入口流量和出口流量
    const fakeData = [
      { category: '广州东站', inflow: 30, outflow: 10 },
      { category: '广州南站', inflow: 50, outflow: 20 },
      { category: '深圳西站', inflow: 60, outflow: 15 },
      { category: '汕尾站', inflow: 60, outflow: 25 },
      { category: '揭阳站', inflow: 70, outflow: 30 },
    ];

    return (
      <div
        style={{
          width: '7rem',
          height: '6rem',
        }}>
        <Chart
          renderer="canvas"
          option={BrowseCategoriesOptions(fakeData)}
        />
      </div>
    );
  }
}

export default BrowseCategories;
