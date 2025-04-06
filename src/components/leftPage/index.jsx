import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox,ScatterChartBox, PieChartBox } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox12 } from '@jiaminghi/data-view-react';

import { connect } from 'dva';
import styled from 'styled-components';
import ScatterChart from './charts/ScatterChart'; // 新增散点图组件
import PieChart from './charts/PieChart';
import { pie } from '@jiaminghi/data-view-react/lib/index-fcdce9c7';


class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      scatterData: null, // 新增散点图数据状态
      pieData: null, // 新增饼图数据状态
    };
  }

  componentDidMount() {
    this.loadScatterData(); // 初次加载散点图数据
    this.loadPieData(); // 初次加载饼图数据
    this.fetchIntervalScatter = setInterval(this.loadScatterData, 10000);
    this.fetchIntervalPie = setInterval(this.loadPieData, 10000); // 每10秒加载一次数据
  }

  componentWillUnmount() {
    clearInterval(this.fetchIntervalScatter);
  }
  loadScatterData = async () => {
    fetch('http://localhost:8080/dailyMarket/getPriceVolumeScatterData') // 假设接口地址
      .then(response => response.json())
      .then(data => {
        this.setState({
          scatterData: data,
        });
      })
      .catch(error => console.error('散点图数据获取失败:', error));
  };
  loadPieData = async () => { 
    fetch('http://localhost:8080/dailyMarket/getAmount') // 假设接口地址
      .then(response => response.json())
      .then(data => {
        this.setState({
          pieData: data,
        });
      })
      .catch(error => console.error('饼图数据获取失败:', error));
  }

  render() {
    const { scatterData, pieData } = this.state;

    return (
      <LeftPage>
        <LeftTopBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#59276;</i>
                <span style={{ marginLeft: '130px' }}>成交金额分布</span>
              </ModuleTitle>
              <PieChartBox>
                {pieData ? (
                  <PieChart prefixAmounts={pieData} />
                ) : (
                  <div>加载中...</div>
                )}
              </PieChartBox>
            </div>
          </BorderBox12>
        </LeftTopBox>
        <LeftBottomBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}>📈</i>
                <span style={{ textAlign: 'center', marginLeft: '150px' }}>成交量-价格散点图</span>
              </ModuleTitle>
              <ScatterChartBox>
                {scatterData ? (
                  <ScatterChart scatterData={scatterData} />
                ) : (
                  <div>加载中...</div>
                )}
              </ScatterChartBox>
            </div>
          </BorderBox12>
        </LeftBottomBox>
      </LeftPage>
    );
  }
}

export default connect()(Index);
