import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { trafficOptions } from './options';

class TrafficSituation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  processData = (data) => {
    const passengerData = [
      { name: '一型车（客）', value: data.find((d) => d.hpzl === 1) ? data.find((d) => d.hpzl === 1).count : 0 },
      { name: '二型车（客）', value: data.find((d) => d.hpzl === 2) ? data.find((d) => d.hpzl === 2).count : 0 },
    ];

    const freightData = [
      { name: '一型车（货）', value: data.find((d) => d.hpzl === 3) ? data.find((d) => d.hpzl === 3).count : 0 },
      { name: '二型车（货）', value: data.find((d) => d.hpzl === 4) ? data.find((d) => d.hpzl === 4).count : 0 },
    ];

    return { passengerData, freightData };
  };

  render() {
    const { renderer } = this.state;
    const { trafficSitua } = this.props;

    const processedData =
      trafficSitua && trafficSitua.length > 0
        ? this.processData(trafficSitua)
        : { passengerData: [], freightData: [] };

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {trafficSitua ? (
          <Chart renderer={renderer} option={trafficOptions(processedData)} />
        ) : (
          <div style={{ color: 'gray' }}>No data available</div>
        )}
      </div>
    );
  }
}

export default TrafficSituation;

