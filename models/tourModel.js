const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal 40 character'],
      minlength: [10, 'A tour name must have more or equal 10 character'],
    },
    slug: String,
    duration: {
      type: Number,
      require: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      require: [true, 'A tour must have a group size'],
      
    },
    difficulty: {
      type: String,
      require: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult', 'asian'],
        message: 'Difficulty is either: easy, medium, difficult or asian',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'The rating must be above 1.0'],
      max: [5, 'The rating must be less than 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount:{
      type: Number,
      validate:{
        validator:  function(val) {
          //this only points to the current doc on NEW document creation
          return val < this.price;
        },
        message: 'Price should not be less than the price'
      }
    },
    summery: {
      type: String,
      trim: true,
      require: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover Image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document Middleware: runs before the .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function(doc, next){
//   console.log(doc);
//   next();
// })

//Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

//Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
