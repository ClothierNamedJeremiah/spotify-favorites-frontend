// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import loadable from '@loadable/component' 

import Login from 'components/Login';
const Dashboard = loadable(() => import('components/Dashboard'));

import 'styles/index';
import useSessionStorage from './hooks/useSessionStorage';

const App = () => {
  const [accessToken, setAccessToken] = useSessionStorage('access_token');

  useEffect(() => {
    if (!accessToken) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlParamsAccessToken = urlParams.get('access_token');
      if (urlParamsAccessToken) {
        const startIndexOfSearchParams = window.location.href.indexOf('?');
        const urlWithoutSearchParams = window.location.href.substring(0, startIndexOfSearchParams);
        window.history.replaceState({}, document.title, urlWithoutSearchParams);
        setAccessToken(urlParamsAccessToken);
      }
    }
  });

  if (accessToken) {
    // return import()
      // .then((Dashboard) => (
      return (
        <div>
          <Dashboard accessToken={accessToken} />
        </div>
      );
      // ));
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default hot(App);
