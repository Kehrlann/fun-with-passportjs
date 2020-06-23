const passport = require('./setup-passport');
const app = require('express')();

// Setup passport dependencies + middleware
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'zuper-zecret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send('hello world');
});

const port = 3000;
console.log("server starting on port : ", port);
console.log("");
console.log("   http://localhost:" + port);
console.log("");
app.listen(port);
