const passport = require('passport');
const User = require('../models/User');

module.exports.controller = app => {
  // user register
  app.post('/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });

    try {
      // override the cleartext password with the hashed one
      user.password = await User.hashPassword(user.password);
      await user.save();

      res.send({ user });
    } catch (err) {
      res.status(422).json({
        message: 'Something went wrong. Please try again after some time!',
      });
    }
  });

  // user login
  app.post('/users/login', passport.authenticate('local', {}), (req, res) => {
    res.redirect('/');
  });

  // user logout
  app.get('/users/logout', (req, res) => {
    req.logout();
    res.send();
  });

  // current user
  app.get('/users/current', isLoggedIn, (req, res) => {
    if (req.user) {
      res.send({ currentUser: req.user });
    } else {
      res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  });
};

function isLoggedIn(req, res, next) {
  // console.log(req.session);
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
  console.log('error! auth failed');
}
