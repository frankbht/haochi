const Restaurant = require('../models/restaurant');

exports.create = function(req, res, next) {
  let restaurantModel = new Restaurant();
  restaurantModel.name = req.body.name;
  restaurantModel.category = req.body.category;
  restaurantModel.distance = req.body.distance;
  restaurantModel.createdBy = req.user._id;

  restaurantModel.save(function(err, dish) {
    if (err) { return next(err); }
    res.status(200).send({dish});
  });
}

exports.show = function(req, res, next) {
  Restaurant.find(function(err, restaurants) {
    if (err) { return next(err); }
    res.status(200).send({restaurants});
  })
}
