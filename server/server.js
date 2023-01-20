const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({ path: './.env' })
const PORT = process.env.PORT
// const PORT = 3000;

app.get('/', (req, res)=> {
  res.sendFile(path.resolve(__dirname,'../index.html'))
})
app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening to port: ${PORT}`);
})