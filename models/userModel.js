import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 10,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
