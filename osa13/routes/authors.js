const router = require('express').Router();
module.exports = router;

const { Blog } = require('../models');
const { sequelize } = require('../util/db.js');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: [['likes', 'DESC']],
  });
  return res.status(200).json(authors);
});
