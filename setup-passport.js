const passport = require('passport');

// LOCAL STRATEGY
// For login/password auth
const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(
    (username, password, done) => {
      if (username === 'admin' && password === 'password') {
        done(null, { username });
      } else if (!username) {
        done(new Error("Username is required."));
      } else if (!password) {
        done(new Error("Password is required."));
      } else {
        done(null, false);
      }
    }
  )
);

// Fully serialize the user in the session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((serialized, done) => done(null, serialized));

// HTTP BEARER STRATEGY
// For API auth
const BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(
  new BearerStrategy(
    (token, done) => {
      if (token === 'secret-token') {
        done(null, { username: 'token-user' });
      } else {
        done(null, false);
      }
    }
  )
);

module.exports = passport;
