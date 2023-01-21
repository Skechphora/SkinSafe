const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({ path: './.env' })
//const PORT = process.env.PORT
//process env is not working
const PORT = 3000;


app.get('/', (req, res)=> {
  res.sendFile(path.resolve(__dirname,'../index.html'))
})

//api-route for fetch request, what do we need for route? login
app.use('/api', (req, res) => {

})




//404 not find page, can be put an html page there also, unknown route
app.use('*', (req, res, next) => {
  res.status(404).json({error: '404 Page not found'});
})

//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
  }

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);

})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening to port: ${PORT}`);
})