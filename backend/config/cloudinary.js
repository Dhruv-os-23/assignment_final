const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dxv8p3je6',
  api_key: '867539113235473',
  api_secret: 'ES2q2o_264-bipsWDdLrKf1pgZA',
});

module.exports = cloudinary;
