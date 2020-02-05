const Tour = require('./../models/tourModel');
const catchAsync = require('./../utlis/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) get tour data from collection
  const tours = await Tour.find();

  // 2) build template

  // 3) render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) get data
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour
  });
});
