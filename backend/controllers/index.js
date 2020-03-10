module.exports.controller = app => {
  // get homepage
  app.get('/', (req, res) => {
    // res.render('index', { title: 'Express' });
    res.json({ message: 'API Initialized!' });
  });
};
