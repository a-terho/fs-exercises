const logger = require('../utils/logger');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      required: true,
      unique: true, // yksikäsitteisyys
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // piilota salasana oletuksena kyselyistä
    },
    name: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        // muunna _id soveltuvampaan muotoon
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // poista salasana aina json tulosteesta
        delete ret.passwordHash;
        // muunna käytäjään liitetyt blogiviitteet merkkijonoiksi
        // tämä koskee populoimattomia viitteitä
        ret.blogs?.forEach((blog) => {
          blog = blog.toString();
          return blog;
        });
      },
    },
  },
);

// määrittele salasanan generointi staattisena luokkametodina
userSchema.statics.generatePasswordHash = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// määrittele salasanan tarkastus instanssimetodina
// nämä loggaukset voisi myöhemmin muuntaa oikeiksi virheiksi
userSchema.methods.checkPassword = async function (password) {
  if (password === undefined) {
    logger.error('attempting to compare password when one is not given');
    return false;
  }
  if (this.passwordHash === undefined) {
    logger.error(
      'attempting to compare password when user object does not have passwordHash field',
    );
    return false;
  }
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
