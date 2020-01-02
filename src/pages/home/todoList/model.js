import * as todoListApi from './service'

export default {
  namespace: 'todoList',
  state: {
    todoLists: [],
    currentDetail: {}
  },

  effects: {
    * searchTaskReminds(_, { call, put }) {
      const { code, payload } = yield call(todoListApi.searchTaskReminds, {})
      if (code == 0) {
        yield put({ type: 'save',
          payload: {
            todoLists: payload,
          }})
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveCurrentDetail(state, { payload }) {
      console.log(payload)
      return { ...state, ...payload }
    }
  },

};
