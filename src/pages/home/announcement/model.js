import * as announcementApi from './service'

export default {
  namespace: 'announcement',
  state: {
    announcementList: {
      content: []
    }
  },

  effects: {
    * searchReceiveAnnouncement({data}, { call, put }) {
      const { code, payload } = yield call(announcementApi.searchReceiveAnnouncement, data)
      if (code === 0) {
        yield put({ type: 'save',
          payload: {
            announcementList: payload,
          } })
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

};
