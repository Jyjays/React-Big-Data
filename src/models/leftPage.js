import { getLeftPageData } from '../services/index';
export default {
  namespace: 'leftPage',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/') {
          dispatch({ type: 'getLeftPageData' });
        }
      });
    },
  },

  effects: {
    *getLeftPageData({ payload }, { call, put }) {
      const data = yield call(getLeftPageData);
      if (data) {
        yield put({
          type: 'setData',
          payload: data,
        });
      } else {
        console.log(`获取左侧数据数据失败`);
      }
    },
  },

  reducers: {
    setData(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
