const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "taketooktook";

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
	"gy3tinzqhege", "sanpangshizu", "gu2tonrugege", "rrjsgwridops", "surplusoasis", "netsirkflies", "ha2temzwgene", "g43tsnjzgige", "geytenrxgege", "123wallet123", "gizdknbvgene", "hezdmnjqhege", "heytimzqgqge", "hazdimrqgqge", "heydkmrtgege", "g44tkmjyguge", "gq3damzuhege", "g4ytqnbqhage", "gu4denzvgege", "giydqnrygege", "gqytenztgqge", "giydqobvgage", "fadiadmo1234", "gm3dkmztguge", "futuregreetf", "gu2tcnzuhege", "1334zuidwind", "guytoobsgqge", "hezdgobxgege", "ge2tsnjugage", "gqztomztgige", "g43dsobuguge", "flowerofl1fe", "ha4tmmzthege", "gm2dcmbsgage", "gm3dqmzvgige", "gm2tgobqgyge", "gqydcnjvgqge", "gqydsmrsgene", "heytombugyge", "gy3tmmbxhage", "heytknrvgage", "gmzdqmjzhege", "gq2tenjvgige", "eossunrainwu", "haytsmbzgyge", "gu2dgnzrgege", "lkjhgfdsamn3", "giztqmjthage", "gizdinjsgmge", "idice.x", "gm3tqnjsgige", "minu12345123", "gqytqnbtguge", "gq2dcnbugyge", "ha3taobyhage", "gezdsnzwhage", "gq2dknbqgage", "daisydarkeos", "ha4demzxgqge", "ha3tambqgige", "superonefund", "g4zdimrsgige", "hazdiobwgqge", "gu4damrygage", "gmzdmnbqgage", "gu2diobqgmge", "ha4tgnjsgige", "ge3dsmzshege", "ha4daobzhege", "geydinbugene", "saidrithiche", "haydimruhege", "geztaobxgene", "haytqnjxgige", "gqytiojrguge", "gmzdcmbtgmge", "gm2tomzvgage", "ha2timbzgyge", "haydcmjsgyge", "gm3dqmrqgene", "gy3dcojwg4ge", "g44tcojugyge", "gy3dcmzxg4ge", "ge2tgmbrgmge", "ha3timrtgyge", "gmytqnrygmge", "gyztkmzrg4ge", "hezdcmrqgyge", "ha4dgnrqhege", "zll111111111", "ha3tinbrhage", "ha2tsnbxhege", "eosffflllmmm", "gizdgnbsgege", "william.x", "g44dimjsgege", "gi4dmmrvgqge", "gq2dknzsgige", "chaoxiaoniao", "gy3dcnruhage", "giytgmjvguge", "xsilence1221", "newbeyond111", "gu3dsmjvgage", "gy3tembwgage", "gi2deojxgmge", "ha3tinrugmge", "heytqmjvhege", "gq4daojtg4ge", "gy2dsnbqgyge", "gy3dsnbqgqge", "ha3tmnrsguge", "guzdimbwgqge", "gi4dmmbxgige", "gy3donrzgene", "ekoliaofight", "gq4dcobrhage", "giztkojtgage", "hazdkmrug4ge", "gy4dambrg4ge", "guzdgobrhege", "hezdsnjugmge", "4s2dy4abgbx2", "eosbet555555", "ge4tmnbwhege", "g44tsnzyhege", "ge4tenbvgyge", "hezdoobtguge", "giztkmjygmge", "gu3dsmrwhege", "gi4donygenes", "ha3tkmbuguge", "gyzdmmzxgene", "geztembtgene", "g4ztaobugege", "gm3dembvgqge", "gmzdamrqgqge", "mrjohnlinden", "zhanhuilan11", "gq3damzqgyge", "g42tcmbxgmge", "gu3dinbzgige", "guztamrugyge", "gu4dqmbrhege", "gi2tqnbsgage", "heytinbrguge", "ha2dombxgage", "gu3dembrgage", "gu3donbvgige", "ge4dimbxhege", "g43deobthage", "gi3dgnrxg4ge", "patrickphan1", "gy3tsnbyhage", "haztanjsgege", "ihorsiryi123", "geytmmzxgmge", "ge4dkmzrgige", "guydmnbrg4ge", "gu2donbxhage", "heytcmrxgqge", "heytanrzgege", "g42deojrgage", "hezdknjzguge", "gmytkojrgege", "ha4damjvhage", "g4ydamrtguge", "gm3tcmbqgmge", "heydqobtgyge", "haydknzsgene", "giytgnjugmge", "raragogogang", "mehdirahmani", "gmztqmjtgige", "g44dmmzrgage", "hezdmojqgmge", "ge3tenzvg4ge", "gq3tsmbygege", "gqztmmruguge", "samroleostes", "gm2tmmjyhege", "peaceinworld", "gy4dgojrgige", "gm4tcmbqhage", "gyztimruguge", "gy2dqnjvgige", "gyztknzzgyge", "ha4tkobygage", "gy3tanjtgege", "ha4tcojugege", "gq3dcojwgmge", "adluljm12345", "heyteojygyge", "gqydanrwgege", "gq3tsobxgmge", "liujiabin521", "browncow1234", "giytsmrwg4ge", "gy3dimjzgqge", "guydomztguge", "haytcmbwguge", "hazdonzuguge", "guztgmzxg4ge", "guzdgojwgqge", "gi4tanjwhage", "ge4tcnygenes", "haydkmjrgqge", "linbin131313", "haztcobqgage", "haytaojygage", "g44dinbuhege", "gi3tqmryguge", "whycandy1234", "guydmnrygige", "namnyakivan2", "4h31dvfrfpfe", "guzdemjugige", "ge3tcnzqhage", "haytqmztgige", "gm3dcnrtg4ge", "gmzdimzrhage", "heydqnzshege", "gy3dgnrxgyge", "ge2dmmrsgage", "gi2tkojwg4ge", "ha2tmnrugage", "gqytinzzgmge", "guzdonrtgmge", "gy3domjugage", "wxf135135135", "g43tenjxgage", "gq2denrqhege", "jeffbouffard", "gu3dmnjyhege", "gy2danrzg4ge", "ha4dgobtgene", "eeeeoooosss1", "gqztqnjwhege", "heydimbrhege", "gu3tsmbsgage", "longcryptogr", "gy4donruhege", "gy2tomjugqge", "guydonztguge", "g43tiobsguge", "gmzdqnzrgage", "gy2tombrhage", "gyydqmjvgege", "g4zdgobqgene", "gm4tcmjug4ge", "heytoojyguge", "ha4dgnjug4ge", "tpsuperfund1", "bobbobbob123", "gqydenbuguge", "tangshengjun", "gmydgnrqgege", "gyydmnzxgige", "g4ydamzsguge", "soen11112222", "guydqnzqhege", "heytamjxgmge", "giydinztg4ge", "heydeojuguge", "hazdkmjxgqge", "heydkmrzgyge", "guzdonbtgene", "mlazorko4235", "guytsmrsgene", "gqydanzsguge", "ahann5423iem", "scryptomagna", "gyydqojygqge", "gmzdqmbsgage", "g44tsojsgqge", "gq2dqobygege", "ge3dmmryguge", "gm3dsobvgmge", "ha4tqojugyge", "ha3temjzhege", "gy3dsojtg4ge", "ha3tsnjrgyge", "g44dmojvgage", "ge3dkmzrgmge", "geztsmbrg4ge", "heydinjsgene", "hellozoebaby", "guydcnzqguge", "gmydsnjugege", "gi4tsobxhage", "hezdmnzzg4ge", "ha3dkojzgyge", "gq4dombzhage", "ha3tinbwguge", "gq4denigenes", "gm4dqmbwgene", "gyztknbzgqge", "gu4tinjzgqge", "jiajiaqd1234", "lpassexpress", "gu3tgmbxgyge", "gy2tgnjqhege", "gy2dinrqhage", "gu3domrvgige", "g4ztsmbqgqge", "gm2demzrgqge", "gm4damrxgqge", "gq3dmobrgqge", "gm2tonrtgige", "gu2tqmbugqge", "gu4dcobugmge", "vveeuckxuwkj", "ge2dsojugage", "eospremium11", "gi2taobqguge", "ge2deobwgyge", "ge2teobqgene", "ge3demzqgene", "gy2donzvgige", "ge2timzvhege", "gm4dcmzqguge", "gy4dcmzug4ge", "gq4dgnruguge", "gy3tomjshage", "hezdkobwguge", "ha4donygenes", "heydgnrxgqge", "hazdsmbzhege", "gu3tembsgqge", "securenesses", "giytoobvgmge", "gy4dsobqgene", "zamcrypto123", "lawyersgroup", "gm3tonjzgqge", "gm2tsobvg4ge", "youbuweieos1", "hezdeojqgqge", "guydamrtgmge", "gm4dsmzvgqge", "gm2tanjwhage", "gi2dgmzsgqge", "gu2dambwgage", "gy4deobvhege", "gy4tiojwgqge", "heydanbvgyge", "haydemrrguge", "helloeosking", "jdh4bw1a5wr4", "hezdgmzygage", "gqzdsmbxguge", "ha4dambug4ge", "ha4dgmjwgyge", "g44dsmztgage", "gm4tcnrzgage", "gu4tgnjzhage", "ha2diojtgmge", "guztqojtgyge", "ha4tenbqgmge", "haytoobzg4ge", "gqztonzsgege", "solomonwhite", "gy3tqmbxgyge", "gy2dgojugige", "g43dambsg4ge", "gy3domzwguge", "tianrenheyii", "guydenrxgage", "1111111aaaaa", "ge4timrzgyge", "gu2tqobqgmge", "gmztsnjwgige", "gy3tgojugige", "gq2tknbuhage", "ge3dcnzygyge", "gyytsnbwhege", "geytmnjugqge", "gu4dknzrhage", "g44tambthage", "geztcnzqgene", "g42tsmjugene", "1crk5dtgeosd", "gqytmnzqgige", "gqydgojzgage", "ge4tgmjugene", "gu3dcmbxgqge", "eostokenzhen", "gu2tqnrvgage", "gqytmojygige", "coinerweber1", "eostothemono", "guydkojshege", "gizdamjzgige", "ge4denbvgqge", "gy3tknrsgmge", "ha3tinbtguge", "gy3dembxgqge", "alohaeosfund", "p3142ihqnrkp", "gq2tgnjrg4ge", "icywelkin555", "gyzdmnjrgqge", "gi2dmojxgmge", "ha4tqnzyhage", "gi3dkojzgqge", "gu4dmojxgmge", "gu2dgmjygege", "ge2toojugyge", "gm2dgnzqgqge", "gq4tcnjsg4ge", "ha4dombxgige", "tommyangello", "gmztcmbxhage", "gqydsnzthege", "gy4dkojwgqge", "gmydmnrwgage", "gm3dembwgige", "gyzdanrvgege", "1wanliangfen", "showxiezhi52", "guytmobtgmge", "gi4tomygenes", "gyytmmbtgage", "1cryptorush1", "guytcmbvgqge", "gu2tenbxguge", "wickedcrypto", "simdakkkkkkk", "gq2tqobxgige", "guztkojygege", "gy2tqmjygyge", "gy3dinrzgige", "ha3tambsg4ge", "g4zdcmjwgmge", "heytamjzgige", "gmzdmnbygene", "itedecompany", "gizdanzrgege", "cockythomas1", "gqytimbxgige", "g44tinzwgmge", "ipfsdaily123", "nicoswinamax", "malonmar1eos", "hazdknjwgyge", "gm2tsobygmge", "gu3tomjrhege", "hezdmmrygmge", "heydonbrguge", "gu3tsmbygyge", "heytenjtgqge", "hezdcnrzgege", "ha2tqmagenes", "metallica123", "wanwanwallet", "gizdgnzugege", "gu4diojzgege", "gm3dsmzrhage", "gm3dqnbrgige", "gy3dgobygqge", "ha4tenrxgyge", "guztcobugage", "gq3donrrg4ge", "gm3tmnzrgmge", "zhanpeng1234", "ha4dqobtgmge", "eosrefgambl1", "gqzdgnryhege", "g44tgojsgmge", "vskcyoyithxi", "vaikkdfcfrle", "ha3dimbwhege", "heytkmzugqge", "wangyue11511", "gmytsmbzguge", "gqztimbtg4ge", "heytgobygyge", "xzq1szh14ajt", "gi3tenzuhage", "g42tqnrvgqge", "gy2tgnbtgege", "gyytmmrxgige", "geztqobxgige", "g4zdknrzgige", "panxiaoqin11", "gq2demrsgege", "ge3dsmjyg4ge", "gqztkobrhege", "gm2dqmbzgqge", "gu3tqmjuhege", "gy3tcmbsgmge", "haytsmrrguge", "guztoobxg4ge", "qkzr51hgphak", "g44tiobugqge", "gu4tonbzguge", "gmzdemrqhege", "hazdcmjxgyge", "gy3tqmzwg4ge"
]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `taketooktook@active` ] };
	const myaccount = await eos.contract("taketooktook");
	await myaccount.clear(account_name,"4,TOOK",options);
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
	setTimeout(deleteLoop,600,idx)
	
}
			
setTimeout(deleteLoop,1000, 1);

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
//eos.setcode("taketooktook", 0, 0, wasm) // @returns {Promise}
//eos.setabi("taketooktook", JSON.parse(abi)) // @returns {Promise}

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


                  
                                                                                                                     
                                                                                                                     
