//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;




var totalUser = 0;
var totalSumOfVoting = 0;
const votingFactor = 3;
const distributionForDay = 3000;
const postingDistributionForDay = 3000;

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
			//update each users token in their wallet
			getTotalVoting(res);
			for(i = 0; i < res.length;i++){
				setWallet(res[i]._id, res[i].vote);
			}
		});
	};
}

function getTotalVoting(res){
	totalSumOfVoting = 0;
	for(i = 0;i < res.length; i++)
		totalSumOfVoting += res[i].vote;
	return totalSumOfVoting;
}

function setWallet(account, vote){
	console.log("setWallet", account, vote);

	MongoClient.connect(url, (err, db) => {
		if(err) throw err;
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : account};
		dbo.collection('user').findOne(findQuery, (err, result) => {
			console.log(result);
			if(err){ 
				throw err;
				console.log(err);
			}
			if(result === null){
				db.close();
				return;
			}
			const updatequery = {account : account};
			
			var tokenSize = (vote / totalSumOfVoting) * distributionForDay + parseFloat(result.wallet);
			console.log("tokenSize", tokenSize, vote, totalSumOfVoting, result.wallet);
			tokenSize = tokenSize.toFixed(4);
			const myobj = { $set : {wallet : tokenSize}};
			console.log("update wallet", account, tokenSize);
			
			dbo.collection('user').updateOne(updatequery, myobj, (err,res) =>{
				if(err){ 
					throw err;
					console.log(err);
				}				
				db.close();
			});
		});
			
	});
}

function setWallet2(account, vote){
	console.log("setWallet2", account, vote);

	MongoClient.connect(url, (err, db) => {
		if(err) throw err;
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : account};
		dbo.collection('user').findOne(findQuery, (err, result) => {
			console.log(result);
			if(err){ 
				throw err;
				console.log(err);
			}
			if(result === null){
				db.close();
				return;
			}
			const updatequery = {account : account};
			
			var tokenSize = parseFloat(vote) + parseFloat(result.wallet);
			console.log("tokenSize", tokenSize, vote, result.wallet);
			tokenSize = tokenSize.toFixed(4);
			const myobj = { $set : {wallet : tokenSize}};
			console.log("update wallet", account, tokenSize);
			
			dbo.collection('user').updateOne(updatequery, myobj, (err,res) =>{
				if(err){ 
					throw err;
					console.log(err);
				}				
				db.close();
			});
		});
			
	});
}


function setShareLog(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		const dropTime = Date.now();
		const myObj = {date : dropTime};
		dbo.collection('droplog').insertOne(myObj,(err, res) => {
			console.log("insert drop history");
			db.close();
		});
	});		
}

function checkTime(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		dbo.collection('droplog').find().limit(1).sort({_id:-1}).toArray(function(err, result){
			if(err) throw err;
			console.log("last record", result[0]);
			const currentTime = Date.now();
			if(currentTime - result[0].date > 1000 * 60 * 60 * 24){
				console.log("do airdrop");
				getUserVoting();
				setShareLog();
			}else{
				console.log("do not do airdrop");
			}
			db.close();
		});
	});
}

//aidrop for dabble writing base
function airdropByWriting(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now() - 1000*60*60*24;
		var tod1 = Date.now();
		const findQuery = {date : {$gt:tod, $lt:tod1} };
		dbo.collection("board").find(findQuery).toArray(function(err, result){
			if(err) throw err;
			const totalPosting = result.length;
			console.log("airdropByWriting totalPosting", totalPosting);
			for(i=0;i<result.length;i++){
				var tokenSize = parseFloat(postingDistributionForDay) / parseFloat(totalPosting);
				tokenSize = parseFloat(tokenSize);
				tokenSize = tokenSize.toFixed(4);			
				setWallet2(result[i].account, tokenSize);
				console.log("airdropByWriting", result[i].account, tokenSize);
			}
			db.close();
		});
	});
}

		
	
		
	

//setInterval(checkTime, 1000*60*60*25);
//getUserVoting();
setShareLog();
airdropByWriting();
