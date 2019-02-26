
require("./pay.js");



var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

var path = require('path');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'mySessions'
});

store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.engine("html", require("ejs").renderFile);

// Use the session middleware
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function fnIsLogin(req){
	  if(req.body.id != undefined && req.body.id != null ){
		  var id = req.body.id;
		  console.log("isLogin event", id);
	  }else{
		  id = "__undefined";
	  }
  	  
	  var body = {
			  "result": null,
			  "id" : null,
			  "imgUrl": null
	  };
	  //console.log("isLogin",req.session.account,id);
	  if(req.session.isLogin == true){
		  body.result = true;
		  body.id = req.session.account;
	  }else{
		  body.result = false;
		  body.id = null;
	  }
	  //initialize session value
	  req.session.internalTransfer = false;
	  return body;
  }

app.get("/", function(req, res){
	var resultIsLogin = fnIsLogin(req);
 	readData(req.session.account, 1, (result) => {
 		res.render("./main/main", {
 			title : "EJS test",
 			data : result,
 			loginInfo : resultIsLogin,
 			page : 1
 		});
 	});
});

 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
	 console.log("app get", req.params[0]);
	 console.log("app get parameter", req.query.name);
     res.sendfile( __dirname + req.params[0]); 
 });

 var port = process.env.PORT || 5000;
console.log("port", port);

 app.listen(port, function() {
   console.log("Listening on " + port);
 });

function addStakeField(){
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now();
		var findQuery = {};
   		//var myobj = { $set: {postLimit : 20, staked : 0, unstaked : 0, staked_time : 0, unstaked_time : 0}};
		var myobj = { $set: {postLimit : 10, postLimitMax : 10}};
   		dbo.collection("user").updateMany(findQuery,myobj, function(err, res){
    			if (err) throw err;
    			console.log("new field added");
    			db.close();   
   		});
  	}); 
}

//addStakeField();


