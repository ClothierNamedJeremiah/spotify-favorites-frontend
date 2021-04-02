const prod = {
  url: {
    LOGIN_URL: 'https://spotify-favorites-heroku.herokuapp.com/login',
  },
};
const dev = {
  url: {
    LOGIN_URL: 'http://localhost:3001/login',
  },
};

const config = process.env.NODE_ENV === 'development'
  ? dev
  : prod;

export default config;
