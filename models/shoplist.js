var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;
var fs = require('fs');

var Item = require('./item.js');
var ItemModel = mongoose.model('Item', Item);

var ShopList = exports = module.exports = new Schema({
	_id		 : ObjectId
  , name     : String
  , owner	 : String
  , coOwners : [String]
  , items	 : [Item]
});

var ShopListModel = exports.model  = mongoose.model('ShopList', ShopList);



exports.get = function(id, ownerId, fn){
  ShopListModel.find({$or:[{owner: ownerId},{ coOwners: { $in: [ownerId] }}], _id: id}, function(err, doc) {
		checkError(err, doc, function() {fn(doc[0]);});
	});
};

exports.getAll = function(id, fn) {
	var query = ShopListModel.find({ $or:[{owner: id},{ coOwners: { $in: [id] }}] });
	query.exec(function(err, doc) {
		checkError(err, doc, fn);
	});
	//ShopListModel.find({owner: id}, 
}

checkError = function(err, doc, fn) {
		if(err == null) {
			fn(doc);
		} else {
			fn(null);
  			console.log(err);
		}
}

exports.create = function(everyauth, name, fn) {
	var shopList = new ShopListModel();
		shopList.name = name;
		shopList.owner = everyauth.google.user.id;
		shopList.save(function(err) {
			checkError(err, null, function() {
				exports.getAll(everyauth.google.user.id, fn);
			});
		});
}

exports.delete = function(everyauth, id, fn) {
	var query = ShopListModel.find({});
	query.where('_id', id).where('owner', everyauth.google.user.id).remove(function() {
		exports.getAll(everyauth.google.user.id, fn);
	});

}

exports.addItem = function(everyauth, id, itemName, fn) {

	exports.get(id, everyauth.google.user.id, function(shopList) {
		if(shopList == null) {
			console.log('shopList not found');
		} else {
			var item = new ItemModel();
			item.name = itemName;
			item.isBought = false;
			shopList.items.push(item);
			shopList.save(function(err) {
				checkError(err, null, function() {
					fn(shopList);
				});
			});

		}
	});

}


exports.deleteItem = function(everyauth, listId, id, fn) {
	console.log(listId);
	exports.get(listId, everyauth.google.user.id, function(shopList) {
		if(shopList == null) {
			console.log('shopList not found');
		} else {
			shopList.items.id(id).remove();
			shopList.save(function(err) {
				checkError(err, null, function() {
					fn(shopList);
				});
			});

		}
	});

}

exports.buyItem = function(everyauth, listId, id, fn) {
	console.log(listId);
	exports.get(listId, everyauth.google.user.id, function(shopList) {
		if(shopList == null) {
			console.log('shopList not found');
		} else {
			shopList.items.id(id).isBought = true;
			shopList.save(function(err) {
				checkError(err, null, function() {
					fn(shopList);
				});
			});

		}
	});

}

exports.addCoOwner = function(everyauth, id, name, fn) {

	exports.get(id, everyauth.google.user.id, function(shopList) {
		if(shopList == null) {
			console.log('shopList not found');
		} else {
			shopList.coOwners.push(name);
			shopList.save(function(err) {
				checkError(err, null, function() {
					fn(shopList);
				});
			});

		}
	});

}


exports.deleteCoOwner = function(everyauth, listId, id, fn) {
	console.log(listId);
	exports.get(listId, everyauth.google.user.id, function(shopList) {
		if(shopList == null) {
			console.log('shopList not found');
		} else {
			shopList.coOwners.remove(id);
			shopList.save(function(err) {
				checkError(err, null, function() {
					fn(shopList);
				});
			});

		}
	});

}

