const express = require('express');
const path = require('path');
const app = express();
const transRoute = require('./routers/transferRouter.js')
require('dotenv').config({ path: './.env' })
const PORT = process.env.PORT
// const PORT = 3000;

// const searchRouter = require('./routes/searchRouter');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//at homepage - on endpoint main, send main page to front end
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.use('/transfer', transRoute);

//receive req(GET) from frontend get data from database and sent it
/*app.post('/api', middleware, (req, res) => {
  res.status(200).json(res.locals.product);
});
*/
//Login[stretch]

//404 not find page, can be put an html page there also, unknown route
app.use('*', (req, res, next) => {
  res.status(404).json({ error: '404 Page not found' });
});

//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening to port: ${PORT}`);
});
