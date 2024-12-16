import { getRightPageData } from '../services/index';
export default {
  namespace: 'rightPage',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location, action) => {
        if (location.pathname === '/') {
          dispatch({ type: 'getRightPageData' });
        }
      });
    },
  },

  effects: {
    *getRightPageData({ payload }, { call, put }) {
      const data = yield call(getRightPageData);
      if (data) {
        yield put({
          type: 'setData',
          payload: data,
        });
      } else {
      }
    },
  },

  reducers: {
    setData(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
