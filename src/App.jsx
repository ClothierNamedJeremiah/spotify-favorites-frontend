// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';

import Dashboard from 'components/Dashboard';
import Login from 'components/Login';

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
    return (
      <div className="App">
        <Dashboard accessToken={accessToken} />
      </div>
    );
  }

  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default hot(App);
