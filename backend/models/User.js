const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = (user, callback) => {
  bcryptjs.genSalt((err, salt) => {
    if (err) {
      console.log(err);
    }
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      // store the hashed password
      user.password = hash;
      user.save(callback);
    });
  });
};

module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
};
