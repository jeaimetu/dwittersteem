//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;






function getUserVoting(){
	MongoClient.connect(url, (err, db) => {
		sumVoting(db, (result) => {
			db.close();
			console.log("getRank",result);
		});
	});
	var sumVoting = (db, callback) => {
		var agr = [
			{$match: {account: {$exists:true, $ne: null}}},
			{$group: {_id:"$account", all : { $sum : "$voting"}}}];
		var dbo = db.db("heroku_dg3d93pq");
		var cursor = dbo.collection('board').aggregate(agr).toArray( (err, res) => {
			console.log(res);
		});
	};
}


	
		
	


getUserVoting();

