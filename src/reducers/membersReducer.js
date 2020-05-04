export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_MEMBER':
      console.log('reducer', action.payload);
      return action.payload;
    case 'CLEAR_MEMBER':
      return action.payload;
    default:
      return state;
  }
};
