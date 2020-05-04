export default (selectedVideo = null, action) => {
  if (action.type === 'SELECTED_VIDEO') {
    return action.payload;
  }
  return selectedVideo;
};
