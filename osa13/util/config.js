require('dotenv').config();

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, DATABASE_URL, JWT_SECRET };
