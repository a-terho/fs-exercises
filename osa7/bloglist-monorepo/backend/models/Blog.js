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
    // kommentit ovat nyt denormalisoituina suoraan blogissa
    // ei liitetä oletusarvoisesti kyselyihin vaan ne kysellään erikseen
    comments: {
      type: [
        {
          comment: {
            type: String,
            required: true,
          },
          postedAt: Date,
        },
      ],
      select: false,
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
        // tämä koskee vain populoimattomia viitteitä
        if (ret.user instanceof mongoose.Types.ObjectId) {
          ret.user = ret.user.toString();
        }
        // muunna kommentien id:t myös oikeaan muotoon
        if (ret.comments?.length > 0) {
          ret.comments.forEach((comment) => {
            comment.id = comment._id.toString();
            delete comment._id;
          });
        }
      },
    },
  },
);

module.exports = mongoose.model('Blog', blogSchema);
