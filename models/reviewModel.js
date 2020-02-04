const mongoose = require('mongoose');

// review, rating, createdAt, ref to tour, ref to user
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
      required: [true, 'Must have a rating']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have an author']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtual: true }
  }
);

// QUERY MIDDLEWARE
reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
