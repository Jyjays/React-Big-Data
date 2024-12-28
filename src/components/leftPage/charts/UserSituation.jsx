import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { userSituationOptions } from './options';

class UserSituation extends PureComponent {
  render() {
    const { userSitua } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: '90%',
        }}
      >
        {userSitua ? (
          <Chart renderer="canvas" option={userSituationOptions(userSitua)} />
        ) : (
          <div style={{ color: 'gray' }}>No data available</div>
        )}
      </div>
    );
  }
}

export default UserSituation;
