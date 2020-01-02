import * as businessFollowApi from './service'

export default {
  namespace: 'businessFollowList',
  state: {
    businessList: {
      content: []
    }
  },

  effects: {
    * businessSearchByPage({data}, { call, put }) {
      const { code, payload } = yield call(businessFollowApi.businessSearchByPage, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            businessList: payload,
          }})
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
