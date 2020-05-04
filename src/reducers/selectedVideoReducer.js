export default (selectedVideo = null, action) => {
  console.log(selectedVideo);
  if (action.type === 'SELECTED_VIDEO') {
    return action.payload;
  }
  return selectedVideo;
};
