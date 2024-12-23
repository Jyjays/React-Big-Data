import React, { PureComponent } from 'react';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import BrowseCategories from './charts/BrowseCategories';
import OfflinePortal from './charts/OfflinePortal';
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import {
  RightPage,
  RightTopBox,
  RightCenterBox,
  RightBottomBox,
} from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offline: null,
    };
  }

  componentDidMount() {
    // 获取部署服务器上的数据
    fetch('http://120.46.31.49:8080/etc/kkllpm')
      .then(response => response.json())
      .then(data => {
        this.setState({
          offline: {
            offlinePortalData: data,
          },
        });
      })
      .catch(error => console.error('数据获取失败:', error));
  }

  render() {
    const { offline, browseCategories} = this.state;
    return (
      <RightPage>
        <RightTopBox>
        <BorderBox13 className='right-bottom-borderBox13'>
          <div className='right-bottom'>
            <ModuleTitle>
              <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}>&#xe7fd;</i>
              <span style={{ textAlign: 'center', marginLeft: '150px' }}>入站口排行榜</span>
            </ModuleTitle>
            <div className='right-top-content'>
              <BrowseCategories
                browseCategories={browseCategories}></BrowseCategories>
            </div>
          </div>
          </BorderBox13>
        </RightTopBox>

        <RightBottomBox>
          <BorderBox13 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle><i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}>&#xe790;</i>
              <span style={{ textAlign: 'center', marginLeft: '120px' }}>24小时车辆流量动态数据图</span></ModuleTitle>
              <div className='offline-portal-box'>
                {offline ? (
                  <OfflinePortal
                    offlinePortalData={offline.offlinePortalData} // 使用实时数据
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </RightPage>
    );
  }
}

export default connect()(index);
