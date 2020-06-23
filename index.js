const PORT = 3000;
const passport = require('./setup-passport');
const app = require('express')();
const requireAuth = (req, res, next) => {
  // First, allow logged in user
  if (req.isAuthenticated()) return next();
  // If not logged in, try authenticating with Bearer and fail request if invalid auth
  return passport.authenticate('bearer')(req, res, next);
};

// Setup passport dependencies + middleware
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'zuper-zecret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  let loginLogout;
  if (req.isAuthenticated()) {
    loginLogout = `
        <h2>You are currently: LOGGED IN</h2>
        <h2>Log out</h2>
        <form action="/logout" method="post">
          <input type="submit" value=Log out">
        </form>
        `;
  } else {
    loginLogout = `
        <h2>You are currently: LOGGED OUT</h2>
        <h2>Log in</h2>
        <form action="/login" method="post">
          <label for="username">Username (try "admin"):</label><br>
          <input type="text" id="username" name="username"><br>
          <label for="password">Password (try "password"):</label><br>
          <input type="text" id="password" name="password"><br><br>
          <input type="submit" value="Log in">
        </form>
        `;
  }
  res.send(
    `
    <html>
      <head>
        <title>Fun with Passport.js</title>
      </head>
      <body>
        <h1>Fun with Passport !</h1>
        <p>
          This is a demo site for passport.js. You can log in as human, with the "Local" strategy,
          with username and password, using the form below ("admin" and "password"). You can also
          access protected resources with a bearer token directly ("secret-token")
        </p>
        <p>
          If you are logged in, you can visit <a href="/protected">this page</a>.
          You can also use cURL (changing the token will return 401 Unauthorized):
        </p>
        <p>
          curl localhost:${PORT}/protected -v -H "Authorization: Bearer secret-token"
        </p>
        ${loginLogout}
      </body>
    </html>
    `);
});

app.get(
  '/protected',
  requireAuth,
  (_, res) => res.json({ "secret": "some secret value" })
);

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (_, res) => res.redirect("/")
);

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});


console.log("server starting on port :", PORT);
console.log("");
console.log(`   http://localhost:${PORT}`);
console.log("");
app.listen(PORT);
