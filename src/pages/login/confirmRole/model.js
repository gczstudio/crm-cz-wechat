import * as confirmRoleApi from './service'

export default {
  namespace: 'confirmRole',
  state: {

  },

  effects: {
    * confirmIdentity({data}, { call }) {
      const { code } = yield call(confirmRoleApi.confirmIdentity, data.data)
      if (code == 0) {
        data.callback()
      }
    },
  },

  reducers: {
  },

};
