import * as messageApi from './service'

export default {
  namespace: 'message',
  state: {
    messageList: []
  },

  effects: {
    * searchSnList({data}, { call, put }) {
      const { code, payload } = yield call(messageApi.searchSnList, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            messageList: payload,
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
