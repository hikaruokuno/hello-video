export default (selectedMember = '道重さゆみ', action) => {
  if (action.type === 'SELECTED_MEMBER') {
    return action.payload;
  }
  return selectedMember;
};
