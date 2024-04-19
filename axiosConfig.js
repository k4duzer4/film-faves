import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '35dff10e3f2d8b07ed926313e0ef06b0'
  }
});

export default axiosInstance;
