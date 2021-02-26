const { Schema, model } = require('mongoose');

const thingSchema = new Schema({
  name:  {
    type: String,
    required: true,
  },
  body: Schema.Types.Mixed,
  _deletedAt: { type: Date, default: null, select: false },
});

module.exports = model('thing', thingSchema);
