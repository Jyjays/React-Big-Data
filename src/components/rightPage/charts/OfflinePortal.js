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
          position: 'relative', // 设置为相对定位
          width: '7rem',
          height: '5.375rem',
        }}>
        {/* 左上角显示 BC 的文字 */}
        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 10,
          }}
        >
          BC
        </div>
        <Chart
          renderer={renderer}
          option={OfflinePortalOptions(offlinePortalData)} // 使用新配置
        />
      </div>
    );
  }
}

export default OfflinePortal;