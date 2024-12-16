import { getCenterPageData } from '../services/index';
export default {
  namespace: 'centerPage',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/') {
          dispatch({ type: 'getCenterPageData' });
        }
      });
    },
  },

  effects: {
    *getCenterPageData({ payload }, { call, put }) {
      const data = yield call(getCenterPageData);
      if (data) {
        yield put({
          type: 'setData',
          payload: data,
        });
      } else {
        console.log(`获取中间数据数据失败`);
      }
    },
  },

  reducers: {
    setData(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
