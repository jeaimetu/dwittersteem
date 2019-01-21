//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

const period = 10;
let tick = 1;

async function dailyWritingUser(day){
	MongoClient.connect(url, (err, db) => {
		const dbo = db.db("heroku_dg3d93pq");    
		var tod = Date.now() - 1000*60*60*24*(day); //24hours from now
		var tod1 = Date.now() - 1000*60*60*24*(day-1);

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
			
      			console.log("number of users for posting", day, result.length, Date.now(), tod, tod1, tod.toString(), tod1.toString());
			tick++;
			db.close();
		});
	});
}

async function doStat(){
	for(i=1;i<period;i++){
  		await dailyWritingUser(i);  
	}
}

setInterval(function(){dailyWritingUser(tick)}, 1000);
