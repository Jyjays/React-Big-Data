import React, { PureComponent } from 'react';
import { CenterPage, CenterBottom } from './style';
import { connect } from 'dva';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '../../style/globalStyledSet';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      etcData: [], // Store fetched data
    };
    this.scrollRef = React.createRef(); // Reference to the scrolling container
  }

  componentDidMount() {
    // Fetch data from API
    fetch('http://120.46.31.49:8080/etc/selectIncrementEtc')
      .then(response => response.json())
      .then(data => {
        // Repeat the data 3 times
        const repeatedData = [...data, ...data, ...data,...data, ...data, ...data,];
        this.setState({ etcData: repeatedData }, this.startScrolling);
      })
      .catch(error => console.error('Failed to fetch data:', error));
  }

  startScrolling = () => {
    const scrollContainer = this.scrollRef.current;
    if (!scrollContainer) return;

    const scrollHeight = scrollContainer.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;

    // Reset scroll position to the top if reached the bottom
    const scrollStep = () => {
      if (scrollContainer.scrollTop + containerHeight >= scrollHeight) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 1; // Scroll step
      }
    };

    this.scrollInterval = setInterval(scrollStep, 50); // Adjust speed (50ms per step)
  };

  componentWillUnmount() {
    // Clear interval when the component unmounts
    clearInterval(this.scrollInterval);
  }

  render() {
    const { etcData } = this.state;

    // Map hpzl to display "一类" when hpzl is 1
    const mapPlateType = hpzl => {
      switch (hpzl) {
        case 1:
          return '一类';
        default:
          return '其他'; // Default value if hpzl is not 1
      }
    };

    return (
      <CenterPage>
        <CenterBottom>
          <BorderBox13 className='center-bottom-borderBox13'>
          <div className="center-bottom">
            <div className="detail-list">
              <ModuleTitle>
                <i className='iconfont' style={{ marginLeft: '10px' }}>&#xe7fd;</i>
                <span style={{ marginLeft: '230px' }}>入站口排行榜</span>
              </ModuleTitle>
              <div className="detail-list-header">
                <span>车牌号</span>
                <span>车牌种类</span>
                <span>入站时间</span>
                <span>入口名称</span>
                <span>出口名称</span>
                <span>备注</span>
              </div>
              <div className="detail-list-scroll" ref={this.scrollRef}>
                {etcData && etcData.length > 0 ? (
                  etcData.map((item, index) => (
                    <div className="detail-list-item" key={index}>
                      <span>{item.hphm}</span>
                      <span>{mapPlateType(item.hpzl)}</span>
                      <span>{new Date(item.fxsj).toLocaleString()}</span>
                      <span>{item.kkmc}</span>
                      <span>{item.xzqhmc}</span>
                      <span>{item.fxlx === 0 ? '深出口' : '深入口'}</span>
                    </div>
                  ))
                ) : (
                  <div className="detail-list-empty">暂无数据</div>
                )}
              </div>
            </div>
            </div>
          </BorderBox13>
        </CenterBottom>
      </CenterPage>
    );
  }
}

export default connect()(Index);
