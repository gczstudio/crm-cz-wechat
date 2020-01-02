import * as loginApi from './service'

export default {
  namespace: 'login',
  state: {
    roleData: {
      identity: []
    }
  },

  effects: {
    * login({data}, { call, put }) {
      console.log(data, 222)
      const { code, payload } = yield call(loginApi.login, data.data)
      if (code === 0) {
        data.callback(payload)
        yield put({ type: 'saveRole',
          payload: {
            roleData: payload,
          } })
      }
    },
  },

  reducers: {
    saveRole(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
