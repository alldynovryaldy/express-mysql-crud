const express = require('express');
const app = express();
const port = 3000;

// import routes
const routes = require('./routes');

app.use('/api/post', routes); // use routes

app.listen(port, () => {
  console.log(`Server running in port ${port} ...`);
});
