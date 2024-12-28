import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox12 } from '@jiaminghi/data-view-react';
import TrafficSituation from './charts/TrafficSituation';
import UserSituation from './charts/UserSituation';
import { connect } from 'dva';
import styled from 'styled-components';

// 定义样式化的下拉框组件
const StyledSelect = styled.select`
  position: absolute;
  top: 30px;
  right: 10px;
  border: none;
  border-radius: 10px;
  width: 4rem;
  background-color: rgba(19, 25, 47, 0.6);
  color: #c0c9d2;
  font-size: 0.2rem;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0; /* 去除内边距 */
  text-align: left;
  text-indent: 0;

  /* 设置展开下拉列表的最大高度和滚动 */
  option {
    background-color: rgba(19, 25, 47, 0.9);
    color: #c0c9d2;
    padding: 0.5rem;
  }

  /* 限制下拉框展开选项的高度 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #47dae8; /* 滚动条的颜色 */
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(19, 25, 47, 0.6); /* 滚动条轨道背景 */
  }

  /* 设置下拉框展开时的最大高度和滚动行为 */
  select {
    max-height: 3rem; /* 设置下拉框展开列表的高度 */
    overflow-y-auto;
  }
`;

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trafficSitua: null,
      userSitua: null,
      error: null,
      selectedKkmc: "江苏省徐州市新沂市S323连徐线K96瓦窑检查站市际卡口"
    };
  }

  componentDidMount() {
    this.fetchTrafficData();
    this.fetchUserData();
    this.fetchInterval = setInterval(() => {
      this.fetchTrafficData();
      this.fetchUserData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  fetchTrafficData = async () => {
    try {
      const response = await fetch('http://120.46.31.49:8080/etc/countHpzl');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ trafficSitua: data });
    } catch (error) {
      console.error('Failed to fetch traffic data:', error);
      this.setState({ error: 'Failed to load traffic data.' });
    }
  };

  fetchUserData = async () => {
    const { selectedKkmc } = this.state;
    try {
      const response = await fetch(`http://120.46.31.49:8080/etc/kkllforecast?kkmc=${encodeURIComponent(selectedKkmc)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ userSitua: data });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      this.setState({ error: 'Failed to load user data.' });
    }
  };

  handleKkmcChange = (event) => {
    this.setState({ selectedKkmc: event.target.value }, () => {
      this.fetchUserData();
    });
  };

  render() {
    const { trafficSitua, userSitua, error, selectedKkmc } = this.state;
    const kkmc = [
      "徐州市邳州市S250宿邳线K1江苏徐州-S250-苏鲁界省际卡口",
      "徐州市丰县鹿梁路K19丰县梁寨检查站市际卡口",
      "徐州市邳州市S251枣睢线K5江苏徐州-S251-苏鲁界省际卡口",
      "徐州市睢宁县S325淮宿线K63(325省道)63K+100M东侧-向西卡口市际卡口",
      "G3京台高速K731江苏高速五大队江苏徐州-G3-苏鲁界省际卡口",
      "徐州市铜山县G311徐州-西峡K207江苏徐州-G311-苏皖界省际卡口",
      "徐州市铜山县G310连云港-天水K310江苏徐州-G310-苏皖界省际卡口",
      "徐州市丰县G518518国道K358马楼公路站省际卡口",
      "徐州市沛县S253郑沛龙线K0江苏徐州-S253-苏鲁界省际卡口",
      "徐州市新沂市S323连徐线K10阿湖卡口-323省道连云港交界市际卡口",
      "徐州市睢宁县G104北京-福州K873江苏徐州-G104-苏皖界省际卡口",
      "徐州市铜山县G104北京-福州K744江苏徐州-G104-苏鲁界省际卡口",
      "徐州市铜山县G206烟台-汕头K816江苏徐州-G206-苏皖界省际卡口",
      "徐州市新沂市S505505省道K10新沂高速西出口-505省道宿迁界市际卡口",
      "江苏省徐州市新沂市S323连徐线K96瓦窑检查站市际卡口",
      "徐州市睢宁县S252塔双线K56江苏徐州-S252-苏皖界省际卡口",
      "徐州市睢宁县S324燕沭睢线K201省道桑庄王马路路口西侧-向东卡口市际卡口",
      "徐州市新沂市G235国道235K10江苏徐州-G235-交界市际卡口",
      "徐州市丰县G237国道237线K148荣庄卡口省际卡口"
    ];

    return (
      <LeftPage>
        <LeftTopBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#59276;</i>
                <span style={{ marginLeft: '130px' }}>各车型数量统计</span>
              </ModuleTitle>
              {error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : (
                <TrafficSituation trafficSitua={trafficSitua} />
              )}
            </div>
          </BorderBox12>
        </LeftTopBox>
        <LeftBottomBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#59279;</i>
                <span style={{ marginLeft: '130px' }}>出站口流量实时预警</span>
              </ModuleTitle>
              <StyledSelect
                  value={selectedKkmc}
                  onChange={this.handleKkmcChange}
                >
                  {kkmc.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </StyledSelect>
              {error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : (
                <UserSituation userSitua={userSitua} />
              )}
            </div>
          </BorderBox12>
        </LeftBottomBox>
      </LeftPage>
    );
  }
}

export default connect()(Index);
