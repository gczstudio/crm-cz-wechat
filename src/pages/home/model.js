import * as homeApi from './service'

export default {
  namespace: 'home',
  state: {
    msgLen: 0
  },

  effects: {
    * searchSnList({data}, { call }) {
      const { code, payload } = yield call(homeApi.searchSnList, {})
      if (code === 0) {
        data.callback&&data.callback(payload || [])
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
