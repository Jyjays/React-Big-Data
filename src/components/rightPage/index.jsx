import React, { PureComponent } from 'react';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import BrowseCategories from './charts/BrowseCategories';
import UserIdentityCategory from './charts/UserIdentityCategory';
import OfflinePortal from './charts/OfflinePortal';
import Feedback from './charts/Feedback';
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
    this.state = {};
  }
  render() {
    const { offline, browseCategories, userIdentityCategory } = this.props;
    return (
      <RightPage>
        <RightTopBox>
          <div className='right-top'>
            <ModuleTitle>
              <i className='iconfont'>&#xe7f7;</i>
            </ModuleTitle>
            <div className='right-top-content'>
              <BrowseCategories
                browseCategories={browseCategories}></BrowseCategories>

            </div>
          </div>
        </RightTopBox>

        <RightCenterBox>
          <ModuleTitle>
            <i className='iconfont'>&#xe7fd;</i>
          </ModuleTitle>
          <UserIdentityCategory
            userIdentityCategory={userIdentityCategory}></UserIdentityCategory>
        </RightCenterBox>

        <RightBottomBox>
          <BorderBox13 className='right-bottom-borderBox13'>
            <div className='right-bottom'>
              <ModuleTitle>
                <i className='iconfont'>&#xe790;</i>
              </ModuleTitle>
              <div className='feedback-box'>
                {offline
                  ? offline.feedback.map((item, index) => {
                      return (
                        <div className='feedback-box-item' key={index}>
                          <Feedback FeedbackData={item}></Feedback>
                          <span className='dis-text'>{item.title}</span>
                        </div>
                      );
                    })
                  : ''}
              </div>
              <div className='offline-portal-box'>
                {offline ? (
                  <OfflinePortal
                    offlinePortalData={offline.offlinePortalData}
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

const mapStateToProps = state => {
  return {
    browseCategories: state.rightPage.browseCategories,
    userIdentityCategory: state.rightPage.userIdentityCategory,
    offline: state.rightPage.offline,
  };
};

const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);
