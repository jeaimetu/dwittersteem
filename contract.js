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
"gezdenbygene","gezdenzugene","eosdacwemade","gezdcobsgene","qixingjun333","eosforbp1111","eosforbp3333","gezdenjxgene","gq2tknagenes","gezdgnjsgene","gezdemrrgene","g44dqnbsg4ge","aircondition","gezdgnrvgene","haytkmrshege","gezdgnzqgene","ha3temrrgige","fjs3ipzchgmu","xxtallpaulxx","gm2dqnjugmge","gezdembwgene","cosmiccredit","eosiomaster1","ha4tsmrthage","hezhqojvuque","sz1tkw34otro","khrulqcqopt2","az1314131451","gu2tkmztgige","scyscyscyscy","kikeeosup123","eosguozhenwe","jeninacrypto","tothehappywd","ha3tonjtguge","bhirozanabul","gu4tonjxgege","sunayanolja1","gq4tkmrtguge","gy3dgnrxgyge","ge4denjsgage","vhfgwarhyasv","vnnfmmimozgc","vfczzuhuqihw","vobveqtilpfr","vaquobcpvobn","vhsqbfdpmlir","vrmapriliojz","yangeosforz1","yangeosforz5","kristinsmith","eoscafebeanz","gandal.f","johnhandcock","rebeccabryan","macbookpro15","kuikuieoseos","eoscafevzla1","3udul2oxofyi","ge2tsmbzg4ge","vqxnebctnmxa","stpobn2cdaxz","gu3dimrthage","meetonestake","gy3dgojyhage","ge4dknjygyge","ge4dimrzhege","gy4tsobxguge","gu3domzrhege","gm2tgmigenes","gqydmmrygmge","eosbetcasino","gezdimbvgene","gyztqobsgege","kensfuncoins","st2xwkjconuh","abcdabcd2233","gi2dsnzrgmge","wotokencleos","cateatpeanut","mindjmindj12","gq3timbugene","ha3dknjrg4ge","sunkym123kym","gu2dgnbyhege","gezdemzugene","p1vnz3lazoij","newzealand13","vvpoxnzkumsv","turkmanistan","haytinzzg4ge","protokenbank","roztey4g53vc","gyytcnjvgmge","gizdmmbxhage","schussboomer","arbyiloveyou","gyzdqmrqgige","geyteojshege","ge3tmnzygege","giytemzxgege","crhxhns3qkln","gqydimjvgene","gqytkobqgyge","amandaamanda","eosbingocwl1","idp5tgj21vla","vwwguqqvbvnl","ha4dcobvgmge","vuebnkgnoqma","yangeosforz3","dxvdxvdxvdxv","libertariank","vlwvbjwwvbkd","eostalaat123","angelozhangs","kickmyfatass","eoszq3333333","hyperpayeos1","mbgz5xmgv5px","gu3tenagenes","gu3tanjugege","dg4ns3fpwupe","bankcoinfund","mpzv1bwkwima","gi4tmmbqg4ge","g4ytmnzsgige","djwqmqurkdov","junkyardis15","geydimjugene","gi3dkmbsg4ge","jaekwan3star","quantanamera","wealthhealth","eos4delegate","weathersense","geztamjtguge","gu2dkmjvgige","laobanhang11","gy2dcoigenes","eoswarm1ledg","gqydqnbqguge","evuaxqyrw5k2","gu4tqnagenes","gqztgmjrgene","newdexiofees","charboledger","kissmeeeeeee","gu3tmnrqgege","sensaysensay","gezdsmbsg4ge","geytsojzg4ge","maxlivswkgqh","kingwakanda2","ge2temzwgyge","paymybounty1","dzq123455432","guytemrxgege","ge3tenzwgene","geydonbsgene","eosgong12133","btcetheoscom","bcexcawallet","ha2tcojygene","eosbingocwl2","geydcmrqhege","he2dkmrrgene","wbxyejt5ezd3","hoangngoctam","gy2daobqguge","giytamjygage","upupeosmacan","ge2dinrsgege","gy3tamrthage","5lisqkvt1n22","geytsmjqgene","guydsnjxgege","sxzsxzsxzsxz","3cozi2pubvwz","gy2tknbxgege","eosz1z1iotec","viabtccoinex","gmzdcobrg4ge","noaharkbalm1","gezdsnjtgige","geytgnrvgege","panamera1234","hdgjwkkdjkwe","briantmcmull","gyzdsobzg4ge","guyteojugage","ha4dambrhage","gu3dsnbwgige","guzdkobqhage","ge4tinjzgyge","gu4dknbugige","ge4tkmjvhege","mopwwrjnvuio","3amknbbvvqyt","gy4tkmjugige","gy4tkmjzgige","ha4dqmigenes","lemmingsfund","heydemjzgene","lynxucetucet","sourcewithin","guytenjrgage","eosmaxiodivi","vcunsramljcp","gm2danrzgmge","gy4dinztgige","gy2teobyhege","g42dcmygenes","giydgnjrg4ge","ep3fot1dzims","g4ydkmjvgene","gqztcnygenes","gy2dmnzzgene","555551111122","morrico4real","haydemigenes","eosisforever","eoszhifubao2","xjrnuy1cbmxn","bitguildeos1","red5stndngby","qiaofengseos","gm2toojrguge","eoslkjhgfds1","w43lfmz2ozpf","chengyujiao5","giydknygenes","iloveeos1314","sas54321assa","eoskminkorea","gm4toojqgige","vczyeuludpja","vofljjzqriim","virvdxoemfzv","vfncwytnkhov","vdiqxckshipk","mv4xfzdutkys","gy2tqnjwgege","kurtkurtkurt","craigspys211","52w2dlhbto3t","ha2dmmbygene","g44tqojzgqge","josecarrerag","jlujyuw5gnpz","gy3domrwg4ge","fcoineosio11","gi2tamigenes","a123fbvug1ve","gezdeojxgqge","vbwktqgx5bf5","bimdbeany345","hezdkmztguge","eosogochukwu","gm2tqnjzgene","kj1ffmdwgdyy","ge4tmmjsgqge","wmyqcgzdq123","haztgnztgene","fartpoopeos1","gezdgnrugage","guytanrxguge","happyhackin1","gq2dembvhege","yeongnam1234","gu2dsnjygege","ge3tanbzhege","qwasqwasdxzx","he4dmnrtgene","gy2danjrguge","g4ztomzwgyge","chenzhengccc","admin1111111","gm2tsmrxgmge","ge3deobtgege","geytmmbwgene","cbuwifpwjqbx","puneet123321","ge3dmojrgage","ge3dgnzwgige","gm3dsnjzguge","liangeoscold","ge2tkmjvgige","g44danrvhage","hongyifan111","ha2tomrqgmge","heztoobygene","adlunamretro","gyztqnzrgmge","gu3tkmjsguge","ploikopkkopl","g44donagenes","geytinrxgene","gmytomjvhage","geytmmbzg4ge","gy3dgnbsgige","hwyqfaccbxgy","ge3tgmzxhege","gu3tenzwhege","ksmf4uoviepr","gi4tkmjwgige","dmankacioeos","gu2domryg4ge","haytanjzhege","heztamjugmge","ge3tiobvgqge","giztsobqgige","eosgamesplay","heydenjrg4ge","gq4tmobxgmge","ha4dsnqgenes","ibankairdrop","geydonjxhage","gu3dinrugige","tocashierest","bbbbbbb11111","biao55555555","ge2tknjugqge","geztaobygene","ge4dombsguge","vlxwpb2qiekh","xxjieoqpojml","sosbp1111111","ha3danzxhege","nvertanqinyu","gqzdamrtgyge","ha2tomrqgqge","btcchinaeos1","gu4tkmjsgige","gu2tgnjthage","guytcmbqgege","ge3dqmjzgege","gyztqnjyhege","freewallet22","qwhzvwgavczd","eoslongstone","gu3diojyhage","ge4tinjwgige","gm3denbwguge","gmytknjqgene","gy4dcmbvhege","gq4tonbrhege","xnz1bhvfious","gi3toojuhage","gq3tomrzgige","gm2tsmztgene","ha3tqmzwgene","geztemzqgyge","gi2tsnrrhege","generaceos12","ge3tqoigenes","cosmosmaster","g44tgnqgenes","gu2tsnjugmge","ge3deojyguge","zhangmeng135","ge2dmnzwg4ge","chainupsaas2","hazdemztgyge","ge4tmmbvgage","g44dqnygenes","geytsobrgene","haytcmbugmge","gm3dcmzzgige","blockfinance","gezdqmzqgege","gqytsmzzgege","raystonfox12","2qcckb2bkedw","gmztqmjqgmge","gu3tkmbwgmge","g44tamqgenes","musafir12235","gu4tknjugqge","eosholdereos","betdicehouse","guytsmzwguge","gu2qgenesis1","gq4toobzgage","hangzhou1123","eoszxywjh311","hzhbit3evyvs","gu4timjsgqge","ge2danrxhage","daneosdaneos","eoswalletsyj","gq3demrug4ge","zhaojun11111","ge2tmmbtgqge","ndhgsgqfccca","gm4tinjvgene","guydcnzsgyge","gm2tqmzrhege","4everlions33","12e4zuynljmq","g44dknjshage","np2zltjcvwis","eosfilevault","gi2tsnbtguge","g43dknrugene","ge2taojrgene","gi3dimbxgage","wzfzyl525221","oupan5tjrqhf","itlwnmcj423x","donyayhameh2","donationtome","gy4tgmbwgyge","menglisi3333","admin3333333","lumierrelulz","amazonpaypal","gezdsmjygige","g43tmnjwgage","libertyfree1","gu2dsoagenes","gxyctyhd5212","gi3dsobrgage","g4ydanbxgqge","ha3tanjwgige","freeandhappy","heydonbtgyge","bg5sbkbg5sbk","gizdaobzgqge","gq4tomzxgege","g43tgmrugene","woaiwojia113","supermangaga","gqytqnjxg4ge","ahxzba125521","vvebghimlphi","vmlhksgswuca","vnagniqxezlv","vvcfowovqotm","vezikqcybigj","vxihohamwddj","aldhp1333335","sinkleaf3eos","geydenrvgqge","geydimjqgene","gm2tmnjtgyge","gu4timjtgage","geztambugige","gu4timjsgyge","gu4timjsg4ge","gqztamrzgyge","35rnugne4tt5","pu4vqok3t2ng","ptmbubkjpimm","ayzgmufe1bem","aihgjzxyy4o5","q1hfam1u2ueg","sxxb5ntfnfva","wrfgprqfjdho","m2jpzhk2f1ux","uulngelimkqi","whalebuyback","eoscafeshirt","gyztaobrgmge","eoscafe.net","eoscafe.vr","udezeeudeze1","eoscoffeemug","jaburmainnet","meticulous11","lyyaoxin1221","ge3damjshage","gu2donbtgyge","shevzhao1125","brunoaaeosaa","awesometeddy","gezdqnjtgene","imranansari1","blockchainog","brunoaaeosab","hezdimzqgqge","gmztqnjvgage","wanmeishijia","eosaccountx2","eosswagstore","g44tgnzrgene","uuu111222333","fqffetwisyla","ge2tamrtgqge","hashcash1234","butterbeepan","gqytimzwgige","gi2tgnzrguge","in1orirnf2yg","gi3denzxhege","echoscorpion","jianqiang.tp","gu4tambzgege","imsosostupid","ikanyzardpem"

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


                  
                                                                                                                     
                                                                                                                     
