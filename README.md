# Spotify Favorites
Spotify Favorites is a personalized dashboard that displays your most listened to songs and artists in Spotify.


## Repository Content
The following repository contains all the code and configuration files necessary to both deploy the React app to production and run the application locally.

```
./
 |- src/: application source code
 |- .babelrc.json: babel configuration
 |- .eslintrc.json: eslint configuration 
 |- postcss.config.js: postcss configuration
 |- webpack.common.js: shared webpack configuration
 |- webpack.dev.js: development specific webpack configuration
 |- webpack.prod.js: production specific webpack configuration
```


## Getting Started

1. Install all the dependencies `npm install`
2. Run the devlopment server `npm start`
3. Build the site for production `npm build`, this will create a `dist/` folder with all the resources needed to deploy the website.
