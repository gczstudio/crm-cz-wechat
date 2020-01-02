import * as detailApi from './service'

export default {
  namespace: 'customerDetail',
  state: {
    detailInfo: {},
    basicInfo: {},
    findInfo: {},
    timeInfo: {},
    productInfo: {},
    tagList: []
  },

  effects: {
    * getCustomerDetailDoc({data}, { call, put }) {
      //先置为空
      yield put({ type: 'save',
        payload: {
          detailInfo: {},
        } 
      })
      const { code, payload } = yield call(detailApi.getCustomerDetailDoc, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            detailInfo: payload,
          } 
        })
      }
    },
    * getCustomerInfoBasicDoc({data}, { call, put }) {
      yield put({ type: 'save',
        payload: {
          basicInfo: {},
        } 
      })
      const { code, payload } = yield call(detailApi.getCustomerInfoBasicDoc, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            basicInfo: payload,
          } 
        })
      }
    },
    * findByNo({data}, { call, put }) {
      yield put({ type: 'save',
        payload: {
          findInfo: {},
        } 
      })
      const { code, payload } = yield call(detailApi.findByNo, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            findInfo: payload[0],
          } 
        })
      }
    },
    * getContactTime({data}, { call, put }) {
      yield put({ type: 'save',
        payload: {
          timeInfo: {},
        } 
      })
      const { code, payload } = yield call(detailApi.getContactTime, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            timeInfo: payload,
          } 
        })
      }
    },
    * getCustomerHoldProductDoc({data}, { call, put }) {
      yield put({ type: 'save',
        payload: {
          productInfo: {},
        } 
      })
      const { code, payload } = yield call(detailApi.getCustomerHoldProductDoc, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            productInfo: payload || {},
          } 
        })
      }
    },
    * getCustomerTag({data}, { call, put }) {
      const { code, payload } = yield call(detailApi.getCustomerTag, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            tagList: payload,
          } 
        })
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },

};
