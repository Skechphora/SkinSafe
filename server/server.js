const express = require('express');
const path = require('path');

// const app = express();
// const transRoute = require('./routers/transferRouter.js')
// require('dotenv').config({ path: './.env' })
// //env: port, server url & api key
// //const PORT = process.env.PORT
//  const PORT = 3000;


const app = express();
const transformDataRouter = require('./routers/transferRouter.js');

const dbControllers = require('./controllers/dbController');

const PORT = process.env.PORT;

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/transfer', transformDataRouter);



//at homepage - on endpoint main, send main page to front end
app.get('/', (req, res) => {
  console.log('at app.get(/) endpoint in server')
  console.log(res)
  console.log(req)
  res.sendFile(path.resolve(__dirname, './index.html'));
});


//Search
//receive req(POST) from frontend get data from database and sent it

app.get('/api/getAllProducts', dbControllers.getAllProducts, (req,res)=>{
  console.log('endpoint reached for GET request to /api/getAllProducts ')
  res.status(200).json(res.locals.getAllProducts)
})
app.get('/api/getAllIngredients', dbControllers.getAllProducts, dbControllers.getAllIngredients, (req,res)=>{
  console.log('endpoint reached for GET request to /api/getAllIngredients ')
  res.status(200).json(res.locals.productsWithIngredients)
})
app.post('/api', dbControllers.getProductExclusive, (req, res) => {
   console.log('endpoint reached for POST request to /api')
  res.status(200).json(res.locals.getProduct);
});

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
  else console.log(`Listening to port: 3000`);
});
