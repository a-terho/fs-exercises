const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) =>
    console.log('error while connecting to MongoDB:', err.message),
  );

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

// siistitään palautuvaa JSON-tulostetta
personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
