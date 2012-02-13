
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , everyauth = require('everyauth')
  , now = require("now")
  ;

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;
var usersByGoogleId = {};

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.google.scope('https://www.google.com/m8/feeds/')
  .appId('198255835595-o7t2gcjkqna9qe093rg6462t2l2hlugr.apps.googleusercontent.com')
  .appSecret('0ibrNhrLb5D27bOMzVXH3YFG')
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath('/');	

var sessionSecret = 'GFTYUrtyfygfT^&**uyhgiugiuyg67fyt';
var sessionStore = new express.session.MemoryStore;

var app = module.exports = express.createServer(
	express.cookieParser(),
	express.session({ secret: sessionSecret, store: sessionStore  })
	);
var everyone = now.initialize(app);	

app.register('html', require('ejs'));

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(everyauth.middleware());
});



// DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/consuming');

// Configuration
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  everyauth.google.appId('198255835595-o7t2gcjkqna9qe093rg6462t2l2hlugr.apps.googleusercontent.com')
  .appSecret('0ibrNhrLb5D27bOMzVXH3YFG')
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
    everyauth.google.appId('198255835595.apps.googleusercontent.com')
  .appSecret('gpAeYLUaZWQxklj3oe4sUPwC')
});

// Routes

everyauth.helpExpress(app);

app.get('/', routes.index);
app.get('/about', routes.about);



everyone.now.addShopList = function(name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load( connectId, function(err, res) {
			group = now.getGroup(res.auth.google.user.id);
			group.hasClient(connectId, function (bool) {
  				if (!bool) {
				    group.addUser(clientId);
			    }
			});
			routes.addShopList(res.auth, name, group.now);
		});	
}

everyone.now.deleteProject = function(name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
			
		group = now.getGroup(res.auth.google.user.id);
		group.hasClient(connectId, function (bool) {
			if (!bool) {
			    group.addUser(clientId);
		    }
		});
		routes.deleteProject(res.auth, name, group.now);
		});	
}

everyone.now.getShopLists = function() {
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
			group = now.getGroup(res.auth.google.user.id);
			group.hasClient(connectId, function (bool) {
				if (!bool) {
 					console.log('user added');
			    	group.addUser(clientId);
		    	}
			});
			routes.getShopLists(res.auth, group.now);
		});	
}

everyone.now.getProject = function(id) {
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
			group = now.getGroup(id);
			group.hasClient(connectId, function (bool) {
				if (!bool) {
			    	group.addUser(clientId);
		    	}
			});
			routes.getProject(res.auth, group.now, id);
		});	
}

everyone.now.addItem = function(id, name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load( connectId, function(err, res) {
			group = now.getGroup(id);
			group.hasClient(connectId, function (bool) {
  				if (!bool) {
				    group.addUser(clientId);
			    }
			});
			
			routes.addItem(res.auth, id, name, group.now);
		});	

}

everyone.now.deleteItem = function(id, name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
		group = now.getGroup(id);
		group.hasClient(connectId, function (bool) {
			if (!bool) {
			    group.addUser(clientId);
		    }
		});
		routes.deleteItem(res.auth, id, name, group.now);
		});	
}

everyone.now.buyItem = function(id, name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
		group = now.getGroup(id);
		group.hasClient(connectId, function (bool) {
			if (!bool) {
			    group.addUser(clientId);
		    }
		});
		routes.buyItem(res.auth, id, name, group.now);
		});	
}

everyone.now.addCoOwner = function(id, name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load( connectId, function(err, res) {
			group = now.getGroup(id);
			group.hasClient(connectId, function (bool) {
  				if (!bool) {
				    group.addUser(clientId);
			    }
			});
			
			routes.addCoOwner(res.auth, id, name, group.now);
		});	

}

everyone.now.deleteCoOwner = function(id, name) {
		var a = this.now;
		var connectId = unescape(this.user.cookie['connect.sid']);
		var clientId = this.user.clientId;
		sessionStore.load(connectId, function(err, res) {
		group = now.getGroup(id);
		group.hasClient(connectId, function (bool) {
			if (!bool) {
			    group.addUser(clientId);
		    }
		});
		routes.deleteCoOwner(res.auth, id, name, group.now);
		});	
}


app.listen(3020);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
