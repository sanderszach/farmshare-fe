import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

const tokenString = sessionStorage.getItem('token');
const token = tokenString && JSON.parse(tokenString)?.data?.access_token

axios.defaults.baseURL = API_URL
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export default axios;