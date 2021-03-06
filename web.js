
require("./pay.js");

const bcrypt = require('bcrypt');
const blackList = require("./blacklist.js");
const contractUpload = require("./contract.js");
console.log("only run contract");
return;

const follower = require("./follower");
const reply = require("./reply");
const nabul = require("./nabul");

const contract = require("./contract2.js");

const upload = require("./s3test.js");

const singleUpload = upload.single('image')


var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

const cmmUtil = require("./nodejsScript/commonUtil");

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

function increaseVote(id, vote, account, callback){
	  MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
    		var findquery = {_id : ObjectId(id)};		  
    		dbo.collection("board").findOne(findquery, function(err, res){
     			 if(!res){
	     			 console.log("nothing to increase vote");
				 db.close()
				 callback("fail");
      			}else{
				//check whether duplicated request or not
				var duplicatedQuery = { boardId : id, account : account};
				dbo.collection("voting").findOne(duplicatedQuery, function(err, dupres){
					if(!dupres){      				
						//contract.voteMessage(account, res.account, id);
	      					var orig = res.voting;
	      					var newValue = parseInt(vote,10) + parseInt(orig,10);
						console.log("increaseVote",orig, vote);
	      					var newvalues = { $set: {voting : newValue } };
	      					dbo.collection("board").updateOne(findquery, newvalues, function(err, result){
		      					if (err) throw err;
							var tod = Date.now();

   							var myobj = { boardId : id,  account : account , date : tod };
   							dbo.collection("voting").insertOne(myobj, function(err, insres){
    								if (err) throw err;
    								console.log("1 document inserted");
								contract.voteMessage(account, res.account, id);
								db.close();
								callback("success");    							   
   							});
      						});

					}else{
						console.log("increase vote duplication");
						db.close();
						callback("duplicated");
					}
				});
			}    
        	});
        });

}

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

  app.post("/read", function(req, res) { 
	/* some server side logic */
	  
	  var user = req.body.user;
	  var page = req.body.page;
	  console.log("read event", user, page);
	  //query Mongo DB
	  if(page == 0)
	  	req.session.page = page + 1;
	  else if(page == -1)
		  req.session.page++;
	  else if(page == -2){
		  req.session.page--;
		  if(req.session.page == 0)
			  req.session.page = 1;
	  }
	  else
		  req.session.page = page;
	  
	  if(req.session.page <= 0){
		  console.log("page number correction", req.session.page);
		  req.session.page = 1;
	  }
	  
	  if(isNaN(req.session.page)){
		  console.log("page number correction for NaN case", req.session.page);
		  req.session.page = 1;
	  }
		  
	  console.log("calling readData", req.session.account);
	  readData(req.session.account, req.session.page,(result) => {res.send(result)});
  });

  app.post("/readnabul", function(req, res) { 
	/* some server side logic */
	  
	  var user = req.body.user;
	  var page = req.body.page;
	  console.log("readnabul event", user, page);
	  //query Mongo DB
	  if(page == 0)
	  	req.session.page = page + 1;
	  else if(page == -1)
		  req.session.page++;
	  else if(page == -2){
		  req.session.page--;
		  if(req.session.page == 0)
			  req.session.page = 1;
	  }
	  else
		  req.session.page = page;
	  
	  if(req.session.page <= 0){
		  console.log("page number correction", req.session.page);
		  req.session.page = 1;
	  }
	  if(isNaN(req.session.page)){
		  console.log("page number correction for NaN case", req.session.page);
		  req.session.page = 1;
	  }
	  
	  console.log("calling readNabul", req.session.account, req.session.page);
	  nabul.readNabul(req.session.account, req.session.page,(result) => {res.send(result)});
  });

  app.post("/readdetailpage", function(req, res) { 
	/* some server side logic */
	  
	  console.log("readdetailpage postid type", typeof req.body.postid);
	  if((typeof req.body.postid) !== "string"){
		  console.log("readdetailpage postid is not string error");
		  res.send("fail");
		  return -1;
	  }
	  
	  if(req.body.postid == null){
		  console.log("readdetailpage postid is null");
		  res.send("fail");
		  return -1;
	  }
	  

	  var user = req.body.user;
	  var page = req.body.page;
	  var postid = req.body.postid;
	  console.log("readdetailpage  event", postid, user, page);
	  //query Mongo DB
	  if(page == 0)
	  	req.session.replypage = page + 1;
	  else if(page == -1)
		  req.session.replypage++;
	  else if(page == -2){
		  req.session.replypage--;
		  if(req.session.replypage == 0)
			  req.session.replypage = 1;
	  }
	  else
		  req.session.replypage = page;
	  
	  if(req.session.replypage < 0){
		  console.log("page number correction", req.session.replypage);
		  req.session.replypage = 1;
	  }
	  
	  console.log("calling readdetailpage ", postid, req.session.account, req.session.replypage);
	  reply.readDetailPage (postid, req.session.account, req.session.replypage,(result) => {res.send(result)});
  });

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

