import * as followApi from './service'

export default {
  namespace: 'customerFollow',
  state: {
    followList: []
  },

  effects: {
    * createFollow({data}, { call }) {
      const { code } = yield call(followApi.createFollow, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * getFollow({data}, { call, put }) {
      const { code, payload } = yield call(followApi.getFollow, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            followList: payload,
          } 
        })
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
