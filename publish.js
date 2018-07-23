const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;


function publishData(){
  	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now();
		
		dbo.collection("board").find(findquery).toArray(function(err, result){
			for(i = 0;i<result.length;i++){
				console.log(result[i].data);
			}			
		});
	});
}

publishData();
		
		
		
	  
