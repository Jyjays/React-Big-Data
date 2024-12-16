import React, { PureComponent } from 'react';
import { userOptions } from './options';
import { ScrollBoard } from '@jiaminghi/data-view-react';

class UserSituation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        headerBGC: '#443dc5',
        oddRowBGC: '#09184F',
        evenRowBGC: '#070C34',
        index: true,
        indexHeader: '序号',
        columnWidth: [50, 100, 200],
        align: ['center'],
        rowNum: 10,
      },
    };
  }

  render() {
    const { userSitua } = this.props;
    const config = {
      ...this.state.config,
      ...userOptions(userSitua),
    };

    return (
      <div>
        {userSitua ? (
          <ScrollBoard
            config={config}
            style={{
              width: '5.475rem',
              height: '6.875rem',
            }}></ScrollBoard>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default UserSituation;
