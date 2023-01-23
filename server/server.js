const express = require('express');
const path = require('path');
const app = express();
const transRoute = require('./routers/transferRouter.js')
require('dotenv').config({ path: './.env' })
const PORT = process.env.PORT
// const PORT = 3000;

app.use(express.json());

app.get('/', (req, res)=> {
  res.sendFile(path.resolve(__dirname,'../index.html'))
})

app.use('/transfer', transRoute);

app.use((err,req,res, next) => {
  console.log(JSON.stringify(err))
  res.send(err)
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening to port: ${PORT}`);
})