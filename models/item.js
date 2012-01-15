var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var Item = module.exports = new Schema({
	name	 : String	
  , isBought : Boolean
});

var ItemModel = exports.model  = mongoose.model('Item', Item);



exports.get = function(id, fn){
  ItemModel.findById(id, function(err, doc) {
		checkError(err, doc, fn);
  });
};

exports.getAll = function(fn) {
	ItemModel.find({}, function(err, doc) {
		checkError(err, doc, fn);
	});
}

