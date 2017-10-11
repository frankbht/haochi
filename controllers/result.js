const Result = require('../models/result');
const Restaurant = require('../models/restaurant');

exports.show = function(req, res, next) {
  const current = new Date().toISOString().substring(0,10);
  Result.find({ date: current }, function(err, results) {
    if (err) { res.status(400).send(err) }
    res.status(200).send({ results });
  })
}

exports.vote = function(req, res, next) {
  const current = new Date().toISOString().substring(0,10);
  Result.findOne({
    $and: [ { restaurant: req.body.restaurant }, { date: current } ] }, function(err, result) {
      if (err) { res.status(400).send(err); }
      return result;
  })
  .then((response) => {
    if(!response) {
      Restaurant.findOne({ _id: req.body.restaurant}, function(err, restaurant) {
        console.log(restaurant);
        resultModel.name = restaurant.name;
        resultModel.distance = restaurant.distance;
        resultModel.restaurant = req.body.restaurant;
        resultModel.date = current;
        resultModel.votedBy = [req.user._id];
        resultModel.save(function(err, newResult) {
          if (err) { return next(err); }
        });
      })
    } else {
      Result.findByIdAndUpdate(response._id, {$addToSet: {votedBy: req.user._id}}, function(err, result) {
        if (err) { return res.status(400).send(err) }
        res.status(200).send({ result });
      });
    }
  })
}
