const mongoose = require('mongoose');

const connectToDatabase = async (uri) => {
  console.log('establishing MongoDB connection...');

  try {
    await mongoose.connect(uri);
    console.log('connected to MongoDB');
  } catch (err) {
    console.log('error while connecting to MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
