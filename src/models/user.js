import api from '@/authority/services/api'
import { post } from '@/utils/request';
import { history } from '@umijs/max';
export default {
  namespace: 'user',
  state: {
    currentUser: {},
    authority: []
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(post, api.login.url, payload);
      callback && callback(response);
    },
    *modifyPassword({ payload, callback }, { call, put }) {
      const response = yield call(post, api.password.url, payload);
      callback && callback(response);
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(post, api.logout.url, payload);
      if (response.code==200) {
        history.push({
          pathname: '/user/login',
        })
        yield put({ type: 'clearCurrentUser' });
      }
    },
    *fetchCurrent({ payload, callback }, { call, put }) {
      const response = yield call(post, api.getUserInfo.url);
      if (response.code==200) {
        const data = response.data;
        let currentUser = data.user_info;
        let authority = data.auth_api_list.filter(item => item).map(path => path.toLocaleLowerCase());
        //缓存信息
        yield put({
          type: 'saveState',
          payload: {
            currentUser,
            authority,
          },
        });
      }
      callback && callback(response);
    },
    *commonUrl({ payload, url, callback }, { call, put }) {
      const response = yield call(post, url, payload);
      callback && callback(response);
    },
  },

  reducers: {
    clearCurrentUser(state) {
      return {
        ...state,
        currentUser: {}
      };
    },
    saveState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
