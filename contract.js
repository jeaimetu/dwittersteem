const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "thebeantoken";

var express = require('express');
var app = express();

Eos = require('eosjs');
const fs = require('fs');

var port = process.env.PORT || 5000;
console.log("port", port);

 app.listen(port, function() {
   console.log("Listening on " + port);
 });

console.log("eoscafekorea contract test");

//mainnet
config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",//mainnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",//testnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",// 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'https://eos.greymass.com:443',
  //httpEndpoint:	"https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}


console.log("calling eos config");
eos = Eos(config);

let accountString = [
"gmydanrsgage","gm3tmnzrhege","gm3dkmjrgege","giztqobvgege","zndpvrf42oaz","datimeforest","datingxiaoxi","daveismyname","djrafateran1","zixinzhiyuan","gotomoonpos2","erdctcd1a2ua","daichao12345","d2vpvhheyv2q","zo3h31nkvnxe","crzdgfpdkhtu","cryptolife11","cryptocoma11","zofnx2pjpvns","zoq4gzmh2zu2","zxmxwqlqhxzq","gotomoonpos5","gotomoonpos4","ethjackcoin4","gotomooneos2","gezdqmjvgyge","gotomooneos3","ge4tomzzhage","ge4tcmbrgqge","gotomooneos4","gotomooneos5","gotomoonpos1","g43danbrguge","fxg4ba13xwyt","fuguiyingmen","fsd32ty3vgq2","freemindeos1","gotomoonpos3","foalhh1e4rjh","fckgqbqemhj5","gotomooneos1","akubuefelix3","bijiaqicome4","2x325did5i5v","3euvuopleyp2","bgvrpfdfdo2y","3zugmw1gc23k","bijiaqicome3","bijiaqicome2","bihuwangyang","abhoshyla152","aceky341rwi3","barineka1111","bananer12345","balichunfeng","zwq251xcshzh","aiq2mblnnsuy","435nncxawzyg","ajanikasumu1","2s1zlzhzppia","bijiaqicome5","bitkeepkit11","bkd1p4atzfin","blossomluv12","bluetoskyeo1","bluetoskyeo2","bluetoskyeo3","bluetoskyeo4","bluetoskyeo5","bingchashang","zr1qwojditxf","bilibilisoe1","bijiaqicome1","bilibilisoe2","bilibilisoe3","bilibilisoe4","bilibilisoe5","ha4tgmzrguge","gu3tamrxg4ge","imeosforceio","bepal.x","lhjslhjslhjs","g4ytaojygyge","wenchenchen1","g44dqnrsguge","hazdgnryhage","g44dqnzrgmge","superoneioaa","tpdappincome","gi3dqmzqgyge","arnoldlovego","g43donbsgene","zhuyouzhuyou","eosionewyork","nisaihua1122","haydonbtgqge","gu4dsmruhage","jian4knights","eosplaytimes","gu4tembvhage","gqztinjtgene","jasoneos1111","gu4tkobrhege","haytanjthage","gu4tiojqg4ge","ecosystemlab","eostoken4133","gu3tmnruhege","touq5555ruqu","ekoliaofight","gyytkobqguge","me1111111111","me5555555555","g44tmnbtgqge","majinfeng123","qidanlangren","eoschainceon","gy2denjqg4ge","imqiyueqiyue","g43doojrgege","eos1211penzz","521314531314","gnfaupafce22","qjl131qjl131","fred11111111","zooxiong1111","kimsangyun11","dexonchaince","forlotlott22","anaszpaseeos","chengengping","gu3tamrxgage","gqztanzthege","gi2dcobtg4ge","gm3dcmzqhage","dalgomfather","eosredeemer1","haytanztgqge","cyz123455432","gu2dgnzqgyge","eoshaiwei222","ge3tknbshege","je1p5wdaboc5","haytomjvgmge","yiyuncai1111","gordbuckley1","g42dknrvhage","gyytqnjzgige","aifuturewell","hezdemzygage","wenzhangeoss","bybitdeposit","zhangkai2315","whatyougonna","ge4diojvguge","eidosonecoin","g44tanrzguge","micalways545","codingexpert","11kechayedan","xijinchao123","zhouyong1111","gezdqmbsgige","coinidcoinid","colintcrypto","guytsmjsgage","liuchen12345","starteosking","skvisjxkvoej","richcoincoin","sumoada12345","darkfossilxx","theornigod13","m4jpnzstmy2z"

]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	try {
	const options = { authorization: [ `thebeantoken@active` ] };
	const myaccount = await eos.contract("thebeantoken");
	await myaccount.clear(account_name,"4,BEAN",options);
	} catch (error) {
		console.log(error);
	}
}

