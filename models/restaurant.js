const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, unique: true, required: true },
  category: [{ type: String, unique: true }],
  distance: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
});

const modelClass = mongoose.model('restaurant', restaurantSchema);

module.exports = modelClass;