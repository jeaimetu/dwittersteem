const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const steem = require('steem');

//After writing, this needs cool down time to create the block chain
function writingReply(data, id){
	child_permlink = "dabbledabble-test";
	var private_posting_wif = process.env.pass;
	var parent_author = "";
	//var parent_author = '';
	var parent_permlink = "kr-dev";
	var json_metadata = '';
	//check author have . then remove that
	var parent_author_permlink = "dabble";
	
	if(data == null){
		data = "you missed something!!!!";
	}


	//const permlink = steem.formatter.commentPermlink(parent_author_permlink, parent_permlink)
	const perlink = Date.now() + "dabble";
	//const permlink = steem.formatter.commentPermlink('jeaimetu', parent_permlink)
	var content = data;
	
	steem.broadcast.comment (
    	private_posting_wif,  // Steemit.com Wallet -> Permissions -> Show Private Key (for Posting)
    	parent_author,        // empty for new blog post 
    	parent_permlink,      // main tag for new blog post
    	'dabble',               // same user the private_posting_key is for
    	permlink,             // a slug (lowercase 'a'-'z', '0'-'9', and '-', min 1 character, max 255 characters)
    	'Dabble 퍼블리슁 2',                // human-readable title
    	content,                 // body of the post or comment
    	json_metadata,          // arbitrary metadata
		function (err, result){
			if(err)
				console.log('Failure', err);
			else{
				console.log('Success');
				//update mongo DB
				//saveFlag(id);
			}
		}
		);
		
}


function publishData(){
	var msg = "![](https://cdn.steemitimages.com/DQmTuuRkSahdiMaH1X4esGJNUFaqdcA8v2qWn1ZJn7DGKsr/image.png)";
	msg += "Dabble의 짧은 글을 모아 보았습니다.<br><br>";
  	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var tod = Date.now() - 1000*60*60*40;
		var tod1 = Date.now() - 1000*60*60*18;
		const findquery = { date : {$gt:tod, $lt:tod1} };
		dbo.collection("board").find(findquery).toArray(function(err, result){
			for(i = 0;i<result.length;i++){
				msg += "<h3>";
				msg+= result[i].account;
				msg += "</h3>" + "<br>";				
				msg += result[i].data;
				msg += "<br><br>" + "\n" + "***" + "\n";
			}	
			console.log(msg);
			if(process.env.pub == 'true'){
			writingReply(msg, "dabble");
			return msg;
			}
		});
	});
}

		
publishData();		
		
	  
