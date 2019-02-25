
require("./pay.js");



var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();



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


