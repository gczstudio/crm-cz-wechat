import * as potentialCustomerApi from './service'

export default {
  namespace: 'potentialCustomer',
  state: {

  },

  effects: {
    * create({data}, { call }) {
      const { code } = yield call(potentialCustomerApi.create, data.data)
      if (code === 0) {
        data.callback&& data.callback()
      }
    },
  },

  reducers: {

  },

};
