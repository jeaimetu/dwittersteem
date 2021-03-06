//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;




var totalUser = 0;
var totalSumOfVoting = 0;
const votingFactor = 3;
const distributionForDay = 100;
const postingDistributionForDay = 20000;
const votingDistributionForDay = 10000;
const stakingDistributionForDay = 40000;

//distribution by voted article
function getUserVoting(){
	MongoClient.connect(url, (err, db) => {
		sumVoting(db, (result) => {
			db.close();
			console.log("getUserVoting", result);
		});
	});
	var sumVoting = (db, callback) => {
		var tod = Date.now() - 1000*60*60*24;
		var tod1 = Date.now();
		var agr = [
			{$match: {account: {$exists:true, $ne: null}}},
			{$match : {date : {$gt:tod, $lt:tod1} }},
			{$group: {_id:"$account", vote : { $sum : "$voting"}}}];
		var dbo = db.db("heroku_dg3d93pq");
		var cursor = dbo.collection('board').aggregate(agr).toArray( (err, res) => {
			//console.log(res);
			totalUser = res.length;
			//update each users token in their wallet
			getTotalVoting(res);
			for(i = 0; i < res.length;i++){
				setWallet(res[i]._id, res[i].vote, distributionForDay);
			}
		});
	};
}

//distribution by my voting acitivity
function getUserVoting2(){
	MongoClient.connect(url, (err, db) => {
		sumVoting(db, (result) => {
			db.close();
			console.log("getUserVoting2", result);
		});
	});
	var sumVoting = (db, callback) => {
		var tod = Date.now() - 1000*60*60*24;
		var tod1 = Date.now();
		var agr = [
			{$match: {account: {$exists:true, $ne: null}}},
			{$match : {date : {$gt:tod, $lt:tod1} }},
			{$group: {_id:"$account", vote : { $sum : 1}}}];
		var dbo = db.db("heroku_dg3d93pq");
		var cursor = dbo.collection('voting').aggregate(agr).toArray( (err, res) => {
			//console.log(res);
			totalUser = res.length;
			//update each users token in their wallet
			getTotalVoting(res);
			for(i = 0; i < res.length;i++){
				setWallet(res[i]._id, res[i].vote,votingDistributionForDay);
			}
		});
	};
}

function getTotalVoting(res){
	totalSumOfVoting = 0;
	for(i = 0;i < res.length; i++)
		totalSumOfVoting += parseFloat(res[i].vote);
	return totalSumOfVoting;
}

