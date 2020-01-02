import * as followApi from './service'

export default {
  namespace: 'businessFollow',
  state: {

  },

  effects: {
    * updateBus({data}, { call }) {
      console.log(data)
      const { code } = yield call(followApi.updateBus, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
  },

  reducers: {

  },

};
