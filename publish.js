const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;


function publishData(){
	var msg = "Dabble의 짧은 글을 모아 보았습니다.";
  	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now() - 1000*60*60*8;
		const findquery = { date : {$gt:tod} };
		dbo.collection("board").find(findquery).toArray(function(err, result){
			for(i = 0;i<result.length;i++){
				msg += "<h3>";
				msg+= result[i].account;
				msg += "</h3>" + "<br>";				
				msg += result[i].data;
				msg += "<br><br>" + "***"";
			}	
			return msg;
		});
	});
}

console.log(publishData());
		
		
		
	  