function setWallet(account, vote, distSize){
	console.log("setWallet", account, vote);

	MongoClient.connect(url, (err, db) => {
		if(err) throw err;
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : account};
		dbo.collection('user').findOne(findQuery, (err, result) => {
			//console.log(result);
			if(err){ 
				throw err;
				console.log(err);
			}
			if(result === null){
				db.close();
				return;
			}
			const updatequery = {account : account};
			
			var tokenSize = (vote / totalSumOfVoting) * distSize + parseFloat(result.wallet);
			//var tokenSize = (vote / totalSumOfVoting) * distributionForDay;
			console.log("tokenSize", tokenSize, vote, totalSumOfVoting, result.wallet);
			tokenSize = tokenSize.toFixed(4);
			const myobj = { $set : {wallet : tokenSize}};
			console.log("update wallet", account, tokenSize);
			if(isNaN(tokenSize) == true){
				db.close();
				console.log("tokenSize is not number", account, tokenSize);
				return;
			}

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
			//console.log(result);
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
			//var tokenSize = parseFloat(vote);
			console.log("tokenSize", tokenSize, vote, result.wallet);
			tokenSize = tokenSize.toFixed(4);
			const myobj = { $set : {wallet : tokenSize}};
			console.log("update wallet2", account, tokenSize);
			if(isNaN(tokenSize) == true){
				db.close();
				console.log("tokenSize is not number", account, tokenSize);
				return;
			}
			
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
			if(currentTime - result[0].date >= (1000 * 60 * 60 * 24 - 1000 * 60)){
				console.log("commit airdrop");
				setShareLog();
				getUserVoting();
				setTimeout(airdropByWriting, 1000*10);
				setTimeout(airdropByStaking, 100020);				
				setTimeout(getUserVoting2, 1000*30);
				setTimeout(resetPostLimit,1000*40);				
			}else{
				console.log("do not do airdrop", currentTime - result[0].date, 1000 * 60 * 60 * 24);
				setTimeout(checkTime, 1000*60); //1 min
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

		const agr = [
			{$match: {account: {$exists:true, $ne: null}}},
			{$match : {date : {$gt:tod, $lt:tod1} }},
			{$group: {_id:"$account", count : { $sum : 1}}}
			];
		dbo.collection("board").aggregate(agr).toArray(function(err, result){
			if(err){
				throw err;
				console.log("db error", err);
				db.close();
			}
			//console.log("db result", result);
			var totalPosting = 0;
			console.log("number of users for posting", result.length);
			
			for(i = 0;i<result.length;i++){
				totalPosting += result[i].count;
				if(result[i].count >= process.env.MEDIAN)
					result[i].count = process.env.MEDIAN;
			}
			console.log("airdropByWriting totalPosting", totalPosting);
			for(i=0;i<result.length;i++){
				var tokenSize = result[i].count * parseFloat(postingDistributionForDay) / parseFloat(totalPosting);
				tokenSize = parseFloat(tokenSize);
				tokenSize = tokenSize.toFixed(4);			
				setWallet2(result[i]._id, tokenSize);
				console.log("airdropByWriting", result[i]._id, tokenSize);
			}
			db.close();
		});
	});
}

function airdropByStaking(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find({}).toArray(function(err, result){
			var totalStaking = 0;
			for(i = 0; i < result.length ; i++)
				totalStaking += parseFloat(result[i].staked);
			
			for(i = 0; i < result.length; i++){
				var tokenSize = parseFloat(result[i].staked) * parseFloat(stakingDistributionForDay) / parseFloat(totalStaking);
				tokenSize = parseFloat(tokenSize);
				tokenSize = tokenSize.toFixed(4);
				const account = result[i].account;
				if(isNaN(tokenSize) == false){
					//console.log("setWallet2", account, tokenSize);
					setWallet2(account, tokenSize);				
				}
				console.log("airdropByStaking", account, tokenSize, totalStaking);
			}
			db.close();
		});
	});
}

function compareNumbers(a, b){
	return a.wallet - b.wallet;
}

function displayStakingInfo(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find({}).toArray(function(err, result){
			var totalStaking = 0;
			result.sort(compareNumbers);
			for(i = 0; i < result.length ; i++)
				totalStaking += parseFloat(result[i].wallet);
			
			for(i = 0; i < result.length; i++){
				var tokenSize = parseFloat(result[i].wallet) * parseFloat(stakingDistributionForDay) / parseFloat(totalStaking);
				tokenSize = parseFloat(tokenSize);
				tokenSize = tokenSize.toFixed(4);
				const account = result[i].account;				
				console.log("airdropByStaking", account, tokenSize, totalStaking);
			}
			db.close();
		});
	});
}

function getStakingInfo(){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		dbo.collection("user").find({}).toArray(function(err, result){
			var totalStaking = 0;
			result.sort(compareNumbers);
			for(i = 0; i < result.length ; i++)
				totalStaking += parseFloat(result[i].staked);
			var updateQuery = {item : "stakeSum"}
			var myObj = { $set:{ item : "stakeSum", stakeSum : totalStaking.toFixed(4)}};
			dbo.collection("stakingInfo").updateOne(updateQuery, myObj, {upsert : true}, function(err, updateResult){				
				if(err){
					console.log("getStakingInfo error", err);
					db.close();
				}
				console.log("getStakingInfo update completed", totalStaking.toFixed(4));
				db.close();				
			});			
		});
	});
}


	
		
function communityAirDrop(amount){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now() - 1000*60*60*24*16;
		var tod1 = Date.now() - 1000*60*60*24*12;
		const findquery = { date : {$gt:tod, $lt:tod1} };
		dbo.collection("user").find(findquery).toArray(function(err, result){
			for(i = 0; i< result.length; i++){
				console.log("time airdrop ", result[i].account, result[i].wallet);
				setWallet2(result[i].account, 1000);
			}
		});
	});	
}

async function restoreWallet(){
	var url2 = process.env.MONGODB_RESTORE;
	console.log("url2", url2);
	MongoClient.connect(url2, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		var findQuery = {};
		dbo.collection("user").find(findQuery).toArray(function(err, result){
			//console.log("read db", result, result.length);
			for(i=0;i<result.length;i++){
			restorePersonWallet(result[i].account, result[i].wallet);
			}

		});
	});
		
}

