const fs  = require('fs');
const dontenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel')
dontenv.config({ path: './config.env' });

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

//Reading JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

//Importing data into DB
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data Successfully Loaded')
        
    }catch(err){
        console.log(err)
    }
    process.exit()
}

//Delete all data in the DB
const deleteData = async()=>{
    try{
        await Tour.deleteMany();
        console.log("Data Deleted!!!")
        
    }catch(err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2] == "--import"){
    importData()
}
if(process.argv[2] == "--delete"){
    console.log("Deleting.....")
    deleteData()
}