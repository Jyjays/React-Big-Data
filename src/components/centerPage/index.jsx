// src/centerPage/centerPage/index.jsx
import React, { PureComponent } from 'react';
import { BorderBox12 } from '@jiaminghi/data-view-react';
import CandlestickChart from './charts/CandlestickChart';
import TransactionScroll from './charts/TransactionScroll'; // 引入新的滚动组件
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import { CenterPage, CandlestickChartBox, CenterTop, CenterBottom, TransactionScrollBox } from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      candlestickData: null,
      transactionData: null, // 添加交易数据状态
    };
  }

  componentDidMount() {
    this.loadCandlestickData();
    this.loadTransactionData(); // 初次加载交易数据
    this.fetchIntervalCandlestick = setInterval(this.loadCandlestickData, 60000); // 每分钟更新 K 线图
    this.fetchIntervalTransaction = setInterval(this.loadTransactionData, 10000); // 每 10 秒更新交易数据
  }

  componentWillUnmount() {
    clearInterval(this.fetchIntervalCandlestick);
    clearInterval(this.fetchIntervalTransaction);
  }

  loadCandlestickData = async () => {
    fetch('http://localhost:8080/dailyMarket/candlestick')
      .then(response => response.json())
      .then(data => {
        this.setState({
          candlestickData: data,
        });
      })
      .catch(error => console.error('K 线图数据获取失败:', error));
  };

  loadTransactionData = async () => {
    fetch('http://localhost:8080/dailyMarket/getTransactions')
      .then(response => response.json())
      .then(data => {
        this.setState({
          transactionData: data,
        });
      })
      .catch(error => console.error('交易数据获取失败:', error));
  };

  render() {
    const { candlestickData, transactionData } = this.state;

    return (
      <CenterPage>
        <CenterTop>
          <BorderBox12 className='center-borderBox'>
            <div className='center-content'>
              <ModuleTitle>
                <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}>📈</i>
                <span style={{ textAlign: 'center', marginLeft: '120px' }}>期货 K 线图</span>
              </ModuleTitle>
              <CandlestickChartBox>
                {candlestickData ? (
                  <CandlestickChart candlestickData={candlestickData} />
                ) : (
                  <div>加载中...</div>
                )}
              </CandlestickChartBox>
            </div>
          </BorderBox12>
        </CenterTop>

        <CenterBottom>
          {/* 添加交易滚动界面 */}
          <BorderBox12 className='center-bottom-borderBox13'>
            <div className='center-bottom'>
              <ModuleTitle>
                <i className='iconfont' style={{ textAlign: 'center', marginLeft: '10px' }}>📜</i>
                <span style={{ textAlign: 'center', marginLeft: '120px' }}>交易记录</span>
              </ModuleTitle>
              <TransactionScrollBox className='feedback-box'>
                {transactionData ? (
                  <TransactionScroll transactionData={transactionData} />
                ) : (
                  <div>加载中...</div>
                )}
              </TransactionScrollBox>
            </div>
          </BorderBox12>
        </CenterBottom>

      </CenterPage>
    );
  }
}

export default connect()(index);
