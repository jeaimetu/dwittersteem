//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;




var totalUser = 0;
var totalSumOfVoting = 0;
const votingFactor = 3;

function getUserVoting(){
	MongoClient.connect(url, (err, db) => {
		sumVoting(db, (result) => {
			db.close();
			console.log("getUserVoting", result);
		});
	});
	var sumVoting = (db, callback) => {
		var agr = [
			{$match: {account: {$exists:true, $ne: null}}},
			{$group: {_id:"$account", vote : { $sum : "$voting"}}}];
		var dbo = db.db("heroku_dg3d93pq");
		var cursor = dbo.collection('board').aggregate(agr).toArray( (err, res) => {
			console.log(res);
			totalUser = res.length;
			totalSumOfVoting = 0;
			for(i = 0;i < res.length; i++)
				totalSumOfVoting += res[i].vote;
			//update each users token in their wallet
			for(i = 0; i < res.length;i++){
				const updatequery = {eosid : res[i].account};
				tokenSize = res[i].vote / totalSumOfVoting + 1;
				const myobj = { $set : {wallet : tokenSize}};
				dbo.collection('user').updateOne(updatequery, myobj, (err,res) =>{					
					if(err) throw err;
					console.log("update wallet", res[i].account, tokenSize);
				});
			}
		});
	};
}


function setShareLog(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		const dropTime = Date.ow();
		const myObj = {date : dropTime};
		dbo.collection('droplog').insertOne(myObj,(err, res) => {
			console.log("insert drop history");
		});
	});		
}

	
		
	


getUserVoting();
setShareLog();

