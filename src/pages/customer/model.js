import * as customerApi from './service'

export default {
  namespace: 'customer',
  state: {
    customerList: {
      content: []
    }
  },
  effects: {
    * bankCustomerTable({data}, { call, put }) {
      const { code, payload } = yield call(customerApi.bankCustomerTable, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            customerList: payload,
          } 
        })
      }
    },
    * bankCustomerSearchAll({data}, { call, put }) {
      const { code, payload } = yield call(customerApi.bankCustomerSearchAll, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            customerList: payload,
          } 
        })
      }
    },
    * subCustomerSearch({data}, { call, put }) {
      const { code, payload } = yield call(customerApi.subCustomerSearch, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            customerList: payload,
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
