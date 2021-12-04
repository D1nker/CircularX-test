import axios from 'axios';

export default axios.create({
  baseURL: 'http://fakeapi.jsonparseronline.com/',
  headers: {
    'Content-type': 'application/json'
  }
});
