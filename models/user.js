var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var User = exports = module.exports = new Schema({
    username     : String
});

var UserModel = exports.model  = mongoose.model('User', User);



exports.get = function(id, fn){
  UserModel.findOne({ 'username': id}, function(err, doc) {
  		if(err == null) {
  			fn(doc);
  		} else {
  			fn(null);
  			console.log(err);
  		}
  });
};

exports.create = function(username, fn) {
	var user = new UserModel();
		user.username = username;

		user.save(function(err) {
			console.log(err);
		});
//		fn(user);
}
