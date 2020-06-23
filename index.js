console.log('hello !');

const app = require('express')();


app.get('/', (req, res, next) => {
  res.send('hello world');
});

const port = 3000;
console.log("server starting on port : ", port);
console.log("");
console.log("   http://localhost:" + port);
console.log("");
app.listen(port);
