const express = require('express');
const path = require('path');

const app = express();
const transformDataRouter = require('./routers/transferRouter.js');
const APIRouter = require('./routers/APIRouter.js');

require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/transfer', transformDataRouter); // Generate the Database from the API call

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
  else console.log(`Listening to port: 3000`);
});
