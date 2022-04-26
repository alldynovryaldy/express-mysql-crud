const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(
  bodyParser.json(), // parse application/json
  bodyParser.urlencoded({ extended: false }), // parse application/x-www-form-urlencoded
  routes // use routes
);

app.listen(port, () => {
  console.log(`Server running in port ${port} ...`);
});
