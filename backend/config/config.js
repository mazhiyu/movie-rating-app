module.exports = {
  development: {
    db: {
      host: 'localhost',
      port: '27017',
      name: 'movie_rating',
    },
    sessionSecret: 'movieratingappsecretkey',
    cors: {
      allowOrigin: ['http://localhost:8080'],
    },
  },

  production: {
    db: {
      host: '',
      port: '',
      name: '',
    },
    sessionSecret: '',
    cors: {
      allowOrigin: ['', '', ''],
    },
  },
};
