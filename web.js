
require("./pay.js");



var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

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

function compareAccount(id, pass, cb){
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
   		var findquery = { account : id };
   		dbo.collection("user").findOne(findquery, function(err, res){
    			if (err) throw err;
    			if (res != null){
				bcrypt.compare(pass, res.pass, function(err, result){
					if(result)
			    			cb(true);
					else
						cb(false);
				});
			}
			else
				cb(false)				
    			db.close();   
   		});
  	}); 	
}

async function saveData(account, data, cb){
	var body = {
	  "result": "OK"
	}
	
	//check abusers list
	
	//console.log("saveData", account, data);
	const client = await MongoClient.connect(url);
	const db = client.db('heroku_dg3d93pq');
	
	var findQuery = {account : account};
	var res = await db.collection("user").findOne(findQuery);
	if(res.postLimit <= 0){
		cb("fail");
	}else{	
		//decrease count
		var limitCount = +res.postLimit - 1;
		var myObj = {$set: {postLimit : limitCount}};
		var res = await db.collection("user").updateOne(findQuery, myObj);			     
		var tod = Date.now();
		myObj = { account : account, data : data, date : tod, voting : 0, payout : 0, steem : false };
		res = await db.collection("board").insertOne(myObj);
		cb("done");
	}
	client.close();
	
}

function readData(account, page, cb){
	console.log("in reaData", account, page);
	const pageSize = 20;
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now();
		//ToDo : add image path to response
   		//dbo.collection("board").find({}).sort({date: -1}).toArray(function(err, result){
		
		var agr = [	
			

			  {$sort: {"date" : -1}},
			{$skip : (pageSize * page) - pageSize},
			   {$limit : pageSize},
			{$lookup:
			    { from: 'user',
			   localField: 'account',
			   foreignField : 'account',
			   as : 'userdetails'
			    }
			   }
			];
		
		dbo.collection("board").aggregate(agr).toArray(function(err, result){
			    			if (err) throw err;
			var body = []; // empty array
			var picUrl;
			console.log("Readdata size", result.length);
			//console.log("aggregate data", result);
			//onsole.log("before for loop");
			
			for(i = 0; i < result.length ; i++){				
				//console.log("in for loop");
				if(result[i].userdetails[0] == undefined){
					picUrl = "0.png";
					//console.log("undefined case");
				}
				else{
					//console.log("define case");
					var picUrl = result[i].userdetails[0].profile;
				}
				

				const votingenable = "true";
				//check parent id
				var parentId = null;
				if(result[i].hasOwnProperty("parentid"))
					parentId = result[i].parentid
					
				
				body.push({id: result[i]._id, account: result[i].account, data : result[i].data, date : result[i].date,
					  voting : result[i].voting,  profile : picUrl, votingenable : votingenable, parentid : parentId });
				
			}
			//generating votingenable flag
			var findQuery = { account : account };
			dbo.collection("voting").find(findQuery).toArray(function(err, votingTable){
				if(err) throw err;
				console.log("voting table query result",votingTable.length, account, body.length);
				for(i = 0;i < body.length;i++){
					for(j = 0;j<votingTable.length;j++)
						if(body[i].id == votingTable[j].boardId){
							body[i].votingenable = "false";
							break;
						}
				}
				cb(body);
    				db.close();   
			});
   		});
  	}); 
}

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


  app.post("/isLogin", function(req, res) { 
	  
	/* some server side logic */
	  if(req.body.id != undefined && req.body.id != null ){
	  	var id = req.body.id;
	  	console.log("isLogin event", id);
	  }else{
		  id = "__undefined";
	  }
	  
	  var body = {
			  "result": null,
			  "id" : null
	  };
	  
	  console.log("isLogin",req.session.account,id);
	 
	  if(req.session.isLogin == true){
		  var body;
		  body.result = "true";
		  body.id = req.session.account;
	  	  res.send(body)
	  }
	  else{
		  var body;
		  body.result = "fail";
		  body.id = "null";
	  	  res.send(body)
	  }
  });

  app.post("/login", function(req, res) { 
	  var id = req.body.id;
	  var pass = req.body.pass;
	  //save id information

	  console.log("login event", id, pass);
	  //make session and return number//
	  compareAccount(id, pass, (result) => {
		  if(result == true){
			  //make session and return
			  console.log("login with session id", req.session.id);
			  req.session.account = id;
			  req.session.isLogin = true;
			  res.send(req.session.id);
		  }else{
			  //error case
			  res.send("fail");
		  }
	  });
		 

  });

  app.post("/write", function(req, res) { 
	  
	/* some server side logic */

	  var user = req.body.user;
	  var data = req.body.data;
	  console.log("write event", user, data);
	  //save this data to mongoDB//
	  if(blackList.abuser.includes(req.session.account.toLowerCase()) == true){
		  res.send("fail");
	  }else{
		  saveData(user, data, (result) => {
			  res.send(result);
			  contract.sendMessage(user, data);
		  });
	  }
  });



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

app.get("/myInfo", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./myInfo/myInfo", {loginInfo : resultIsLogin});
});
app.get("/friendList", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./friendInfo/friendList", {loginInfo : resultIsLogin});
});
app.get("/myWallet", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./wallet/myWallet2", {loginInfo : resultIsLogin});
});
app.get("/loginPage", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./cmm/login", {loginInfo : resultIsLogin});
});
app.get("/signup", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./cmm/signup", {loginInfo : resultIsLogin});
});
app.get("/notice", function(req, res) {
	var resultIsLogin = fnIsLogin(req);
	res.render("./board/notice", {loginInfo : resultIsLogin});
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


