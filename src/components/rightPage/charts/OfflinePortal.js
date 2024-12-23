import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { OfflinePortalOptions } from './options';

class OfflinePortal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  render() {
    const { renderer } = this.state;
    const { offlinePortalData } = this.props; // 接收父组件传递的数据
    return (
      <div
        style={{
          width: '7rem',
          height: '5.375rem',
        }}>
        <Chart
          renderer={renderer}
          option={OfflinePortalOptions(offlinePortalData)} // 使用新配置
        />
      </div>
    );
  }
}

export default OfflinePortal;
