import * as detailApi from './service'

export default {
  namespace: 'announcementDetail',
  state: {
    detailData: {
      replyCommentList: [],
      files: []
    }
  },

  effects: {
    * announcementDetail({data}, { call, put }) {
      yield put({ type: 'saveFile',
        payload: {
          files: [],
        } 
      })
      const { code, payload } = yield call(detailApi.announcementDetail, data.data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            detailData: payload,
          } 
        })
        data.callback&&data.callback(payload)
        if(payload.relationFileId&&payload.relationFileId.length>0){
          yield put({ 
            type: 'batchGetFile',
            data: {
              ids: payload.relationFileId.join(',')
            } 
          })
        }
      }
    },
    * batchGetFile({data}, { call, put }) {
      const { code, payload } = yield call(detailApi.batchGetFile, data)
      if (code === 0) {
        yield put({ type: 'saveFile',
          payload: {
            files: payload,
          } 
        })
      }
    },
    * saveReplyComment({data}, { call }) {
      const { code } = yield call(detailApi.saveReplyComment, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    * reportReplyComment({data}, { call }) {
      const { code } = yield call(detailApi.reportReplyComment, data.data)
      if (code === 0) {
        data.callback&&data.callback()
      }
    },
    
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveFile(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
