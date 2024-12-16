import React, { PureComponent, Fragment } from 'react';
import { formatTime } from '../../utils';
import {
  Decoration10,
  Decoration8,
  Decoration6,
} from '@jiaminghi/data-view-react';

import { TopBox, TimeBox } from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      timeStr: '',
      weekday: [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ],
    };
  }

  componentDidMount() {
    this.setTimingFn();
  }

  setTimingFn() {
    this.timing = setInterval(() => {
      let dateYear = formatTime(new Date(), 'yyyy-MM-dd');
      let dateDay = formatTime(new Date(), 'HH: mm: ss');
      let dateWeek = this.state.weekday[new Date().getDay()];
      this.setState({
        timeStr: `${dateYear} | ${dateDay} ${dateWeek}`,
      });
    }, 1000);
  }

  render() {
    const { title } = this.state;
    return (
      <Fragment>
        <TopBox>
          <div className='top_box'>
            <div className='title-box'>
              <div className='title'>
                <span className='title-text'>{title}</span>
              </div>
            </div>
            <TimeBox>
              <h3>{this.state.timeStr}</h3>
            </TimeBox>
          </div>
        </TopBox>
      </Fragment>
    );
  }
}

export default index;
