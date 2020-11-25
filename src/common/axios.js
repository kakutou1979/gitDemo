import axios from 'axios';

const CommonAxios = axios.create({
  baseURL: 'https://www.stylehint.com',
  timeout: 1000,
  headers: {'accept-region': 'us'},
});

export default CommonAxios;