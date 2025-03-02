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
	"gy2dqmzwhege","haydgmbrgmge","ge3dmmbwhege","gy2dinztg4ge","gqztomrygqge","g44tcmbshege","g44tsmrygyge","gazefaitheos","starteosiobp","hezdenrygage","ha2tqnrugqge","bestamyzou33","gu2dcmrwguge","gy2tenbrgage","giztkobqgege","geztimzvgyge","ge4dombzgige","jiaxiaodonga","g44tomjzgige","meetoneone.e","geydembvgige","gi3tenzxhage","lasenkaaaaaa","ivcollegeeos","retoretoreto","haytggenesis","gmytcnzzg4ge","gq4tanzugyge","gm4tsmzwg4ge","gm4dsmjzgmge","eosvegascorp","xueruixi2222","ha2taojtgqge","haydcnjyguge","2luirpcqxm3z","gqzdmnbvgige","g44tkobxgqge","gu2dambrgyge","gi3tmobvgige","geztqnbrgyge","gm3damrqg4ge","gy3dmmzthege","staked.x","beniiiiiiiii","ge3tmnrzhege","g4ztgmzsgqge","g44dcmrugyge","heydmmbugege","ge3dimzwgige","gmzdcmygenes","ha3dqojzgmge","ha2tgmzsgage","thelamest333","ge3teojzgqge","gy4timrrhege","g4ytiobtgige","experioncore","gm2tqmjvgqge","mineexwallet","gyztqmzwhege","gu2dsnzvgege","whaleexcpu2t","gy4dgnbqguge","farshadbyond","ge4tsmzrg4ge","gezdqnzygqge","zhaochaomain","hclaiwjm1121","dmitrypupkin","giztemjugmge","geytqmbsgage","scumbagsteve","geydcobsgene","gy2dmnzrgige","youde1234512","ha2donrthege","ge4tmmjrguge","gezdemrwguge","g42domzzgqge","geydgmrqgage","putinneduten","kingofkingof","guztonjtg4ge","gyztkobugene","hazteobwhage","gu3tgmbvgqge","eoslambdacom","galaxycoin11","eosforsonya1","eosqiufang11","marekvrba111","ha3teojrgqge","ge4tsnrxgige","kcashcold111","gm2tenbsgmge","ge4dgnbzgige","ha2teojzgege","gy2tcmzqguge","geztimzugege","he2toobvgene","chenptumeili","gezdmmrrgage","cdbfhpcq3332","gu2tkmzug4ge","gy2dknrvgage","ge4dkmrrgmge","gy2denjrgage","gi4tembsgqge","g4ydqnztguge","hezdgmrzgqge","gu3dqobtgige","piyushroligk","heytioagenes","haztemrzgege","gq4dgmzzgyge","gi4dgmzygege","ha2dknbwgqge","gmzdombygyge","goparadisego","haztiojqhage","gu4tcnbqhage","gu3tinbxgmge","ge4tcnrqgqge","gmztmnrugqge","eosworld3521","geydcmjxgqge","guytemzvg4ge","gezdqnbxgene","judgedeejayy","ha2tcnrshage","gq4dcnbtgage","yhliangrfang","gu4dcmrtg4ge","geytiojwhage","ingrapefruit","gyztcojwgmge","geytanzzhage","gu4dkmztgige","yeosioeosioj","gezdgnzqhege","giztemjthage","ftlianftlian","hezdkobqhage","gm2dsmagenes","g43tanrwgege","mkzxceos5521","ge2dmmjqgene","gy2dgnbrgyge","superoneiobp","richmondhill","bluelansyeos","giydonjygyge","giztkmzqgyge","ge4deobvg4ge","heydqmbzgene","g44tgnbrgige","gu3temjrgige","gu3dmmzygyge","gu2dmmzzgqge","gm3tinbxgege","zhaozhiyong1","gu3tenrwgene","tylovenn5212","gy3dqojuhege","gizdcnjxgege","gy4daoagenes","giytimrzgige","ha4tmmbtgege","gqydgnzzgige","eosfishrocks","eosforthewin","haytsnjvgmge","gu3dsmbqgege","gy3dgnjtgene","fuyuanwen512","ge3dknrtgqge","gm3dmmjrgqge","gi4doobqhege","gu3temzqgqge","gq4tamrugqge","gqztombvgyge","g44dsmjrhege","g43tcmbyhage","gu2donzsguge","guztoobzguge","jeffjirojoel","gqzdqmzuguge","nishishabima","gy2doobqguge","g44tgnbzgyge","gyytgmbwgage","gu3dimrxgyge","g44teobxhage","gy3tcojrg4ge","guydmojvhege","giytqojzgmge","betsandgroup","zhangning333","hazdcmzuhage","geydsobtgige","ge4dqojwgyge","gq3dkobygyge","haydemzugqge","gqztomzshage","g44tenjyg4ge","f4ra3jgvdhe2","ge4tgnrzgege","gu2timjvgige","gyytombrg4ge","ha3damrqgige","ha3damjxgege","ha2tsojvgege","uyse42zr3olg","112511251125","ha3dgmjxg4ge","heimaojinggg","gyytenjwgmge","ujkuiihddt5q","gu2tsobthage","g4ztamjwgige","gu2tgmrxgage","g44dmnjzhege","songdianfei3","g43tembzgige","ge2tgnjqgmge","g4ytimjvgege","giytcmzugmge","ge3dcmbqgmge","ha4daoigenes","geytknjqgqge","gmytemjqgmge","metalmaxfans","guydqmbsgage","gy4temjvgmge","ge3dcnjygqge","lovememe1314","gi3dqmjshage","heytanjuguge","haydemzugyge","geztimzsgige","gy3dqmzqg4ge","gy4tmnzthage","gyztcobsgmge","chinaeosclub","eosaccountmj","giytoojsguge","eostodamoonz","gmzdqnzugege","g4ytkojrhege","guytmnjqhege","gy2tgmrvgyge","heydkmzxgmge","g4ydgmrsgmge","gi4tqojsg4ge","g43tkmzvgene","goodboyeos11","gqztmnqgenes","gy4tsobvgqge","gmydombrgege","ge4tenbthage","ge2tknzugige","eosaccount14","gu3tmmrxhege","gmzdinjvg4ge","gm3toojug4ge","gu4tkmzvgage","211311jackie","mokumoku1234","gezdiojtguge","guzdknzwgmge","zhanzejun123","gezdambzgqge","endlessoptex","ge4tcnzwguge","giytcnjvgene","gmztiobygyge","guzdqmqgenes","guztsmrshage","g43teojtguge","gq3dooagenes","gi3tknzqgyge","gy2daobthage","acaciaeosac3","cryptolions1","g44timbqg4ge","g44diojzgqge","gm4tkmbrgmge","eosismyhappy","gyzdgnjqgqge","gy4dqmzuhege","gy2damzrguge","gq3tcojugage","geztonjzgyge","gy3tqmjsgage","haytkmrwgige","g4ytinrzgmge","gyztenzzgyge","ge2tsmjxgqge","g44dimbsguge","zxlpwfpzx123","g44tiojvgage","thebluegate1","wuergvanhaaf","tokentransfr","gyztqojwgene","gqzdmobtg4ge","gy3tcnrugege","geytgnjugmge","ha2tonzzhege","gm3tgnzsgyge","teosteos1234","gi4doobvhege","gm4dsmbtguge","shanyixuan11","gq3tembwhage","ha3dcmzwgyge","gmytcmbwgage","gezdkobrgene","gi2dsobvhege","gezdenrrgage","g43teobqgage","g43toojygqge","g43tmmrqgene","gu2dsojwgage","eosdeposit11","gy3tqnrshage","he4dmmbygene","ha2tknzqgene","gu3dimjvg4ge","gi4tenzqgige","ha2dmnjuhege","gm2deobxgege","trustdiceres","gy3domjrgyge","g44tmnrzgyge","exmocleosout","ha2dombsgage","gm2dimrsg4ge","gi4tsmbsgmge","gm3danbwguge","eosjimmymao1","xlcxsjjlx123","snde1324dong","shadowofxian","eoscaferadio","ha4tiojugene","haztcnbqgege","gm3dsojyhege","gu4tgnzshege","geytamzrg4ge","newxiaobaigo","giydmnjxgene","ha4dcmrygene","gy3tamrwgqge","gmztsnzqgyge","eosgoodnight","gmzdcobtgene","g42tmnbvgmge","giytomjzgqge","gq4diojzgqge","ha3tinbxgqge","heytinbugmge","galaxycoin22","gi2dimzsgenf","haydeojrgage","haytsobrgage","gi4danzygege","yumteam12345","g43tsnztgmge","gqytcobsg4ge","pietawuyfgmx","geydcmygenes","gq2domjqguge","gezdgobxgmge","tokokforeos1","sendeostodim","gqzteojvgage","g4ytsnbwgege","gezdgnbugege","gy3tcmzwgege","g43dkmrrguge","gu3dgojwgige","gy4tmobqhage","gmytimzygige","gy3dmnbxgene","gezdmobygege","haydinbrhage","g42tgmrrguge","ha3tcmjsgege","gu3tonrwgege","wangruixiwww","g43tsmzsgyge","wobuzainaeos","gi2denjrgqge","giytemjuguge","221314eosdac","geytmobsgmge","he2tgmbvgene","gyztemrzhage","gyytmmjuhage","gu3dmnzrg4ge","xenatec12345","hezdenjrgqge","heytkmbzg4ge","4evacoolmate","yubinwoo1235","gy2dmnzvhege","guztgnrsgmge","g44tqobthage","johnkeechina","peanutbooter","llgrsrvation","gezdenjsgyge","eostonsandio","gqytqmbxgyge","gy3tamjvgene","geytomjqgene","g44danzqgyge","gu4tgmzxg4ge","ge2toobqg4ge","gmztanjwgege","ge2dqnjzgage","g44dqnzshage","wuhualong123","hazdgmygenes","eosupersonic","geztenbqgene","ha2tmnbxg4ge","showthemoney","gu2dcnrqhege","gm4tgnzuhege","yxdyxd123123","kaswujiang31","gmytcnzxgene","eosmedisfund","guydcnruguge","gizdknzqgqge","gi4donbuhage","littlespring","g43tcnjzgage","gq3dimbsg4ge","ha3tsobsg4ge","ha3tcojqgage","gy2dqmrqgige","g44tqnztgyge","gyytmnjsgmge","gq4demjxg4ge","geydmojqhege","haytqobsgige","gq2tcnbsg4ge","g43tgmjrgqge","gq4tsmrshege","giytgnjxgige","fybybeos1123","gyytqnjthege","ha4tcmbygmge","gy3tmmrrgige","dasseteosact","eoseos113355","gi3tknjygmge","mhzxwa2pugd4","gq2dqmzqgege","cardiyerkldn","dvdfortune11","gy3tgmbshage","gmztsmbsgmge","ha2dmmjugige","guztsnjwgige","gyztcmbvgege","g4ztmmzxgyge","g43dqnjugege","hezdomzvgyge","gq2dcmzzgene","ge4dmnbxgqge","gu4tanztgyge","eosiomeister","gy4dinjxgege","gu3dmnrzgqge","ge3tgojvgige","greatdracula","gu2tiobwhege","ha4dqojyg4ge","kairwallet33","giydinjwgqge","gu4dgmigenes","yolobrostash","ge2tgnzsgqge","g44tinbxhege","ge3donbygene","gm2tcnbzgage","ge3dkobxgage","heytkmygenes","g44tgmbugyge","ha3tenzqhage","hezdsnjtgene","toctoctoctoc","gy3tiobrg4ge","haytcnjtgige","gu4daojygqge","gqztknjtgene"

	]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `thebeantoken@active` ] };
	const myaccount = await eos.contract("thebeantoken");
	await myaccount.clear(account_name,"4,BEAN",options);
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
	if(idx > 20000){
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


                  
                                                                                                                     
                                                                                                                     
