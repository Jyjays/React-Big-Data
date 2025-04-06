import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { BrowseCategoriesOptions } from './options';

class BrowseCategories extends PureComponent {
  render() {
    const { volumeData } = this.props;

    // 提取期货名称和对应的成交量
    const contracts = Object.keys(volumeData.volumes); // ["sc", "bc", "nr", "lu", "ec"]
    const volumes = contracts.map(contract => volumeData.volumes[contract][0]); // 提取第一个月份的成交量

    // 构建数据供图表使用
    const processedData = contracts.map((contract, index) => ({
      category: contract.toUpperCase(), // 将期货名称转为大写（如 "SC"）
      volume: volumes[index], // 对应成交量
    }));

    return (
      <div
        style={{
          width: '7rem',
          height: '6rem',
        }}
      >
        <Chart
          renderer="canvas"
          option={BrowseCategoriesOptions(processedData)}
        />
      </div>
    );
  }
}

export default BrowseCategories;