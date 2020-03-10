const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

module.exports.controller = app => {
  // add a new movie
  app.post('/movies', async (req, res) => {
    const movie = new Movie({
      name: req.body.name,
      description: req.body.description,
      released: req.body.released,
      genre: req.body.genre,
      runtime: req.body.runtime,
    });

    await movie.save();
    res.send(movie);
  });

  // fetch total number of movies
  app.get('/movies/total', async (req, res) => {
    const total = await Movie.estimatedDocumentCount({});

    res.send({ total });
  });

  // fetch all the movies
  app.get('/movies', async (req, res) => {
    let { offset, limit } = req.query;

    offset = parseInt(offset) || 0;
    limit = Math.min(parseInt(limit) || 6, 6);

    const movies = await Movie.find(
      {},
      'name description released genre runtime'
    )
      .sort({ released: -1 })
      .skip(offset)
      .limit(limit);

    res.send({ movies });
  });

  // fetch a single movie
  app.get('/movies/:id', async (req, res) => {
    const movie = await Movie.findById(
      req.params.id,
      'name description released genre runtime'
    );
    res.send(movie);
  });

  // rate a movie
  app.post('/movies/rate/:id', async (req, res) => {
    const rating = new Rating({
      movieID: req.params.id,
      userID: req.body.userID,
      rate: req.body.rate,
    });

    await rating.save();

    res.send({
      movieID: rating.movieID,
      userID: rating.userID,
      rate: rating.rate,
    });
  });
};
