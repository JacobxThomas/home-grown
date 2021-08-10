const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Must be a valid email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;