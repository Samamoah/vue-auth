var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {

        var user = User.find({email});

        bcrypt.compare(user.password, password, (isMatch, err) => {
            if(isMatch){
                resolve(user);
            }else{
                reject(err.message);
            }
        });
  });
};