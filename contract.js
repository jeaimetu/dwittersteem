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
	"geytinzrg4ge", "geytinzrhege", "geytinzwgmge", "geytinzygene", "geytinzygige", "geytiobrgene", "geytiojugene", "geytkmbvgene", "geytkmbxgege", "geytkmjsgene", "geytkmzzgage", "geytknbzgqge", "geytknjqgqge", "geytknqgenes", "geytknrygene", "geytknzxguge", "geytkobtgmge", "geytkobxhege", "geytkobygene", "geytkobyhege", "geytkoigenes", "geytkojvgqge", "geytmmbtgqge", "geytmmbugige", "geytmmbvhage", "geytmmbzg4ge", "geytmmjwgige", "geytmmjzhege", "geytmmrvg4ge", "geytmmrvgene", "geytmmztgyge", "geytmmzxgqge", "geytmnbqgage", "geytmnbxgyge", "geytmnbygmge", "geytmnjvguge", "geytmnrugene", "geytmnzrgqge", "geytmobugene", "geytombygmge", "geytomjugege", "geytomrrgyge", "geytomrvguge", "geytonbygmge", "geytonjuhege", "geytonrrgmge", "geytoobtguge", "geytoobzg4ge", "geytoojthage", "geytqmjqgmge", "geytqmjsguge", "geytqmjtgege", "geytqmjtgene", "geytqmjugqge", "geytqmjxhage", "geytqnbvgene", "geytqnjwgage", "geytqnjygene", "geytqnrzguge", "geytqnzuguge", "geytqnzygmge", "geytqobshage", "geytqobwgige", "geytqojxhage", "geytsmbrg4ge", "geytsmbsgige", "geytsmbugene", "geytsmbygmge", "geytsmrqgene", "geytsmzugene", "geytsmzygmge", "geytsnbrgene", "geytsnbtgmge", "geytsnrxg4ge", "geytsnzsgyge", "geytsnztgmge", "geytsnzugene", "geytsnzzhage", "geytsobwhege", "geytsobyguge", "geytsojuguge", "gezdambrg4ge", "gezdambrgene", "gezdambsgyge", "gezdambvgene", "gezdambzhege", "gezdamzwgmge", "gezdanbwg4ge", "gezdanjtgene", "gezdanjygege", "gezdanjygige", "gezdanrwgmge", "gezdanrygene", "gezdanzsg4ge", "gezdanzygyge", "gezdaobugene", "gezdaobvguge", "gezdcmbrgege", "gezdcmjrgige", "gezdcmjtgene", "gezdcmjygage", "gezdcmrzhage", "gezdcmzxgyge", "gezdcnbtgene", "gezdcnrygene", "gezdcnzxgage", "gezdcobsgage", "gezdcobugage", "gezdcobzgqge", "gezdcobzhage", "gezdcojugene", "gezdcojxhege", "gezdembrgige", "gezdembxgige", "gezdembygege", "gezdemjugene", "gezdemrwguge", "gezdemzsguge", "gezdemztg4ge", "gezdemzxgage", "gezdemzxgqge", "gezdenjsgige", "gezdenjshege", "gezdenjzgqge", "gezdenrsgage", "gezdenzuguge", "gezdenzxgene", "gezdeobqgene", "gezdeobsguge", "gezdeojshege", "gezdeojwgyge", "gezdeojxgqge", "gezdeojxgyge", "gezdeojygage", "gezdeojzgene", "gezdgmagenes", "gezdgmbxgege", "gezdgmbygene", "gezdgmjtgage", "gezdgmzqhege", "gezdgmzugyge", "gezdgnbrg4ge", "gezdgnbugege", "gezdgnjwgage", "gezdgnrugage", "gezdgnrwgage", "gezdgnzqhege", "gezdgnzxgige", "gezdgobrhage", "gezdgojvgege", "gezdimbrgene", "gezdimbzgene", "gezdimjwhege", "gezdimqgenes", "gezdimrsgyge", "gezdimzqgene", "gezdimzqgige", "gezdimzsgyge", "gezdimzzg4ge", "gezdinjqhege", "gezdinjrgmge", "gezdinjxgege", "gezdinzqgene", "gezdinzrgqge", "gezdinzwgyge", "gezdiojugege", "gezdkmjwgqge", "gezdkmjzgene", "gezdkmrxgmge", "gezdkmzvgene", "gezdkmzxgene", "gezdknbrguge", "gezdknbsgage", "gezdknbtgmge", "gezdknbvhege", "gezdknjrguge", "gezdknzugene", "gezdknzvhage", "gezdkobugqge", "gezdkobvgene", "gezdkobygene", "gezdkojug4ge", "gezdmmbvhege", "gezdmmjvhege", "gezdmmjzgqge", "gezdmmrrgage", "gezdmmrtg4ge", "gezdmmrzhage", "gezdmmzrgage", "gezdmmzugmge", "gezdmnbsgege", "gezdmnbtg4ge", "gezdmnbvguge", "gezdmnjvguge", "gezdmnrtgene", "gezdmnrugege", "gezdmnrvgqge", "gezdmnryg4ge", "gezdmnzsg4ge", "gezdmnzsgmge", "gezdmnzsgqge", "gezdmobsgene", "gi2tmmrqgage", "gezdmobyguge", "gezdmojsguge", "gezdombrgige", "gezdombtgyge", "gezdombyhege", "gezdomjrgige", "gezdomjtguge", "gezdomjygige", "gezdomrsgmge", "gezdomrygmge", "gezdomzvgege", "gezdonbugege", "gezdonbygene", "gezdonrugege", "gezdonrwgage", "gezdonzqgage", "gezdonzqgyge", "gezdonzwgege", "gezdonzygage", "gezdoojvgqge", "gezdqmbsgige", "gezdqmbuhage", "gezdqmbzgige", "gezdqmjsgege", "gezdqmjxg4ge", "gezdqmjzgyge", "gezdqmzqgege", "gezdqmzsgege", "gezdqmzthege", "gezdqnbqgige", "gezdqnbqhage", "gezdqnbthage", "gezdqnbugene", "gezdqnbvgmge", "gezdqnbvguge", "gezdqnbzgqge", "gezdqnjrhage", "gezdqnrshage", "gezdqnrxgmge", "gezdqnrxgqge", "gezdqobrgmge", "gezdqobzgqge", "gezdqojtg4ge", "gezdqojxgage", "gezdsmbsg4ge", "gezdsmbxg4ge", "gezdsmbxhage", "gezdsmbzguge", "gezdsmrygmge", "gezdsmrzgige", "gezdsmzqgene", "gezdsmzwgyge", "gezdsmzygmge", "gezdsmzygqge", "gezdsnbtguge", "gezdsnbzgyge", "gezdsnjrguge", "gezdsobuhage", "gezdsojrgige", "geztambwhege", "geztamjqg4ge", "geztamjthege", "geztamzygene", "geztanrxgage", "geztanrxhege", "geztanrzgege", "geztanztgene", "geztaobwg4ge", "geztaobygene", "geztcmbshege", "geztcmbwg4ge", "geztcmjsgage", "geztcmjshage", "geztcmjvgege", "geztcmjygmge", "geztcmrrhege", "geztcmrwg4ge", "geztcnjwgige", "geztcnjzgene", "geztcnrzgene", "geztcnzqgege", "geztcoagenes", "geztcojvgige", "geztcojygqge", "geztembwg4ge", "geztemzqgyge", "geztemzxgege", "geztenbzhage", "geztenjugage", "geztenjvgene", "geztenzsgage", "geztenzugmge", "gezteojrhage", "gezteojsgyge", "geztgmbqhage", "geztgmjxgage", "geztgmzvgige", "geztgnjsgmge", "geztgnrtgmge", "geztgobqhege", "geztgobsgene", "geztgobwg4ge", "geztgojvgyge", "geztimjrg4ge", "geztimzsgmge", "geztimzugege", "geztinjrgene", "geztinzqguge", "geztinzzgene", "geztiobqgmge", "geztiobtgene", "gi3damrtguge", "geztkmbygene", "geztkmbzgene", "geztkmjzgege", "geztknjygyge", "geztknrygmge", "geztmmbugige", "geztmmbvhege", "geztmmjrgene", "geztmmjthege", "geztmmjvgyge", "geztmmrwgege", "geztmmrzgige", "geztmmzugene", "geztmmzwg4ge", "geztmmzxgene", "geztmnjqgege", "geztmnjvgyge", "geztmnrzgyge", "geztmnzrgqge", "geztmobrgege", "geztmojuhege", "geztmojzgqge", "geztombzgene", "geztomjxgege", "geztomrwg4ge", "geztomrygyge", "geztonjvgqge", "geztonrrgege", "geztonzxgage", "geztoobshege", "geztoobxgmge", "geztqmbwgage", "geztqmjygqge", "geztqnbrgyge", "geztqnbyhage", "geztqnjxgyge", "geztqobuhage", "geztqobxhage", "geztqojrgage", "geztqojvguge", "geztsmjthege", "geztsnbrhage", "geztsnjtgige", "geztsnjvhege", "geztsnjygige", "geztsojzgqge", "gi3domygenes", "gi3tmobrgige", "gi2dambvgige", "gi2dambygene", "gi2danbxhege", "gi2daobqgmge", "gi2daobvgmge", "gi2dcmbqgige", "gi2dcmbugene", "gi2dcmbzguge", "gi2dcmjzgmge", "gi2dcnjxgage", "gi2dcnztguge", "gi2dcnzthege", "gi2dcnzuhage", "gi2dcobrguge", "gi2dcojuguge", "gi2dembrgege", "gi2demjrgege", "gi2demjugmge", "gi2demjwgmge", "gi2demjygage", "gi2demjygene", "gi2denbqgqge", "gi2denbrgene", "gi2denbygige", "gi2denigenes", "gi2denjxgqge", "gi2denrtgege", "gi2denrxg4ge", "gi2denzqhage", "gi2denzsgige", "gi2deojrhage", "gi2dgmbxgege", "gi2dgmrsgege", "gi2dgmzrgage", "gi2dgnbrhage", "gi2dgnbxhage", "gi2dgnjqguge", "gi2dgnjvgqge", "gi2dgnrxhage", "gi2dgnygenes", "gi2dgnzzgige", "gi2dimrtgene", "gi2dimrthage", "gi2dimzsgege", "gi2dimzxgyge", "gi2dinjxgige", "gi2dinzrg4ge", "gi2dinzsgige", "gi2dinzvhege", "gi2dinzygyge", "gi2diobzgege", "gi2diojsgqge", "gi2dkmbqgmge", "gi2dkmbygqge", "gi2dkmjwg4ge", "gi2dkmrqgege", "gi2dkmrvgage", "gi2dkmrvgige", "gi2dknbsgqge", "gi2dknbvgege", "gi2dknjuhage", "gi2dknjyhege", "gi2dknrxg4ge", "gi2dknrygege", "gi2dknzygage", "gi2dkojqgige", "gi2dkojvgmge", "gi2dkojwhage", "gi2dmmjxgage", "gi2dmmjzgmge", "gi2dmmygenes", "gi2dmmzrgqge", "gi2dmnzuhege", "gi2dmnzxgqge", "gi2dmnzzgige", "gi2dmobrg4ge", "gi2dmojxgmge", "gi2domrygage", "gi2domrygige", "gi2domztgene", "gi2domzzhege", "gi2donbsg4ge", "gi2donjtgmge", "gi2donygenes", "gi2donzrguge", "gi2donztgmge", "gi2doobuhage", "gi2doobwgmge", "gi2doojsgqge", "gi2dqmbrhage", "gi2dqmbsguge", "gi2dqmbuguge", "gi2dqmjzhege", "gi2dqmrqgege", "gi2dqmrwgyge", "gi2dqmrygene", "gi2dqmrzgage", "gi2dqmzugige", "gi2dqnbrhage", "gi2dqnbvgyge", "gi2dqnbwgage", "gi2dqnjzguge", "gi2dqnjzhage", "gi2dqobvgyge", "gi2dsnqgenes", "gi2dsobvgene", "gi2dsobvgyge", "gi2dsojzgene", "gi2tamjyhege", "gi2tamrzg4ge", "gi2tanbrgyge", "gi2tanbygqge", "gi2tanjrguge", "gi2tanjuhage", "gi2tanrzguge", "gi2tanzwgage", "gi2taojthege", "gi2tcmbygage", "gi2tcmjrhege", "gi2tcmrvgyge", "gi2tcmrxg4ge", "gi2tcmrzgqge", "gi2tcmzqguge", "gi2tcnjqhege", "gi2tcnjrg4ge", "gi2tcnjwgmge", "gi2tcnzsguge", "gi2tcobqgage", "gi2temjrgage", "gi2temzsgene", "gi2tenbrgage", "gi2tenjvgage", "gi2tenrrgqge", "gi2tenrwhage", "gi2teobrgage", "gi2tgmbvhage", "gi2tgmjtgmge"
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


                  
                                                                                                                     
                                                                                                                     
