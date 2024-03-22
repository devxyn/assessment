import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
});

const User = model('User', userSchema);

export default User;
