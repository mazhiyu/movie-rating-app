const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

module.exports.controller = (app) => {
  // add a new movie
  app.post('/movies', (req, res) => {
    const movie = new Movie({
      name: req.body.name,
      description: req.body.description,
      released: req.body.released,
      genre: req.body.genre,
      runtime: req.body.runtime
    });

    movie.save((err, movie) => {
      if (err) { console.log(err); }
      res.send(movie);
    });
  });

  // fetch total number of movies
  app.get('/movies/total', (req, res) => {
    Movie.estimatedDocumentCount({}, (err, count) => {
      if (err) { console.log(err); }
      res.send({ total: count });
    });
  });

  // fetch all the movies
  app.get('/movies', (req, res) => {
    let { offset, limit } = req.query;

    offset = parseInt(offset) || 0;
    limit = Math.min(parseInt(limit) || 6, 6);

    Movie.find({}, 'name description released genre runtime')
      .sort({ released: -1 })
      .skip(offset)
      .limit(limit)
      .exec((err, movies) => {
        if (err) { console.log(err); }
        res.send({ movies });
      });
  });

  // fetch a single movie
  app.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, 'name description released genre runtime', (err, movie) => {
      if (err) { console.log(err); }
      res.send(movie);
    });
  });

  // rate a movie
  app.post('/movies/rate/:id', (req, res) => {
    const rating = new Rating({
      movieID: req.params.id,
      userID: req.body.userID,
      rate: req.body.rate
    });

    rating.save((err, rating) => {
      if (err) { console.log(err); }
      res.send({
        movieID: rating.movieID,
        userID: rating.userID,
        rate: rating.rate
      });
    });
  });
};
