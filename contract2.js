//mongo DB
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

const Eos = require('eosjs');

config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'https://proxy.eosnode.tools',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

eos = Eos(config);


function transfer(from, to, amount, msg){
	eos.transaction("eoscafekorea", myaccount => {
	myaccount.transfer(from,to, amount + " " + "DAB", msg);
	});
}

async function transfer2(from, to, amount, memo){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "DAB",memo);
}


exports.sendMessage = function(account, msg){  
  const adMsg = "Please visit https://dabble.cafe";
	var resultMsg;
  //var maxLength = 255 - adMsg.length - 20 - account.length;
	//const msgLength = msg.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;
  //maxLength = maxLength < msg.length ? maxLength : msg.length;
	resultMsg = adMsg;
	resultMsg += " id: " + account;
	resultMsg += " data: " + msg;
	
		
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var findquery = { account : account };
		dbo.collection("user").findOne(findquery, function(err, res){
			console.log("send message query result", res);
			if (err) throw err;
			if (typeof res.walletAccount == "undefined"){
				transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
				db.close();	
			}else{
				if(res.walletAccount.length == 12){
					transfer2("eoscafekorea", res.walletAccount, 
						  0.0001, resultMsg.substring(0,80)).then((output)=>{
						db.close();
						}).catch((err)=>{
						transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
						db.close();
					});
				}else{
					transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
				}
			}
		});
	});			

}

exports.getAmountByTransaction = async function(trx_id, account, cb){
	var body = {
		  "result": "OK",
		  "quantity" : 0
	}
	const transaction = await eos.getTransaction(trx_id)
	console.log("trx_id", trx_id);
	console.log("account", account);
	//console.log(transaction);
	//console.log(transaction.trx);
	console.log(transaction.trx.trx.actions[0].data.quantity);
	body.quantity = transaction.trx.trx.actions[0].data.quantity;
	var parseData = transaction.trx.trx.actions[0].data.quantity.split(" ");
	if(parseData[1] != "DAB"){
		body.result = "false";
		console.log("Symbol mismatch");
		cb(body);
		return;
	}
	if(transaction.trx.trx.actions[0].data.to != "eoscafekorea"){
		body.result = "false";
		console.log("To ID mismatch");
		cb(body);
		return;
	}
	//need to implement block time check.
	
	//db update
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var findquery = { account : account };
		dbo.collection("user").findOne(findquery, function(err, res){
			//transform the string to number then addition.
			const temp = body.quantity.split(" ");
			
			var temp2 = parseFloat(res.wallet) + parseFloat(temp[0]);
			var newValue = parseFloat(temp2).toFixed(4);
			console.log(temp, temp[0], temp[1], temp2, newValue,parseFloat(res.wallet).toFixed(4),parseFloat(temp[0]).toFixed(4)  );
			var newvalues = { $set: {wallet : newValue } };
			dbo.collection("user").updateOne(findquery, newvalues, function(err, result){
				console.log("update wallet", newValue);
				db.close();
				cb(body);
			});
			db.close();
		});
	});
	

}

exports.voteMessage = function(from,to,msgid){  
	console.log("voteMessage", from, to, msgid);
  const adMsg = "Please visit https://dabble.cafe";
	var resultMsg;
  //var maxLength = 255 - adMsg.length - 20 - account.length;
	//const msgLength = msg.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;
  //maxLength = maxLength < msg.length ? maxLength : msg.length;
	resultMsg = adMsg;
	resultMsg += " " + from + " Voted ";
	resultMsg += to + " for " + msgid;
	
		
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db("heroku_dg3d93pq");
		var findquery = { account : to };
		dbo.collection("user").findOne(findquery, function(err, res){
			console.log("send message query result", res);
			if (err) throw err;
			if (res == null || typeof res.walletAccount == "undefined"){
				transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
				db.close();	
			}else{
				if(res.walletAccount.length == 12){
					transfer2("eoscafekorea", res.walletAccount, 
						  0.0001, resultMsg.substring(0,80)).then((output)=>{
						db.close();
						}).catch((err)=>{
						transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
						db.close();
					});
				}else{
					transfer("eoscafekorea","awesometeddy",0.0001, resultMsg.substring(0,80));
				}
			}
		});
	});			

}




		
	
exports.sendDab = function(account, amount, callback){
	//transfer DAB to real EOS account
	//success : reset wallet count to zero
	//fail : do nothing and show fail popup
	console.log("sendDab", account, amount);
	MongoClient.connect(url, function(err, db) {
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : account};
		dbo.collection("user").findOne(findQuery, function(err, resFind){
			if(err) throw err;
				console.log("sendDab findquery result", resFind);
				const currentAmount = parseFloat(resFind.wallet);
				const sendAmount = parseFloat(amount);
				console.log("calling transfer2", resFind.walletAccount, sendAmount, currentAmount);
			if(currentAmount >= sendAmount){			
			 	transfer2("eoscafekorea", resFind.walletAccount, sendAmount.toFixed(4), "https://dabble.cafe daily airdrop").then((output)=>{
					const updateQuery = {account : account};
					var remainAmount = 0;
					remainAmount = currentAmount - sendAmount;
					const myObj = {$set : {wallet : remainAmount.toFixed(4)}};
					dbo.collection("user").updateOne(updateQuery, myObj,function(err, resFind){
						if(err) throw err;
						db.close();
						callback("success");
				 	}); //end of updateOne
				 }).catch((err)=>{
				 	db.close();
				 	callback("fail");
				 });
			}else{
				db.close();
				callback("fail");
			}
		 }); //end of findOne
	}); //end of connect
}

exports.getTokenBalanceEach = function(account, tokenCode, callback){
	
		var body = {
			  "result": "OK",
			  "balance" : 0
	  	};
	if(account == undefined){
		callback(body);
		return;
	}
	MongoClient.connect(url, function(err, db) {
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : account};
		dbo.collection("user").findOne(findQuery, function(err, resFind){
			if(err) throw err;
			eosAccount = resFind.walletAccount;
			console.log("getTokenBalanceEach", eosAccount);
		
			eos.getTableRows({json : true,
                      			code : tokenCode,
                 			scope: eosAccount,
                 			table: "accounts",
                 	}).then((res) => {
				console.log("getTableRows success", res);
		    		if(res != undefined && res.rows != undefined && res.rows.length != 0){
					body.result = "OK";
					body.balance = res.rows[0].balance;
     					callback(body);
					db.close();
				}
    				else
     					callback(body);
					db.close();
			}).catch((err) => {
				console.log("getTableRows read error", err);
                  		callback(body);
				db.close();
				});
			});
	});

}
