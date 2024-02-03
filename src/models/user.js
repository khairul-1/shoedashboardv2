// models/User.js
//import { Schema, model } from 'mongoose';
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model('User', userSchema);

//export default User;
module.exports = User;
