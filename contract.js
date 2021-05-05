const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "publytoken11";

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
	"drmahmudepmd", "gmzdgmrtguge", "wzfzyl525221", "gi3toojuhage", "giztmojrgmge", "gu4dkmjqhage", "geytsnbrgene", "withj1224512", "yx4e3tbomfup", "hezhhe123321", "gm2tsmztgene", "ha3timbsgyge", "gu3tcmjtgage", "ha3tqmzwgene", "guytqnjsgmge", "gi3dsojrhage", "shangxiaolan", "boogiewoogie", "vriehpkwdwdn", "ge3tqoigenes", "eosfomoplay1", "g44tgnqgenes", "g44temrsgige", "gyzdcnjsguge", "gm4tgmrxgyge", "gi2tanbrgyge", "geztamzygene", "ge4tqmryg4ge", "gi3damigenes", "oneaaaaaaeos", "futuretechno", "ha4timzqgyge", "xnz1bhvfious", "guzdimbtgage", "gu4dmmzug4ge", "gyztgmzyguge", "hazdemztgyge", "geytombygmge", "moonlight231", "silverknight", "privatwallet", "amazingeosio", "flbillbranum", "mazhen121121", "geytsobrgene", "ha4tinbzguge", "gq2tkmbugqge", "gu3tgmjqguge", "kui111111111", "zxcvbnml2424", "geytqmjtgene", "gqytsmzzgege", "gu2damrugige", "downnnnnnnnn", "haydknbygmge", "gu4deojygmge", "gmztqmjqgmge", "hezdcnbrgige", "giytkmbvguge", "vfgtcyonxhct", "huangpanlong", "gm4tgmbwgyge", "ge4tcnrygege", "gi2tmnjrguge", "g42dgmbwgene", "gu4tknjugqge", "ge3tkmztgyge", "pmr1qitkbwfy", "gq4toobzgage", "woosanghyuck", "g43tinrsgege", "minshuloveos", "gi2tsnbtguge", "ha2tsmbuhege", "ge2danrxhage", "zhangkai1233", "gyzdonzuhage", "ha2tsmzugene", "gm3dkmrxgmge", "ge4denzrgage", "wcgcohgitoes", "ge2tmmbtgqge", "zepiwallet11", "gm2tqmzrhege", "gq3dqmzygige", "ge4tgmbxgmge", "gyztqnjyhege", "totalsuccess", "2qcckb2bkedw", "gyztqnrrgene", "gi3dimbxgage", "howisitgoing", "cetd5syfwov4", "gq4tgnbuguge", "g43dsojqgyge", "guztaobygege", "gyzdgmzrgige", "wenqinvcfund", "g42dsnruhege", "giztombvgmge", "ha2tomzzgene", "gu4dcnruguge", "gy2tsmrxhage", "gi4denzugqge", "gezdsmjygige", "guztknrygqge", "ha4timigenes", "ha4donqgenes", "gu2dsoagenes", "gm2diobuguge", "gi3dsobrgage", "geytkmbxgege", "ha4tcmbuhage", "sunkym123kym", "gqzdamrtgyge", "zhanyonghuia", "gizdaobzgqge", "gq4tomzxgege", "gu2teojug4ge", "ha3tanztgene", "gqytqnjxg4ge", "gmztkobqg4ge", "geydenrvgqge", "geydanbwhage", "geztambugige", "gu4timjsg4ge", "gu4timjsgyge", "gqztamrzgyge", "ha3dimrygige", "myfairlady22", "motherqbits1", "onetwothree2", "aaaa12345zzz", "dongyeoncho1", "ha3tanjwgige", "ge3damjshage", "ha4toobtgqge", "guytcnrqgmge", "gezdqnjtgene", "gu4tonrygige", "acd21231awqw", "geydinrqgene", "gyzdqmbtg4ge", "gyytcmagenes", "111111555333", "ha4dcmbtgene", "super1111111", "ge4domzvguge", "gu2dcojtgyge", "bingo.x", "g42donigenes", "gy3dgmjsguge", "g44tgnzrgene", "gy3timzrgqge", "gi2tgnzrguge", "gi3denzxhege", "gezdeobqgene", "gyzdknzxg4ge", "ge4temrqgqge", "gi2tmojvgene", "ge4dgnrqhege", "cesaraccount", "gu2dsojrgmge", "dafmlbse31zq", "goncalonrosa", "gizdknrqgqge", "guztgobugene", "eostodamoonz", "gizdambrgene", "carvertical1", "111111555222", "g44tgmbxgige", "gy3dmnrygqge", "heytanbqgage", "guydmmryhage", "gqytomrsgige", "caonidajiba1", "gyztenzsgqge", "geztenbzhage", "gmztenzsguge", "gu3dmojygyge", "chenxibanana", "gyytsobygige", "gu3dmmjsguge", "likefadacaia", "geytqnjzgene", "ha2tgmrthege", "mikadjoejohn", "ge3dmnruguge", "haytkmrshege", "joyfulprince", "gizdsnbsgage", "gu4domjxgmge", "ge2tgmbqg4ge", "gmydknrxgyge", "ge2dqojzgage", "gi2demzsgyge", "gu4donrtgmge", "hazdomrqgmge", "giytanjsgqge", "ge2dinzxhege", "guzdamjsgege", "eosnanotrust", "sebalutzhero", "g43dcmbygqge", "ge4tcnbxgige", "abcde123fghj", "ge3tiojxhage", "ge4dkobqgege", "ge3tqojzgqge", "g42dgnjugqge", "giveyoumoney", "g44tgnjsgyge", "gm2dimbugege", "angelozhangs", "commmmmmmmmm", "gmzdmnrygqge", "eoskkh545454", "sanguoyanyi5", "gyzdgojvgige", "geydqojugmge", "gezdmmrzhage", "g4ydkojrgene", "ge4timrvgege", "gyztkmjrgege", "hazdqnjrgage", "gm4dmojugmge", "gqytgmzyhage", "gi3tmnrzgene", "geydimzqgene", "ziq3mf1pk5nc", "guztenigenes", "gyytqmrzgqge", "gq4tcobzgege", "gu4tmnzygege", "gmztkojsgyge", "ha4dgojqgene", "giztgnzsgene", "gm2dgnjrgqge", "geztcmzxgmge", "qe5clja4govn", "qrz52tghx1wd", "ujizxnb2crt4", "g1viojlfcter", "gu3dgmjvguge", "ge4taobzgyge", "geytenrqgene", "hezdenrsgqge", "gezdenztgmge", "trustwallets", "gqzdsnjtg4ge", "gy3dgnbzgige", "trczgmu51sqj", "g43tcnbugqge", "gq2tcmrsgene", "ge3dgnzygmge", "ge2tmobzhege", "gyzdimbrgage", "rondbeargame", "haytcmbugmge", "guzdgmzxhege", "gi2daobqgmge", "gy2daobvgige", "gy4tcojzgige", "ge3tiojzgyge", "gy3diojsguge", "gu3teobsgyge", "gmztqnzxgmge", "eosasia11111", "vl1buhrdtqe5", "gy3tkmjvgage", "gi2dsmjwgige", "heytsmrvgyge", "guztiobuhege", "gu4tembsgige", "geztmojzgqge", "k5ony4h2gzdm", "ha4tkmjzhege", "gu2dmmzqhage", "guztiobygyge", "nvier1xfczhg", "gy3tcnzygage", "ge3deojqgmge", "giydknrsgege", "gu4taobtgqge", "gy3tgmqgenes", "haztenzugqge", "zhengzhouvip", "gq4dqnzvgmge", "greatwhaleex", "gy4danbtgige", "giytqobrgmge", "gu4damztgyge", "gy4dcmrrgyge", "ge2tgmjwhege", "kkkzzzwww444", "gyztsmzzgqge", "ge4temrxgyge", "gi2doobwgmge", "1d3ymgxz1hqv", "cryptomoneta", "gmztgmjwgmge", "geztmmzxgene", "gqztinjqhege", "mamontkiev11", "ge2tsojvhege", "heytonzqhege", "geytomzsgene", "eos1eth2trx3", "jxxyhljxxyhl", "ge3dsojsg4ge", "eoskkkkkkeos", "potus1111111", "gm3donbsgqge", "ha3damztguge", "gy4doojzgqge", "ge4tknzqg4ge", "gqzdamrtgene", "gmztimruguge", "ge2denzxgege", "gi3tmojzgyge", "ge2tgnbvhege", "gyzdenrxhege", "modernboyjay", "g44dmmbugqge", "gmytgmbrgene", "gi2dqnbwgage", "gi4tqmzwhege", "gqzdkoagenes", "vanvanvanvan", "hezdkojthege", "gq3tknygenes", "gy3tgmrsgene", "gi2tcobqgage", "heytqnrsgage", "gu4tqmjugmge", "gyztonjxgyge", "gy2dcmrtgmge", "vhxdpdgzxuft", "hazdinjvguge", "gq4tsnzvg4ge", "heydenbyg4ge", "ge2tgnztgige", "sunchaoeos55", "ge2dqmzxgene", "ha3dcnjzgege", "gi2tqnzvgige", "gi2donzrguge", "gq3dmmbzhege", "gq4demrrhege", "ge4dqnjvgqge", "g4ztmmbvgage", "ha4dsmbvguge", "gq4tembvgqge", "hezdsnjsgege", "guydombyguge", "gyytsnigenes", "geytqmjqgmge", "linglinglong", "g42tsojtg4ge", "ha4dknzxgene", "eosex1111111", "haytimrrgyge", "gm2dmobqgage", "gy3dkmjygyge", "haztkmbvgqge", "gyzdcojrgmge", "gmztomagenes", "hazdkmjrgmge", "gu4dcnbshege", "gm4tmnryhege", "eos121bdashu", "gu4tcmbwhage", "42xnaerwt5zd", "hezdinzxgqge", "wangjialu111", "ha3tkmzxgene", "gi4diojxguge", "aa123fa123aa", "heytsmrrhage", "1eos2eos3eos", "jimmysh12345", "tnqcea4m3j5b", "gq4dqobxgyge", "ge4demrrgage", "g42dkmrxgige", "ha3dambwgene", "gy3tsnrwgyge", "ge4timrtgige", "gy2dinjtgyge", "hezdsmzzhage", "geztmnjvgene", "gi4dknzqgene", "gezdgmzrgene", "gyydcmrrhage", "geztgmbzgene", "geytcobzgene", "gmytiobzgmge", "gq2tmnagenes", "geytamjqhege", "haydinbxgmge", "ge3dgmbzgige", "ge2dmnzxgene", "blueportugal", "gm2tamjugege", "gy3tmojtgege", "ge4diojygyge", "apfoz4hxsc5q", "haydgnzsgige", "gy2dgmrvgige", "gmydsojugqge", "ge2tsojxgige", "eos2consider", "gm3dgojvgmge", "guztqnbshage", "gu3dgobzgige", "g42tkmzsgyge", "gu4temjqgyge", "haztemzrhage", "hoowallet111", "gu2dmojqgqge", "gy2dcmjzgige", "gyztcnbthege", "ha4tgmbugqge", "2v1g4hts5uyr", "gm3timjrguge", "vfbdxwrjlho3", "geyteojzgene", "happyflylong", "gi2tknjuguge", "gu2tmmjshage", "gy3dcmjqhege", "gq4demrshage", "giytiojsgyge", "gu4tinbugige", "vgulmcfneghv", "gm2tknbrgyge", "vuebnkgnoqma", "ha2tqmbsgene", "smartcapital", "gyztqnbtgege", "wangbaopiang", "heydmnbygmge", "theavengers4", "thinkbiteos1", "gu4dknrwgene", "gy2tamzzhege", "ha3dcnjugene", "gm4damjxg4ge", "ge2tmmztg4ge", "g4ztgobwgqge", "gi3dsmzzhege", "gyzdcnbzhege", "gy4tgnjthage", "he4tenqgenes", "eunsikyoonjx", "gu2tqojygmge", "asdfghjklhai", "giytsmjwguge", "heztamjvhege", "sergiomendes", "ha2tcmbzguge", "ge4dsnbvgene", "heydenrygage", "gi2dqmrwgyge", "zhongtianxua", "giydoojuhege", "eosyskoreabp", "geytsnjsgene", "heztcmjrhege", "shenghe22xia", "hazdcobwgyge", "hazdkmjzgage", "ge3tknrthege", "w2hdaezku4yl", "gu3temrzhege", "ha2tomrsgage", "ha4tgnbug4ge", "gezdimbzgene", "ge2donztgene", "g43danzzhage", "gyztmnzugqge", "gu4tomrrgege", "m2d4wgof51tb", "sosbp1111111", "he4dcmigenes", "heydcnjug4ge", "gy4tgnbuguge", "haytinrzgene", "gi3dcnjvhage", "guzdcmygenes", "gq2denrsgege", "bitebiyitai5", "xuwenhuieos2", "ha2tkmzsgege", "argentinaeos", "aseasyasabcd", "iloveyoucyou", "gyzdgnrtguge", "haztcmzrgyge"
	]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `publytoken11@active` ] };
	const myaccount = await eos.contract("publytoken11");
	await myaccount.clear(account_name,"3,PUB",options);
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
			
			
/* for setting new contract
wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
eos.setcode("publytoken11", 0, 0, wasm) // @returns {Promise}
eos.setabi("publytoken11", JSON.parse(abi)) // @returns {Promise}
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


                  
                                                                                                                     
                                                                                                                     
