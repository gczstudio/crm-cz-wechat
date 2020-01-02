import * as relationMatterApi from './service'

export default {
  namespace: 'relationMatter',
  state: {
    actList: {
      content: []
    },
    businessList: {
      content: []
    },
    bankCustomerList: {
      content: []
    },
  },

  effects: {
    * actSearchByPage({data}, { call, put }) {
      const { code, payload } = yield call(relationMatterApi.actSearchByPage, data)
      if (code === 0) {
        yield put({ type: 'saveAct',
          payload: {
            actList: payload,
          }})
      }
    },
    * businessSearchByPage({data}, { call, put }) {
      const { code, payload } = yield call(relationMatterApi.businessSearchByPage, data)
      if (code === 0) {
        yield put({ type: 'saveBusiness',
          payload: {
            businessList: payload,
          }})
      }
    },
    * bankCustomerSearch({data}, { call, put }) {
      const { code, payload } = yield call(relationMatterApi.bankCustomerSearch, data)
      if (code === 0) {
        yield put({ type: 'saveBankCustomer',
          payload: {
            bankCustomerList: payload,
          }})
      }
    },
  },

  reducers: {
    saveAct(state, { payload }) {
      return { ...state, ...payload }
    },
    saveBusiness(state, { payload }) {
      return { ...state, ...payload }
    },
    saveBankCustomer(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
