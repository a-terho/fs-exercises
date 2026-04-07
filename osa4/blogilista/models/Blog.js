const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        // muunna _id soveltuvampaan muotoon
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // muunna blogiin liitetty käyttäjäviite merkkijonoksi
        // tämä koskee populoimattomia viitteitä
        ret.user = ret.user.toString();
      },
    },
  },
);

module.exports = mongoose.model('Blog', blogSchema);
