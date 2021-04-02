import React from 'react';

import constants from '../constants';

const Login = () => (
  <div className="login__wrapper">
    <div className="login__container">
      <div className="login__title">
        <h1 className="fs-extra-large">Spotify Favorites</h1>
        <h2 className="fs-large fw-normal">Discover your most listened to songs and artists in Spotify.</h2>
      </div>
      <div className="login__action">
        <p>To continue, log in to Spotify.</p>
        <a className="login__link" href={constants.url.LOGIN_URL}>Login</a>
      </div>
    </div>
  </div>
);

export default Login;
