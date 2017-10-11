const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  date: { type: String, required: true, default: Date.now("<YYYY-mm-dd>") },
  restaurant: { type: Schema.Types.ObjectId, ref: 'restaurant' },
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  votedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

resultSchema.methods.voter = function(userId) {
  console.log(this.votedBy[0], userId)
  if (this.votedBy.includes(userId)) return true;
  return false;
}

const modelClass = mongoose.model('result', resultSchema);

module.exports = modelClass;
