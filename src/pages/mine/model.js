import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {

  },

  effects: {
    * confirmIdentity({data}, { call }) {
      const { code } = yield call(mineApi.confirmIdentity, data.data)
      if (code == 0) {
        data.callback()
      }
    },
    * logout({data}, { call }) {
      const { code } = yield call(mineApi.logout, {})
      if (code == 0) {
        data.callback()
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