function editData(postid, data, cb){
	//ToDo : payout data condition check
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var myobj = { $set : {data : data}};
		var findquery = {_id : ObjectId(postid)};
		dbo.collection("board").updateOne(findquery, myobj, function(err, res){
			if (err) throw err;
			console.log("1 document modified");
			cb("success");
			db.close()
		});
	});
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

  app.post("/readnabul", function(req, res) { 
	/* some server side logic */
	  
	  var user = req.body.user;
	  var page = req.body.page;
	  console.log("readnabul event", user, page);
	  //query Mongo DB
	  if(page == 0)
	  	req.session.page = page + 1;
	  else if(page == -1)
		  req.session.page++;
	  else if(page == -2){
		  req.session.page--;
		  if(req.session.page == 0)
			  req.session.page = 1;
	  }
	  else
		  req.session.page = page;
	  
	  if(req.session.page <= 0){
		  console.log("page number correction", req.session.page);
		  req.session.page = 1;
	  }
	  if(isNaN(req.session.page)){
		  console.log("page number correction for NaN case", req.session.page);
		  req.session.page = 1;
	  }
	  
	  console.log("calling readNabul", req.session.account, req.session.page);
	  nabul.readNabul(req.session.account, req.session.page,(result) => {res.send(result)});
  });


app.post("/friendContents", function(req, res){
	var resultIsLogin = fnIsLogin(req);
	var user = req.body.account;
	var page = req.body.page;
	var errMsg = "";
	if ( cmmUtil.isEmpty(user) ){
		errMsg = "선택된 친구정보가 없습니다. KimHark의 글 목록이 조회됩니다.";
		user = "KimHark";
	}
		
	if( !isNaN(page) ){
		req.session.page = Number(page);
	}else{
		req.session.page = 1;
	}
	
	if(req.session.page <= 0){
		req.session.page = 1;
	}
	
	if(isNaN(req.session.page)){
		req.session.page = 1;
	}
	
	nabul.readNabul(
			user, req.session.page,(result) => {
				res.render("./friendInfo/friendContents", {
					loginInfo : resultIsLogin,
					friendAccount :user,
					data : result,
					page : req.session.page,
					errMsg : errMsg
				});
			}
	);
});

  app.post("/createfriend", function(req, res) { 
	  const friend = req.body.account;
	  console.log("createfriend event", friend);
	  follower.createFriend(req.session.account, friend, (result)=>{
		  res.send(result);
	  });
  });

  app.post("/deletefriend", function(req, res) { 
	  const friend = req.body.account;
	  console.log("deletefriend event", friend);
	  follower.deleteFriend(req.session.account, friend, (result)=>{
		  res.send(result);
	  });
  });

  app.post("/readfriends", function(req, res) { 
	  console.log("readfriends event");
	  follower.readFriends(req.session.account,(result)=>{
		  res.send(result);
	  });
  });

  app.post("/isFriend", function(req, res) {
	  var friend = req.body.account;
	  follower.viewFriend(req.session.account, friend, (result)=>{
		  res.send(result);
	  });
  });

  app.post("/edit", function(req, res) { 
	/* some server side logic */
	  
	  var postid = req.body.postid;
	  var data = req.body.data;
	  console.log("edit event", postid, data);
	  //query Mongo DB
	  editData(postid, data,(result) => {res.send(result)});
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



app.post("/", function(req, res){
  	var resultIsLogin = fnIsLogin(req);
  	var page = req.body.page;
  	
  	if( !isNaN(page) ){
  		req.session.page = Number(page);
  	}else{
  		req.session.page = 1;
  	}
  	
  	
  	/*
  	if(page == 0){
  		req.session.page = page + 1;
  	}else if(page == -1){
  		req.session.page++;
  	}else if(page == -2){
  		req.session.page--;
  		if(req.session.page == 0)
  			req.session.page = 1;
  	}else{
  		req.session.page = page;
  	}
  	*/
  	  
  	if(req.session.page <= 0){
  		console.log("page number correction", req.session.page);
  		req.session.page = 1;
  	}
  	  
  	if(isNaN(req.session.page)){
  		console.log("page number correction for NaN case", req.session.page);
  		req.session.page = 1;
  	}
  		  
  	//query Mongo DB
  	readData(req.session.account, req.session.page, (result) => {
  		res.render("./main/main", {
  			title : "EJS test",
  			data : result,
  			loginInfo : resultIsLogin,
  			page : req.session.page,
			detailPage : "false"
  		});
  	});
  });

  app.post("/logout", function(req, res) { 
	  
	/* some server side logic */

	  var id = req.body.id;
	  req.session.isLogin = false;
	  console.log("logout event");

	  res.send("done");
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

app.get("/", function(req, res){
	var resultIsLogin = fnIsLogin(req);
 	readData(req.session.account, 1, (result) => {
 		res.render("./main/main", {
 			title : "EJS test",
 			data : result,
 			loginInfo : resultIsLogin,
 			page : 1,
			detailPage : "false"
 		});
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

app.get("/index.html", function(req, res){
	var resultIsLogin = fnIsLogin(req);
	
 	readData(req.session.account, 1, (result) => {
 		res.render("./main/main", {
 			title : "EJS test",
 			data : result,
 			loginInfo : resultIsLogin,
 			page : 1,
			detailPage : "false"
 		});
 	});
});

  app.post("/addreply", function(req, res) { 
	  
	/* some server side logic */

	  var user = req.session.account;
	  var data = req.body.data;
	  var parentid = req.body.parentid
	  console.log("addreply event", user, data, parentid);
	  //save this data to mongoDB//
	  reply.addReply (user, parentid, data, (result) => {
		  res.send(result);
		  contract.sendMessage(user, data);
	  });
  });

app.post('/image-upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
})

  app.post("/vote", function(req, res) { 
	  
	/* some server side logic */

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote, req.session.account);
	  //save this data to mongoDB//
	  /*
	  increaseVote(id, vote, req.session.account);
	  res.send("done");
	  */
	  // 2018-09-07 HarkHark Edit
	  // 2018-09-08 DB response correction when there is no result and adding vote parameter again
	  increaseVote(id, vote, req.session.account, (result) => {res.send(result)});
  });


app.get("/contentDetail", function(req, res) {
	
	var resultIsLogin = fnIsLogin(req);
	var postid = req.param("postid");
	//5be305e0dc6e940004399161
	if( cmmUtil.isEmpty(postid) ){
		/*
		res.render("./cmm/cmmError", {
			loginInfo : resultIsLogin,
			errorMessage : "글정보가 없습니다."
		});
		*/
	 	readData(req.session.account, 1, (result) => {
	 		res.render("./main/main", {
	 			title : "Dabble",
	 			data : result,
	 			loginInfo : resultIsLogin,
	 			page : 1,
				detailPage : "false"
	 		});
	 	});
		return -1;
	}
	
	reply.readDetailPage (postid, req.session.account, 1, (result) => {
 		res.render("./main/mainDetail", {
 			title : "Dabble",
 			cmmUtil : cmmUtil,
 			data : result,
 			postid : postid,
 			loginInfo : resultIsLogin,
			page : 1,
			detailPage : "true"
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

function stakeRank(){
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find().sort({staked : -1}).collation({locale: "en_US", numericOrdering: true}).limit(10).toArray(
			function(err, res){
				res.forEach(function(result){
					console.log(result.account, result.walletAccount, result.staked);
				});
				db.close();
			});
	});
	
}


function stakeRank2(){
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find().sort({staked : 1}).limit(10).toArray(
			function(err, res){
				console.log("res", res);
				console.log("err", err);
				db.close();
			});
	});
	
}

function stakeRank3(){
	MongoClient.connect(url, function(err, db) {
   		var dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find().sort({staked : 1}).collation({locale: "en-US", numericOrdering: true}).toArray(
			function(err, res){
				//console.log("res", res);
				//console.log("err", err);
				res.forEach(function(result){
					console.log(result.account, result.walletAccount, result.staked);
				});
				db.close();
			});
	});
	
}

function deleteOld(){
	console.log("Starting delete old ones");
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var dateStart = Date.now() - 1000 * 60 * 60 * 24 * 7;
		var dataEnd = dateStart - 1000 * 60 * 60 * 24 * 7;
		console.log("estimated time", dateStart);
		var deleteQuery = { date : { $lt : dateStart}};
		dbo.collection("board").deleteMany(deleteQuery, function(err, obj){
			if (err) throw err;
			console.log(obj.result.n + " documents deleted");
			//db.close();
		});
	});
}

//addStakeField();
stakeRank();
deleteOld();
//stakeRank2();
//stakeRank3();


