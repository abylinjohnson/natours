/* eslint-disable prettier/prettier */
const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//Middlewares
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware that process requests
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!!', app: 'Natours' });
// });

// app.post('/',(req,res)=>{
//     res.send("You  can post to the endpoint!!")
// })

//Route handlers

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', newTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//server

module.exports = app;
