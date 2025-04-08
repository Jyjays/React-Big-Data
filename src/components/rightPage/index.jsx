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
      browseCategories: null, // Changed from [] to null
      isLoading: true, // Added loading state
    };
  }

  componentDidMount() {
    // Initial fetch
    this.loadOfflinePortalData();
    this.loadBrowseCategoriesData();
    // Set up interval to fetch data every 10 seconds (corrected to avoid overwriting)
    this.fetchIntervalOffline = setInterval(this.loadOfflinePortalData, 10000);
    this.fetchIntervalBrowse = setInterval(this.loadBrowseCategoriesData, 10000);
  }

  componentWillUnmount() {
    // Clear intervals when the component unmounts
    clearInterval(this.fetchIntervalOffline);
    clearInterval(this.fetchIntervalBrowse);
  }

  loadOfflinePortalData = async () => {
    fetch('http://localhost:8080/dailyMarket/getSettleLineData')
      .then(response => response.json())
      .then(data => {
        this.setState({
          offline: {
            offlinePortalData: data,
          },
          isLoading: false, // Set loading to false when data is fetched
        });
      })
      .catch(error => console.error('数据获取失败:', error));
  };

  loadBrowseCategoriesData = async () => {
    fetch('http://localhost:8080/dailyMarket/getVolumeBarData')
      .then(response => response.json())
      .then(data => {
        this.setState({
          browseCategories: data,
          isLoading: false, // Set loading to false when data is fetched
        });
      })
      .catch(error => console.error('数据获取失败:', error));
  };

  render() {
    const { offline, browseCategories, isLoading } = this.state;

    return (
      <RightPage>
        <RightTopBox>
          <BorderBox12 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle>
                <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}></i>
                <span style={{ textAlign: 'center', marginLeft: '150px' }}>期货交易量视图</span>
              </ModuleTitle>
              <div className='right-top-content'>
                {isLoading || !browseCategories ? (
                  <div>加载中...</div> // Show loading message while data is fetching
                ) : (
                  <BrowseCategories volumeData={browseCategories} /> // Pass data as volumeData
                )}
              </div>
            </div>
          </BorderBox12>
        </RightTopBox>

        <RightBottomBox>
          <BorderBox12 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle>
                <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}></i>
                <span style={{ textAlign: 'center', marginLeft: '120px' }}>期货结算价格动态数据图</span>
              </ModuleTitle>
              <div className='offline-portal-box'>
                {offline ? (
                  <OfflinePortal offlinePortalData={offline.offlinePortalData} />
                ) : (
                  <div>加载中...</div> // Show loading message for offline data
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