import * as createApi from './service'

export default {
  namespace: 'businessCreate',
  state: {
    detailData: {},
  },

  effects: {
    * create({data}, { call }) {
      const { code } = yield call(createApi.create, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * update({data}, { call }) {
      const { code } = yield call(createApi.update, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * businessSearchById({data}, { call, put }) {
      const { code, payload } = yield call(createApi.businessSearchById, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            detailData: payload,
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
