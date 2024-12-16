import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import TrafficSituation from './charts/TrafficSituation';
import UserSituation from './charts/UserSituation';
import { connect } from 'dva';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { userSitua, trafficSitua, accessFrequency, peakFlow } = this.props;
    return (
      <LeftPage>
        <LeftTopBox>
          <BorderBox12 className='left-top-borderBox12'>
            <div className='left-top'>
              <ModuleTitle>
                <i className='iconfont'>&#xe78f;</i>
              </ModuleTitle>
              <TrafficSituation trafficSitua={trafficSitua}></TrafficSituation>
            </div>
          </BorderBox12>
        </LeftTopBox>
      </LeftPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessFrequency: state.leftPage.accessFrequency,
    peakFlow: state.leftPage.peakFlow,
    userSitua: state.leftPage.userSitua,
    trafficSitua: state.leftPage.trafficSitua,
  };
};

const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);
