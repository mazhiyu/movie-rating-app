const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

module.exports.init = (app) => {
  // local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) { console.log(err); }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  }));

  passport.serializeUser((user, done) => {
    // field `id` is virtual getter in mongoose, equal to '_id'
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
