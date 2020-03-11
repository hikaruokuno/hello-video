import axios from 'axios';
// const KEY = 'AIzaSyCQzzez-TsGCMp3KV65isy13WPCfm5kj8E';
const KEY = 'AIzaSyAIjbur3MvNnRzRAHah6hnsBBdt31OwOVM';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
    // pageToken: 'CAUQAA'
    // order: 'date'
  }
});
