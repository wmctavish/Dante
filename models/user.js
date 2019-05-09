const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    }
});

//From the Mongoose documentation -- "The first argument is the singular name of the collection your model is for. 
//Mongoose automatically looks for the plural, lowercased version of your model name". Thus, it looks at the "user"
//from the database collection "users", in whatever instance is called.
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, callback){
    const query = {candidatePassword: candidatePassword};
    User.findOne(query, callback)
}

