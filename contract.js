const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "eoscafekorea";

Eos = require('eosjs');
const fs = require('fs');



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
	"g43doobzgege", "g44tamjrgmge", "g43doojyhage", "g43dqmjsg4ge", "g43dqmjsgyge", "g43dqmrsgene", "g43dqmzzgage", "g43dqnjsgige", "g43dqnjsguge", "g43dqnzxgige", "g43dqobtgege", "g43dqobtgyge", "g43dqojthage", "g43dqojvg4ge", "g43dqojwg4ge", "g43dsmjuhage", "g43dsmjvgene", "g43dsmrqgmge", "g43dsmrwg4ge", "g43dsnbtgige", "g43dsnjwhege", "g43dsnrqgene", "g43dsnrwgqge", "g43dsnzrhege", "g43dsnzsgmge", "g43dsobshege", "g43dsobtgqge", "g43dsobuguge", "g43dsobwguge", "g43dsobzhege", "g43dsojqgyge", "g43dsojthege", "g43dsojugege", "g43dsojxhage", "g43tambwg4ge", "g43tamjqgyge", "g43tamjvgmge", "g43tamjygyge", "g43tamrwhege", "g43tamrxhege", "g43tamrzgege", "g43tamzugige", "g43tamzwguge", "g43tanbqgage", "g43tanbtgmge", "g43tanbxgyge", "g43tanbygage", "g43tanjygege", "g43tanjzgyge", "g43tanrqgqge", "g43tanrrg4ge", "g43tanrtgene", "g43tanrugene", "g43tanrvhage", "g43tanrwgege", "g43tanryhege", "g43tanztgige", "g43tanzwhege", "g43tanzxgmge", "g43taoagenes", "g43taobsgene", "g43taobwgene", "g43taobxgyge", "g43taobyhage", "g43taobzgyge", "g43tcmjsgege", "g43tcmjygige", "g43tcmrrgmge", "g43tcmrsgige", "g43tcmrzguge", "g43tcmzygene", "g43tcnbqguge", "g43tcnbthage", "g43tcnbvgene", "g43tcnbwguge", "g43tcnjshege", "g43tcnjugige", "g43tcnjxgqge", "g43tcnjygage", "g43tcnjzgage", "g43tcnrsgqge", "g43tcnrzgige", "g43tcnrzgqge", "g43tcnzsgmge", "g43tcnzygage", "g43tcobtguge", "g43tcobvhage", "g43tcobwhege", "g43tcojqg4ge", "g43tcojqguge", "g43tcojtg4ge", "g43tembsguge", "g43tembtgyge", "g43tembygyge", "g44tamzqgege", "g43temztg4ge", "g43temztgqge", "g43temzvgage", "g43temzvgmge", "g43temzzgege", "g43tenbsgyge", "g43tenbtgege", "g43tenbugyge", "g43tenbzguge", "g43tenjugage", "g43tenjxgqge", "g43tenjyhege", "g43tenrugige", "g43tenrvgqge", "g43tenrwhage", "g43tenzwgmge", "g43teojsgyge", "g43teojtgqge", "g43teojugege", "g43tgmbqhege", "g43tgmjsguge", "g43tgmjwhage", "g43tgmjzgmge", "g43tgmzqgene", "g43tgmzsgage", "g43tgmzuhege", "g43tgmzwgege", "g43tgmzxgige", "g43tgnbvg4ge", "g43tgnbvhege", "g43tgnbygage", "g43tgnbzgige", "g43tgnjsguge", "g43tgnjzg4ge", "g43tgoagenes", "g43tgobqgyge", "g43tgobrgene", "g43tgojsgige", "g43tgojtgqge", "g43tgojzgyge", "g43timbqguge", "g43timbrgege", "g43timbtgyge", "g43timbugege", "g43timbuhege", "g43timbwgmge", "g43timrvgyge", "g43timrwgqge", "g43timrxgene", "g43timryhage", "g43timygenes", "g43timzrgyge", "g43timzvhege", "g43timzygqge", "g43tinbqgage", "g43tinbrgqge", "g43tinbxhege", "g43tinbygage", "g43tinjqgene", "g43tinjwhage", "g43tinrwhage", "g43tinrygyge", "g43tinzqgqge", "g43tiobzgqge", "g43tiojqgige", "g43tiojqhage", "g43tiojzgmge", "g43tkmagenes", "g43tkmbsgyge", "g43tkmbvgege", "g43tkmbvgyge", "g43tkmbxguge", "g43tkmbzgmge", "g43tkmrrhege", "g43tkmrwgmge", "g43tkmrygene", "g43tkmzrgyge", "g43tkmzvgege", "g43tkmzvgene", "g43tknbrgege", "g43tknzugege", "g43tknzwguge", "g43tknzyg4ge", "g43tknzygage", "g43tknzzgmge", "g43tknzzguge", "g43tkojqgyge", "g43tkojxgige", "g43tkojxgyge", "g43tmmbtgqge", "g43tmmbxhege", "g43tmmjsgage", "g43tmmjyhege", "g43tmmrqguge", "g43tmmrvgyge", "g43tmmrwgege", "g43tmmrzgqge", "g43tmnjtgyge", "g43tmnjwgage", "g43tmnjyhege", "g43tmnqgenes", "g43tmnrxhage", "g43tmnzvgyge", "g43tmobrg4ge", "g43tmobzgyge", "g43tmojrgene", "g43tmojtgige", "g43tmojxgege", "g43tmojzhage", "g43tombqguge", "g43tomjugene", "g43tomqgenes", "g43tomrrgqge", "g43tomrugage", "g43tomrvgege", "g43tomzrgege", "g43tomzzgege", "g43tonbqguge", "g43tonrwgage", "g43tonrxgmge", "g43tonrygyge", "g43tonryhage", "g43tonrzgege", "g43tonrzgqge", "g43tonzthege", "g43tonzzhage", "g43toobugene", "g43toojsgyge", "g43tqmbqgage", "g43tqmbsgage", "g43tqmbygmge", "g43tqmbzg4ge", "g43tqmjtgege", "g44tkobrhage", "g44tkojuhage", "g44dsojqgige", "g44dimzsgege", "g44dimzthege", "g44dimzugmge", "g44dimzzhage", "g44dinbqgqge", "g44dinbrhage", "g44dinbtg4ge", "g44dinbtguge", "g44dinbxhege", "g44dinbyhage", "g44dinjsgage", "g44dinjvgige", "g44dinjzhage", "g44dinzvguge", "g44dinzwgage", "g44diobvguge", "g44diojsgage", "g44diojthege", "g44diojwgage", "g44diojxgmge", "g44diojzgqge", "g44dkmbrgage", "g44dkmbshege", "g44dkmbtgege", "g44dkmjqgage", "g44dkmjqgmge", "g44dkmjvgqge", "g44dkmjygqge", "g44dkmrrgmge", "g44dkmrvgyge", "g44dkmrxgege", "g44dkmrxgige", "g44dkmrxguge", "g44dkmrygige", "g44dkmrygyge", "g44dkmzqguge", "g44dkmzugige", "g44dkmzuguge", "g44dkmzugyge", "g44dkmzxgqge", "g44dkmzxguge", "g44dkmzzgege", "g44dknagenes", "g44dknbqgene", "g44dknbugmge", "g44dknbvgage", "g44dknbvgige", "g44dknbwgene", "g44dknbxgege", "g44dknbxhage", "g44dknbyg4ge", "g44dknbygyge", "g44dknbzgqge", "g44dknjqg4ge", "g44dknjrg4ge", "g44dknjsgqge", "g44dknjxgage", "g44dknjxgige", "g44dknjxguge", "g44dknjxhage", "g44dknjyguge", "g44dknrqgige", "g44dknrsguge", "g44dsojsgage", "g44dknrwgqge", "g44dknrwgyge", "g44dknrzgqge", "g44dknzsgqge", "g44dknzwgqge", "g44dkobqgege", "g44dkobtgige", "g44dkobugage", "g44dkobvgage", "g44dkobvgene", "g44dkobvhage", "g44dkojrgmge", "g44dkojrguge", "g44dkojug4ge", "g44dkojxguge", "g44dkojzgyge", "g44dmmbrgyge", "g44dmmbsguge", "g44dmmbshege", "g44dmmbwgige", "g44dmmbxgmge", "g44dmmjqgage", "g44dmmjqgyge", "g44dmmjrhage", "g44dmmjzgyge", "g44dmmrqgqge", "g44dmmrqhege", "g44dmmrtgmge", "g44dmmrtgyge", "g44dmmrwguge", "g44dmmrxgege", "g44dmmrxhage", "g44dmmrzgige", "g44dmmrzgmge", "g44dmmygenes", "g44dmmzrgige", "g44dmmzrgmge", "g44dmmzwgage", "g44dmmzwguge", "g44dmmzygige", "g44dmnbqgage", "g44tmmrug4ge", "g44dmnbwgige", "g44dmnbxhage", "g44dmnbzgmge", "g44dmnbzhage", "g44dmnjrgmge", "g44dmnjtgene", "g44dmnjvgege", "g44dmnjwgege", "g44dmnjwgige", "g44dmnjxgige", "g44dmnrrgqge", "g44dmnrxhage", "g44dmnrygage", "g44dmnrygmge", "g44dmnzsgage", "g44dmnzvgmge", "g44dmnzygyge", "g44dmnzyhage", "g44dmobqgmge", "g44dmobsgqge", "g44dmobugqge", "g44dmojxhege", "g44dombrgege", "g44dombsgmge", "g44dombvguge", "g44domjqgege", "g44domjrhage", "g44domjshage", "g44domjugmge", "g44domjwgege", "g44domjwgige", "g44domjzhage", "g44domrrgmge", "g44domruguge", "g44domrxgmge", "g44domrzgige", "g44domzsgege", "g44domzygige", "g44donbqg4ge", "g44donbqgmge", "g44donbqguge", "g44donbsguge", "g44donbshege", "g44donbvguge", "g44donbwgqge", "g44donbxgage", "g44donbxgige", "g44donbxhege", "g44donbzg4ge", "g44donbzgyge", "g44donjsg4ge", "g44donjugige", "g44donjzgage", "g44donjzgege", "g44donjzgige", "g44donjzhage", "g44donrqgage", "g44donrqgige", "g44donrtgmge", "g44donrvgege", "g44donrvgyge", "g44donrwgage", "g44donrwgene", "g44donzrgage", "g44donzsgege", "g44donzsgyge", "g44donzugqge", "g44donzvhage", "g44donzxgyge", "g44donzzg4ge", "g44donzzgige", "g44doobqg4ge", "g44doobrg4ge", "g44doobrgqge", "g44doobsgqge", "g44doobsguge", "g44doobtgege", "g44doobugage", "g44doobugmge", "g44doobvgmge", "g44doojqgige", "g44doojsgige", "g44doojtguge", "g44doojvgqge", "g44doojwguge", "g44dqmbsgmge", "g44dqmbvhage", "g44dqmbwgage", "g44dqmbwgmge", "g44dqmbygage", "g44dqmjqgmge", "g44dqmjqhage", "g44dqmjrgage", "g44dqmjuhege", "g44dqmjygige", "g44dqmjyhege", "g44dqmrqgege", "g44dqmrshage", "g44dqmrugqge", "g44dqmrugyge", "g44dqmrxg4ge", "g44dqmrxgmge", "g44dqmryguge", "g44dqmzqgage", "g44dqmzrg4ge", "g44dqmzugmge", "g44dqmzwg4ge", "g44dqnbqguge", "g44dqnbrgqge", "g44dqnbtgige", "g44dqnbwgmge", "g44dqnjrgage", "g44dqnjrhege", "g44dqnjug4ge", "g44dqnjuhege", "g44dqnjxgyge", "g44dqnjyg4ge", "g44dqnjygage", "g44dqnjzhage", "g44dqnrqgage", "g44dqnrsgyge", "g44dqnrtgige", "g44dqnrtguge", "g44dqnrvgige", "g44dqnrxgege", "g44dqnrygmge", "g44dqnrzgmge", "g44dqnygenes", "g44dqnzrgqge", "g44dqnzugige", "g44dqnzvgmge", "g44dqnzvgyge", "g44dqnzvhage", "g44dqnzwguge", "g44dqnzxgmge", "g44dqnzygige", "g44dqnzzgqge", "g44dqobtgege", "g44dqobvgyge", "g44dqobvhege", "g44dqobygige", "g44dqojrgyge", "g44dqojtgige", "g44dqojwgqge", "g44dqojyg4ge", "g44dqojzguge", "g44dsmbqgyge", "g44dsmbrg4ge", "g44dsmbrgqge", "g44dsmbsgmge", "g44dsmbuhage", "g44dsmbxguge", "g44dsmbzgqge", "g44dsmjrhege", "g44dsmjsg4ge", "g44dsmjshage", "g44dsmjxgage", "g44dsmrqgige", "g44dsmrrgage", "g44dsmrrhege", "g44dsmzugege", "g44dsmzwgige", "g44dsmzzguge"
	]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `eoscafekorea@active` ] };
	const myaccount = await eos.contract("eoscafekorea");
	await myaccount.clear(account_name,"4,DAB",options);
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
	if(idx > 500){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,500,idx)
	
}
			
setTimeout(deleteLoop,500, 1);

var static = require('node-static');
var file = new static.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 8080);
			
//deleteAccount("eoscafekorea");
/*
accountString.forEach(function (item, index, array) {
  //console.log(item, index)
	deleteAccount(item);
})
return;
*/
			
			

//wasm = fs.readFileSync(wasmUrl);  
//abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
//eos.setcode("eoscafekorea", 0, 0, wasm) // @returns {Promise}
//eos.setabi("eoscafekorea", JSON.parse(abi)) // @returns {Promise}

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


                  
                                                                                                                     
                                                                                                                     
