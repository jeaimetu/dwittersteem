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
	"marcolinden1", "gy4dcmbtgqge", "db2ss2rm5sr1", "gyztaojzhege", "romankiboeos", "deltadexcode", "southkoreaio", "w5rbclucfe1u", "gq3tmnzsgyge", "ge4timjthage", "gapboo33rich", "drmahmudepmd", "hazdgnztgmge", "eatherington", "goril5151511", "guztsobrguge", "elbowlickers", "guztonbyhage", "princefamily", "g43tknbugege", "eocurrencyio", "eos114wallet", "gm3tcnjqg4ge", "gq4teojtgige", "eosfilmmaker", "eosgamekiheo", "eosgoeos1234", "g44tinbvgyge", "g44toojuhage", "eosiobalance", "ge4tanjtgege", "gi2tenbwgene", "ngnggndgee12", "gi4tanrsgmge", "eosofmonster", "gq3dqmigenes", "eosreferrals", "gyytkmbzhage", "guytgnbtguge", "gqzdinrsgige", "gu2dcmbthege", "gu2teobygqge", "launchpad111", "gy3dinzsgmge", "knightofgold", "gu4demrxgmge", "gyztcobugige", "facetime1111", "gu3tqmbtgage", "gu4dgnjzgyge", "gu4tmmzxgene", "freedomf1ght", "freshhacker1", "gyytiojthege", "gyytiojwg4ge", "gu2tknbzgmge", "gyztgmzxhege", "gyztkojrguge", "ha4tambvgage", "ha4tcnrygqge", "hanabank1111", "harrythelmag", "haydanzrgyge", "haydinzxhege", "haydqobrgage", "haytamzvg4ge", "haytimzqgige", "hazdamzygqge", "hazdcmjygqge", "g43danzrgage", "hazdgmrxg4ge", "heroeosheroe", "heztaojzgqge", "initialch123", "inowherenowi", "instagram111", "joeeaglehost", "kakaotalk111", "kimwoohyun12", "kiwijuice111", "limingliming", "linkedlist11", "mackintosh11", "maiaeospurse", "materialised", "moonlambo123", "mrsunshineds", "nehf2ort4hjx", "psycofish123", "qaqaqaqaqaq1", "raisingmoney", "rladnjsrms12", "roastingcafe", "sacredgspott", "screenshot11", "sendcoins2m3", "september111", "simonblueeos", "spacegray111", "steakmeister", "terminal1111", "touchid11111", "ux2xarxi35nq", "webdealsback", "wipicontract", "gyytsobygige", "heartvergil5", "jackhussein1", "leckoaccount", "gyztsmrvgige", "gi4tenjsguge", "gu3dqobrgqge", "g4ydkmjxhege", "eos1eos1eos2", "gqyteobvgyge", "chyxchyx5555", "g4ztiojwhege", "qwertyu54321", "gu4tqnjrguge", "ha2tmobxgqge", "gyytknbtgege", "haytcmzrhage", "gy2tambyguge", "gyzdenbvgage", "noncombatant", "seablueoneos", "gyzdimrshege", "prake5211314", "24eos24eos24", "gi2denjwgqge", "giytimjqhage", "hazdoojugqge", "prastas12345", "gyzdqnbqhege", "haytonrqgqge", "haytgnzvg4ge", "gu4dgmrqgqge", "mongssbsite2", "gyzdqobuguge", "haydiojtgene", "gu3dsmbugege", "kocococo2222", "hassansebbar", "111111111zxd", "defind.io", "guztcnjtg4ge", "gu4damjxgage", "gy2demjsgmge", "gu3dsmjqgqge", "heytamjxgige", "ha4dmnbzguge", "zhangenjian1", "gyztkmrtgyge", "heytambvgmge", "mygoodwallet", "gu4diojvgmge", "gyzdqmbugyge", "gy4tomzqgage", "cryptoeoseos", "gwanggyoeos1", "gq4tkmzxg4ge", "b1", "ha2toojtgmge", "gu3dmmrsgqge", "g4ztsobwhege", "raleighsdivs", "gyzdmobtgige", "gu4timrtgage", "gu4temrshage", "gu4domjzhage", "g44dgnjtgige", "gy2damrzgige", "hazdsobzgage", "gu3dmmbuhege", "ryoojunghyun", "geyteojvhege", "heytcmjrgmge", "guytgnjqhege", "gyzdqojugmge", "focusandview", "g43timjygege", "gu3dombqguge", "g44tgnbugage", "gu4dsojuhege", "g44dknjrgyge", "gu3tgnzvhage", "g44tonzyhege", "gmytimbrg4ge", "g43tkmjvguge", "11111gu11111", "g44demzxgqge", "13v33d5eosda", "g44dkmrzgege", "g44dcmbugmge", "g44dambrgage", "g43tkmjwgage", "g43tknbrgyge", "234mengdebao", "g43tsnbygyge", "2niljo3zw1wu", "g44damrugege", "g43tqmbugige", "g44dcmrwhage", "g44dinrzgage", "g44danzyhege", "g44dambzgene", "g44dgnrwgege", "g44dcnbygyge", "g44diobtgage", "aaronwangeos", "g44denbwguge", "g44dkmjtgqge", "g44dimzthage", "g43tqnrsgage", "g43tombxgmge", "g43tomzygage", "g43tombugage", "g44diojqhage", "g43tqmzzgmge", "g43tsnzsgige", "g44dimztgqge", "g43tonzygige", "g43tqmjygage", "g43tsnjvgqge", "g43tqnrzhege", "g44dinzuguge", "g44dinbrgqge", "beautifulday", "behelloworld", "belsizefam12", "beosssssssss", "bestinvestor", "beyondtheweb", "bg5sbkbg5sbk", "bikrantkumar", "bimdbeany345", "binancecleos", "bingo.x", "g43toojthage", "biseostorage", "bitcoinisgod", "bitcoinnash1", "bitguildeos1", "g44dambzgage", "blackandblue", "bluethundr44", "boldzak.vr", "boylovesgirl", "g43tqnigenes", "g44diojxgqge", "g43tqmjtgege", "g44dkmrxgige", "g44dgnzwgige", "g43toobugene", "g43tqobqg4ge", "g44dcnzrgmge", "g44daobzgage", "g44dgmzzhage", "g43tmmrzgqge", "g43tqojxhage", "g44dinzwgage", "g44dinbqgqge", "g43tqmrtgege", "g44diojwgage", "g43tonrzgqge", "g44dknjxhage", "g43tomrvgege", "g44dcojshege", "g43tsnbtgage", "g44dknjyguge", "g44dgnbzguge", "g44dgojtgyge", "g43tqmrshage", "g44denbzhage", "g43tsnzugage", "digitalhouse", "dimbellandre", "dinamodinamo", "g44denbwg4ge", "dinifrey1111", "g44daobugqge", "dltoneeosone", "g44dcnjtgige", "domeos112233", "donotselleos", "dontremember", "dreynoldsinc", "drivewaytire", "drtokeneater", "dvddvddvddvd", "g44damrtgege", "g44dcmjqgmge", "g44dcnzsgage", "g43tknbrgege", "g43tomzrgege", "edgeofedenos", "g43tqnjrgage", "endorsevven1", "enduser.x", "g43tqnrsgmge", "g44dambxgene", "g44dkmjvgqge", "eos121doudou", "eos12good345", "g44dgnjugene", "g44denjvg4ge", "eos4konakona", "eos4myrmidon", "eosabretooth", "eosaccount11", "eosadaideeos", "eosantfool22", "eosarmadaone", "g44denbwgyge", "g43tmojxgege", "eosbocbocboc", "eoscafeblock", "g44dinbrhage", "eoscharlie55", "eoscrapotech", "g43tomzzgege", "eoscrzeoscjh", "eosdongle422", "eosenkegaard", "eoserforever", "eosextrauser", "eosfansouwen", "g44dkmrygyge", "g43tqmzuhege", "g43tmmbxhege", "g43tkmzvgene", "g44dknbvgige", "g44dgnjygyge", "g44demrvgqge", "g44dkmjqgmge", "g43tsobrgege", "g44danjyhege", "g43tqnjsguge", "g44dcnbwguge", "g43donzsgige", "g43doobzgege", "g43tkojxgyge", "g43doojyhage", "g43dqmjsg4ge", "g43dqmjsgyge", "g43dqmrsgene", "g43dqmzzgage", "g43dqnjsgige", "g43dqnjsguge", "g43dqnzxgige", "g43dqobtgege", "g43dqobtgyge", "g43dqojthage", "g43dqojvg4ge", "g43dqojwg4ge", "g43dsmjuhage", "g43dsmjvgene", "g43dsmrqgmge", "g43dsmrwg4ge", "g43dsnbtgige", "g43dsnjwhege", "g43dsnrqgene", "g43dsnrwgqge", "g43dsnzrhege", "g43dsnzsgmge", "g43dsobshege", "g43dsobtgqge", "g43dsobuguge", "g43dsobwguge", "g43dsobzhege", "g43dsojqgyge", "g43dsojthege", "g43dsojugege", "g43dsojxhage", "g43tambwg4ge", "g43tamjqgyge", "g43tamjvgmge", "g43tamjygyge", "g43tamrwhege", "g43tamrxhege", "g43tamrzgege", "g43tamzugige", "g43tamzwguge", "g43tanbqgage", "g43tanbtgmge", "g43tanbxgyge", "g43tanbygage", "g43tanjygege", "g43tanjzgyge", "g43tanrqgqge", "g43tanrrg4ge", "g43tanrtgene", "g43tanrugene", "g43tanrvhage", "g43tanrwgege", "g43tanryhege", "g43tanztgige", "g43tanzwhege", "g43tanzxgmge", "g43taoagenes", "g43taobsgene", "g43taobwgene", "g43taobxgyge", "g43taobyhage", "g43taobzgyge", "g43tcmjsgege", "g43tcmjygige", "g43tcmrrgmge", "g43tcmrsgige", "g43tcmrzguge", "g43tcmzygene", "g43tcnbqguge", "g43tcnbthage", "g43tcnbvgene", "g43tcnbwguge", "g43tcnjshege", "g43tcnjugige", "g43tcnjxgqge", "g43tcnjygage", "g43tcnjzgage", "g43tcnrsgqge", "g43tcnrzgige", "g43tcnrzgqge", "g43tcnzsgmge", "g43tcnzygage", "g43tcobtguge", "g43tcobvhage", "g43tcobwhege", "g43tcojqg4ge", "g43tcojqguge", "g43tcojtg4ge", "g43tembsguge", "g43tembtgyge", "g43tembygyge", "g43tmnjtgyge", "g43temztg4ge", "g43temztgqge", "g43temzvgage", "g43temzvgmge", "g43temzzgege", "g43tenbsgyge", "g43tenbtgege", "g43tenbugyge", "g43tenbzguge", "g43tenjugage", "g43tenjxgqge", "g43tenjyhege", "g43tenrugige", "g43tenrvgqge", "g43tenrwhage", "g43tenzwgmge", "g43teojsgyge", "g43teojtgqge", "g43teojugege", "g43tgmbqhege", "g43tgmjsguge", "g43tgmjwhage", "g43tgmjzgmge", "g43tgmzqgene", "g43tgmzsgage", "g43tgmzuhege", "g43tgmzwgege", "g43tgmzxgige", "g43tgnbvg4ge", "g43tgnbvhege", "g43tgnbygage", "g43tgnbzgige", "g43tgnjsguge", "g43tgnjzg4ge", "g43tgoagenes", "g43tgobqgyge", "g43tgobrgene", "g43tgojsgige", "g43tgojtgqge", "g43tgojzgyge", "g43timbqguge", "g43timbrgege", "g43timbtgyge", "g43timbugege", "g43timbuhege", "g43timbwgmge", "g43timrvgyge", "g43timrwgqge", "g43timrxgene", "g43timryhage", "g43timygenes", "g43timzrgyge", "g43timzvhege", "g43timzygqge", "g43tinbqgage", "g43tinbrgqge", "g43tinbxhege", "g43tinbygage", "g43tinjqgene", "g43tinjwhage", "g43tinrwhage", "g43tinrygyge", "g43tinzqgqge", "g43tiobzgqge", "g43tiojqgige", 
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


                  
                                                                                                                     
                                                                                                                     
