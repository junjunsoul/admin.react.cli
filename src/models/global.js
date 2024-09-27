const GlobalModel = {
  namespace: 'global',
  state: {
    documentTitle: 'Ant Design Pro',
    theme:'TOP'
  },
  effects: {

  },
  reducers: {
    saveState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
};
export default GlobalModel;
