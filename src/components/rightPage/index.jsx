import React, { PureComponent } from 'react';
import { BorderBox12 } from '@jiaminghi/data-view-react';
import BrowseCategories from './charts/BrowseCategories';
import OfflinePortal from './charts/OfflinePortal';
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import {
  RightPage,
  RightTopBox,
  RightBottomBox,
} from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offline: null,
      browseCategories: [], // Added state for BrowseCategories data
    };
  }

  componentDidMount() {
    // Initial fetch
    this.loadOfflinePortalData();
    this.loadBrowseCategoriesData();
    // Set up interval to fetch data every minute
    this.fetchInterval = setInterval(this.loadOfflinePortalData, 1000);
    this.fetchInterval = setInterval(this.loadBrowseCategoriesData, 1000);
  }

  componentWillUnmount() {
    // Clear intervals when the component unmounts
    clearInterval(this.fetchInterval);
  }

  loadOfflinePortalData = async () => {
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
  };

  loadBrowseCategoriesData = async () => {
    fetch('http://120.46.31.49:8080/etc/kklltop5')
      .then(response => response.json())
      .then(data => {
        this.setState({
          browseCategories: data
        });
      })
      .catch(error => console.error('数据获取失败:', error));
  };

  render() {
    const { offline, browseCategories} = this.state;

    return (
      <RightPage>
        <RightTopBox>
        <BorderBox12 className='right-bottom-borderBox13'>
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
          </BorderBox12>
        </RightTopBox>

        <RightBottomBox>
          <BorderBox12 className='right-bottom-borderBox13'>
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
          </BorderBox12>
        </RightBottomBox>
      </RightPage>
    );
  }
}

export default connect()(index);
