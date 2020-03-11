export default (state = [], actions) => {
  switch (actions.type) {
    case 'FETCH_VIDEO':
      return actions.payload;
    default:
      return state;
  }
};