/*
function ttt(account,callback){
	MongoClient.connect(url, function(err, db) {
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : "길막테디"};
		dbo.collection("user").findOne(findQuery, function(err, resFind){
			 if(err) throw err;
			 const sendAmount = resFind.wallet;
			
transfer("eoscafekorea","gyydoojzgige","0.0001", "test").then((output)=>{
	console.log("OK");
				 const updateQuery = {account : account};
				 const myObj = {$set : {wallet : "0"}};
				 dbo.collection("user").updateOne(updateQuery, myObj,function(err, resFind){
					 if(err) throw err;
					 db.close();
					 callback("success");
				 }); //end of updateOne

}).catch((err)=>{
	console.log("transfer error");
	db.close();
	callback("success");
});
		});
	});
	
}
*/

//ttt("길막테디", (result) => {console.log(result)});





/*
eos.transaction(tr => {
	  tr.buyrambytes({
    payer: 'lghackerthon',
    receiver: 'lghackerthon',
    bytes: 400*1024
  })
});
*/


console.log("calling delete");
function deleteLoop(idx){
	console.log("before calling index string " + idx);
	deleteAccount(accountString[idx]);	
	idx = idx + 1;
	if(idx > 25000){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,600,idx)
	
}
			

setTimeout(deleteLoop,1000, 0);


//deleteAccount("eoscafekorea");
/*
accountString.forEach(function (item, index, array) {
  //console.log(item, index)
	deleteAccount(item);
})
return;
*/
			
			
/* for setting new contract
wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
eos.setcode("thebeantoken", 0, 0, wasm) // @returns {Promise}
eos.setabi("thebeantoken", JSON.parse(abi)) // @returns {Promise}
*/
/*
async function getTransaction(){
	const transaction = await eos.getTransaction("94edddbaaa0a98872f6300768e6321effe5ccc91a3834eddfad9d59ded9db2d7")
	//console.log(transaction);
	//console.log(transaction.trx);
	console.log(transaction.trx.trx.actions[0].data.quantity);
}

//setTimeout(getTransaction, 3000);
//getTransaction();

async function createToken(account){
  await eos.transaction(account, myaccount => {

  // Create the initial token with its max supply
  // const options = {authorization: 'myaccount'} // default
    //500,000,000 is the base. Annual inflation is 5% to 5 years. Others will be burned.
  const options = { authorization: [ `taketooktook@active` ] };
  myaccount.create(account, '10000000000.0000 TOOK', options)//, options)

  // Issue some of the max supply for circulation into an arbitrary account
  myaccount.issue(account, '10000000000.0000 TOOK', 'issue', options)
})

  //const balance = await eos.getCurrencyBalance(account, account, 'DAB')
  //console.log('Currency Balance', balance)
}


async function transfer(from, to, amount){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "BEANS","");
}



//createToken("taketooktook");

if(process.env.dist != "true")
	return;

eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
	console.log("thebeantoken balance", result);
});

eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
	console.log("thebeantoken balance", result);
});

//transfer("eoscafekorea","awesometeddy","1000.0000");
               



//transfer("eoscafekorea","gu2dknbqgage",1000.0000);
/*
eos.transaction(eos =>
  {
    eos.issue('awesometeddy', '1111.0000 DAB', "initial token transfer");
});
*/
//eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
//	console.log("eoscafekorea balance", result);
//});
/*
options = {
  authorization: 'eoscafekorea@active',
  broadcast: true,
  sign: true
}
eos.transfer('eoscafekorea', 'awesometeddy', '1000.0000 DAB', '',options)
*/

//eos.transaction("eoscafekorea", myaccount => {
// Issue some of the max supply for circulation into an arbitrary account
	//myaccount.issue("eoscafekorea", '20000000.0000 DAB', 'issue')
  //myaccount.transfer("eoscafekorea", "g44dqnbsg4ge", '9991000.0000 DAB', "DAB Adviser Fund");
	  //myaccount.transfer("eoscafekorea", "abraininajar", '10000000.0000 DAB', "DAB Founder Fund");
	  //myaccount.transfer("eoscafekorea", "gu2dmojqgqge", '10000000.0000 DAB', "DAB Founder Fund");
	  //myaccount.transfer("eoscafekorea", "gu2dknbqgage", '10000000.0000 DAB', "DAB Founder Fund");
	  //myaccount.transfer("eoscafekorea", "gu3dinjtgage", '10000000.0000 DAB', "DAB Founder Fund");
	  //myaccount.transfer("eoscafekorea", "q1q1q1q1q1q1", '10000000.0000 DAB', "DAB Founder Fund");
//});


                  
                                                                                                                     
                                                                                                                     
