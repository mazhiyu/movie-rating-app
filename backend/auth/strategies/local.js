const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

module.exports.init = app => {
  // local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.getUserByEmail(email);
          if (!user) {
            return done(null, false, {
              message: `${email} doesn't exist!`,
            });
          }

          const isMatch = await User.comparePassword(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password!' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    // field `id` is virtual getter in mongoose, equal to '_id'
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
