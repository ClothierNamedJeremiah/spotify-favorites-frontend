/* eslint-disable no-param-reassign */
import axios from 'axios';

const CACHE = {};

/**
 *
 * @param {axiosRequestConfig} config
 */
function requestHandler(config) {
  const key = config.url;
  if (config.method === 'GET' || config.method === 'get') {
    if (key in CACHE) {
      // console.log(`%cCache Hit: ${key}`, 'color: #1DB954');
      config.headers.cached = true;
      config.data = JSON.parse(CACHE[key]);
      return Promise.reject(config);
    }
  }
  // console.log(`%cCache Miss: ${key}`, 'color: #FF0033');
  return config;
}

/**
 *
 * @param {AxiosResponse} response
 */
function responseHandler(response) {
  if (response.config.method === 'GET' || response.config.method === 'get') {
    const key = response.config.url;
    CACHE[key] = JSON.stringify(response.data);
  }
  return response;
}

/**
 * Respond to axios errors normally, but if the error was raisied internally (has cached)
 * data, then resolve the error with the cached data
 *
 * @param {any} error
 * @returns {Promise}
 */
function errorHandler(error) {
  if (error.headers && error.headers.cached === true) {
    return Promise.resolve(error);
  }
  return Promise.reject(error);
}

const axiosInstance = axios.create({ baseURL: 'https://api.spotify.com/v1/me/top' });

axiosInstance.interceptors.request.use((config) => requestHandler(config));
axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default axiosInstance;
