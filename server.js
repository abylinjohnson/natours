/* eslint-disable prettier/prettier */
const dontenv = require('dotenv');
const mongoose = require('mongoose');
dontenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB Connection Successfull!!!');
  });

app.listen(process.env.PORT, () => {
  console.log('Server running on port 3000....');
});
