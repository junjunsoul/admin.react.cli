import api from '@/authority/services/setting'
import { post } from '@/utils/request';
export default {
  namespace: 'setting',
  state: {},
  effects: {
    *getApiList({ payload, callback }, { call, put }) {
      const response = yield call(post, api.getApiList.url, payload);
      callback && callback(response);
    },
    *storeApi({ payload, callback }, { call, put }) {
      const response = yield call(post, api.storeApi.url, payload);
      callback && callback(response);
    },
    *getApiInfo({ payload, callback }, { call, put }) {
      const response = yield call(post, api.getApiInfo.url, payload);
      callback && callback(response);
    },
    *roleSelect({ payload, callback }, { call, put }) {
      const response = yield call(post, api.roleSelect.url, payload);
      callback && callback(response);
    },
    *roleList({ payload, callback }, { call, put }) {
      const response = yield call(post, api.roleList.url, payload);
      callback && callback(response);
    },
    *roleStore({ payload, callback }, { call, put }) {
      const response = yield call(post, api.roleStore.url, payload);
      callback && callback(response);
    },
    *roleInfo({ payload, callback }, { call, put }) {
      const response = yield call(post, api.roleInfo.url, payload);
      callback && callback(response);
    },
    *roleAuthInfo({ payload, callback }, { call, put }) {
      const response = yield call(post, api.roleAuthInfo.url, payload);
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
