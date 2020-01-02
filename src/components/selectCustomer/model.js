import * as selectCustomerApi from './service'

export default {
  namespace: 'selectCustomer',
  state: {
    bankCustomerList: {
      content: []
    },
  },

  effects: {
    * bankCustomerSearch({data}, { call, put }) {
      const { code, payload } = yield call(selectCustomerApi.bankCustomerSearch, data)
      if (code === 0) {
        yield put({ 
          type: 'saveBankCustomer',
          payload: {
            bankCustomerList: JSON.parse(JSON.stringify(payload)),
          }})
      }
    },
  },

  reducers: {
    saveBankCustomer(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
