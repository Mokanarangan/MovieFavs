const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  }
  movieUrl: {
    type: String,
    required: true
  }
});

MovieSchema.methods.apiRepr = function() {
  return {
    id: this._id || '',
    title: this.title || '',
    description: this.description || '',
    image: this.image || '',
    movieId: this.movieId || '',
    movieUrl: this.movieUrl|| ''
  };
}

MovieSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

MovieSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const Movie = mongoose.model('Movie', UserSchema);

module.exports = {User};
