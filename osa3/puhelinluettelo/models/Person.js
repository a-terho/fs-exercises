const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) =>
    console.log('error while connecting to MongoDB:', err.message),
  );

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}-[0-9]+$/.test(v);
      },
      message: 'does not match correct format xx-xx... or xxx-xx...',
    },
  },
});

// siistitään palautuvaa JSON-tulostetta
personSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
