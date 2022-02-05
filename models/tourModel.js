const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration:{
      type: Number,
      require: [true, 'A tour must have a duration']
    },
    maxGroupSize:{
      type:Number,
      require: [true,'A tour must have a group size']
    },
    difficulty:{
      type: String,
      require:[true, "A tour must have a difficulty"]
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    reatingsQuantity:{
      type:Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summery:{
      type: String,
      trim: true,
      require: [true, 'A tour must have a description']
    },
    description:{
      type: String,
      trim: true
    },
    imageCover:{
      type: String,
      required: [true, 'A tour must have a cover Image']
    },
    images: [String],
    createdAt:{
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  });
  const Tour = mongoose.model('Tour', tourSchema);
  module.exports = Tour;