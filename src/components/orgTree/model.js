import * as orgTreeApi from './service'

export default {
  namespace: 'orgTree',
  state: {
    orgTreeData: {
      childList: [],
      identityUserList: []
    },
    fileInfo: [],
  },

  effects: {
    * getOrgTree({data}, { call, put }) {
      const { code, payload } = yield call(orgTreeApi.getOrgTree, data.data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            orgTreeData: payload,
          }})
          data.callback && data.callback(payload)
      }
    },
    * download({data}, { call, put }) {
      const { code, payload } = yield call(orgTreeApi.download, data)
      if (code === 0) {
        yield put({ type: 'saveFile',
          payload: {
            fileInfo: payload,
          }})
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveFile(state, { payload }) {
      return { ...state, ...payload }
    }
  },

};