async function restorePersonWallet(account, wallet){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");
		var findQuery = {account : account};
		var myObj = { $set:{wallet : wallet}};
		dbo.collection("user").updateOne(findQuery, myObj, (err, result) => {
			console.log("restore success", account, wallet);
			db.close();
		});
	});
}

async function resetPostLimit(){
	const client = await MongoClient.connect(url);
	const db = client.db('heroku_dg3d93pq');
	var findQuery = {};
	var res = await db.collection("user").find(findQuery).toArray();
	//console.log(res);
	console.log("starting  resetPostLimit process", Date.now());
	var loopCount = res.length;
	for(const item of res){
		var findAccount = item.account;
		var postLimitUpdate = item.postLimitMax;
		var updateQuery = {account : findAccount};
		console.log("reset limit", findAccount, postLimitUpdate, Date.now());
		//use another DB or do not close
		var myObj = {$set : {postLimit : postLimitUpdate}};
		try {
		var temp = await db.collection("user").updateOne(updateQuery,myObj);
		} catch(err){
			console.log("reset limit error", findAccount, err);
		}
	}
	console.log("ending  resetPostLimit process", Date.now());
	//client.close();	
	setTimeout(checkTime, 1000*60); //1 min
	console.log("resetPostLimit Test", loopCount, res.length);
}

async function resetPostLimit2(){
	const client = await MongoClient.connect(url);
	const db = client.db('heroku_dg3d93pq');
	var findQuery = {postLimit : 0 };
	var res = await db.collection("user").find(findQuery).toArray();
	//console.log(res);
	console.log("starting  resetPostLimit process", Date.now(), res.length);
	for(i=0;i<res.length;i++){
		var findQuery = {account : res[i].account};
		console.log("reset limit", res[i].account, res[i].postLimitMax, i);
		var myObj = {$set : {postLimit : res[i].postLimitMax}};
		var temp = await db.collection("user").updateOne(findQuery,myObj);
		console.log("update result", temp, i);
	}
	console.log("ending  resetPostLimit process", Date.now());
	client.close();	
}


const UNSTAKE_PERIOD = 1000*60*60*72;
async function refundDab(){
	const client = await MongoClient.connect(url);
	const db = client.db('heroku_dg3d93pq');
	var findQuery = {};
	var res = await db.collection("user").find(findQuery).toArray();
	console.log("starting refund process", Date.now());
	for(i=0;i<res.length;i++){
		if(res[i].unstaked != 0 && (isNaN(res[i].unstaked) == false)){
			if(res[i].unstaked_time + UNSTAKE_PERIOD <= Date.now()){
				var newValue = parseFloat(res[i].wallet) + parseFloat(res[i].unstaked);
				var quantity = parseFloat(res[i].unstaked).toFixed(4);
				console.log("refund_test", res[i].unstaked, quantity);
				var myObj = {$set:{unstaked : 0, wallet : newValue.toFixed(4)}};
				var findQuery2 = {account : res[i].account};
				console.log("refund", newValue.toFixed(4), res[i].account, res[i].wallet);
				var temp = await db.collection("user").updateOne(findQuery2,myObj);				
				//write refund history
				var myObj = {account : res[i].account, walletBackup:res[i].wallet, amount : quantity, refund_time : Date.now()};
				res = await db.collection("refundHistory").insertOne(myObj);
			}
		}
	}
	console.log("ending refund process", Date.now());
	setTimeout(refundDab, 1000*60);
	client.close(); //(automatically closed, also close behavior is not defined.
}
	
setTimeout(checkTime, 1000*60); //1 min
setTimeout(refundDab, 1000*60);  //1 min
getStakingInfo();
setInterval(getStakingInfo, 1000*60*10);


//getUserVoting();
//getUserVoting2();
//setShareLog();
//setTimeout(airdropByWriting, 1000*60*2);
//communityAirDrop(1000);
//airdropByStaking();
//displayStakingInfo();
//airdropByStaking();
//restoreWallet();
//temporal airdrop
/*
console.log("do airdrop");
getUserVoting();
setShareLog();
setTimeout(airdropByWriting, 1000*60*2);
setTimeout(airdropByStaking, 1000*60*3);				
setTimeout(getUserVoting2, 1000*60*4);
*/

			   
							       
