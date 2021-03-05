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
	"choikwangsoo","wanghuiqu.tp","hezdqnzxhage","hezdqnzyhage","hezdqoagenes","hezdqobrgmge","hezdqobugmge","hezdqobvhage","hezdqobxgmge","hezdqobzhage","hezdqojqguge","hezdqojqhege","hezdqojrgige","hezdqnzxguge","hezdqnzxgmge","hezdqnbsgyge","hezdqnbugage","hezdqnbvhage","hezdqnjshage","hezdqnjthage","hezdqnjvhage","hezdqnjwgene","hezdqnjxgage","hezdqnjxgqge","hezdqnjyguge","hezdqnrwgege","hezdqnzvguge","hezdqnzvhage","hezdqojugqge","hezdsmbsgmge","hezdsmbtgqge","hezdsmrugyge","hezdsmrvgege","hezdsmrzgqge","hezdsmzqgege","hezdsmzrguge","hezdsmzugqge","hezdsmzwgene","hezdsmzwguge","hezdsmzxgyge","hezdsmzyg4ge","hezdsnbrgmge","hezdsnbrgyge","hezdsmrtg4ge","hezdsmrsguge","hezdsmrrg4ge","hezdsmbwgqge","hezdsmbwguge","hezdsmbyg4ge","hezdsmbzhege","hezdsmjrgege","hezdsmjrgmge","hezdsmjrgqge","hezdsmjsguge","hezdsmjsgyge","hezdsmjtgmge","hezdsmjwguge","hezdsmjzgige","hezdsnbshege","kimsandstrom","hezdmmbxgege","hezdmmjzg4ge","hezdmmrrgqge","hezdmmrygmge","hezdmnbyhage","hezdmnjsgage","hezdmnrqgene","hezdmnzqgage","hezdmnzqgqge","hezdmobshage","hezdmojtgige","hezdmojxgqge","hezdombvhage","hezdkojqgqge","hezdkobyg4ge","parksangchul","ovallesergio","tonenanoxeos","onepiecegogo","octcoredev24","prishapatel1","wallstreetny","kezymaonline","larofid12345","lucalucaluca","lukesaccount","lwzx134towia","podumgxhqtnb","hezdomrzgyge","hezdomzrgmge","hezdqmbugage","hezdqmbwhage","hezdqmbxhage","hezdqmjrg4ge","hezdqmjtgqge","hezdqmjwg4ge","hezdqmjwgage","hezdqmrqg4ge","hezdqmrtguge","hezdqmrugege","hezdqmrvgmge","hezdqmrvhage","hezdqmztgige","hezdoojzguge","hezdoojqgige","hezdomzrhege","hezdomzyg4ge","hezdomzzgige","hezdonbqhage","hezdonbsgmge","hezdonbvgege","hezdonjugege","hezdonzshege","hezdonztgige","hezdonzugene","hezdonzxgmge","hezdoobugige","hezdoobzguge","hezdqnbsgmge","heztaobvg4ge","heztcmrug4ge","heztcmrvgmge","heztcmrwgege","heztcmrxgage","heztcmrxgige","heztcmrygqge","heztcmrzgyge","heztcmzqg4ge","heztcmzrgmge","heztcmzsgege","heztcmzxgene","heztcmzxgmge","heztcmrsgqge","heztcmrrgyge","heztcmrrguge","heztaobvgige","heztaobwhege","heztaojqg4ge","heztaojrgage","heztaojzgyge","heztcmbrhege","heztcmbxhage","heztcmbzgage","heztcmjrhege","heztcmjvhege","heztcmjxgyge","heztcmjzgqge","heztcmzygqge","heztcmzzguge","heztcnbsgage","theseanevans","hologramxeos","hongdewallet","hoyoung12345","whiteowleos1","kellnoid2222","jensbuettner","hywelrees555","iamagoodbaby","idsonidson52","jinnan144441","ilikefreedom","highjackjack","truvdkpro555","heztsnzygene","heztcnbuhage","heztcnbvgmge","heztcnbyhage","heztembwgene","heztemzwgene","heztenagenes","heztgmagenes","heztgmjwgene","heztknbwgene","heztknygenes","heztkojugene","heztmnjvgene","wayfarer5555","hezdsnbtg4ge","hezdsnzzguge","hezdsobwgyge","hezdsobxgene","hezdsobyguge","hezdsojqgige","hezdsojqhege","hezdsojrgege","hezdsojxg4ge","heztambsgmge","heztambygqge","heztamjqgage","heztamjugage","hezdsnzygyge","hezdsnzxgmge","hezdsnzwgqge","hezdsnbtguge","hezdsnbvgyge","hezdsnbxgqge","hezdsnjrgmge","hezdsnjrhege","hezdsnjvgage","hezdsnrtgege","hezdsnrvgyge","hezdsnrwguge","hezdsnrxgyge","hezdsnrxhege","hezdsnzugege","heztamjugige","heztamjugmge","heztamjugqge","heztanrrgyge","heztanrug4ge","heztanruhege","heztanrwgqge","heztanrygqge","heztanzqgqge","heztanzrgege","heztanzvgage","heztanzvgyge","heztanzwgige","heztanzzgige","heztaobrgige","heztanjwgige","heztanjthege","heztanjrgyge","heztamjxgage","heztamjygqge","heztamrqhege","heztamrrgege","heztamrtgqge","heztamrthage","heztamryg4ge","heztamzugyge","heztamzzguge","heztanbrhage","heztanbtgmge","heztanbyhage","heztaobrhage","swaptakdas11","lukewhoenas1","r4jubmovfqs1","yxh555555555","infinitchaos","musictherapy","mylittlepppp","jomywellsaid","mosiaicofund","syddelcade11","teamkoreosio","zhengyu11111","kettyandgong","nihaoyouzi55","robertsfund1","ojuk5okbobgo","kerronkerron","makeaccounts","maximemaxime","prachar1412k","jimihendrixx","wangtianyu15","need4eospeed","nanodwidheos","xna2qied42zv","markmainacct","sterletineos","sagzaccount2","lokibqk1r5uf","technad15523","omareoscoins","tradecraftca","minibull1123","utrdofbbnbrg","npv55rdzapkz","lastlinezzzz","theresno1515","vincent.x","superpisit34","micksonmyeos","redwateraple","mymagicmoney","killerjoebro","patalelapin3","imjooyongkim","jaguareos111","pumpkinseeds","sunxxdzy4321","maxlpawlicki","natenatenate","mschoenebeck","kyoungsookim","petersijmons","ledgerderek1","topupaccount","infinitygems","xxxylmzknxxx","richieeos333","ximplywallet","trustaccount","sweety2spoon","javineosmain","wattlebird12","mineartmedia","rezen5rezen5","tokentransfr","joytwanderer","mayunbb12345","tigerooz1212","wargofosef11","squidlipseos","rowlandpaine","stellar1eos1","mostyummyone","leonardhawke","robellissimo","lhlayy135135","kevindjoffon","moldhor12345","jbenglisheos","nvadrzmuzdie","wooandsuhans","meetoneilove","matrixium555","ryphanouvong","masterjedi33","keesnabjan54","myeos2toeron","lukas.z","sneakyfucker","octlgenohujn","makelovetome","jzl123jzl321","songchunffff","eostokentowy","zhangjie4213","maoweimaowei","y1aduakgfwer","yyvnvjizcuzk","x2igdadolegw","x5wgbzmyrdsr","yykmgiwdkgtu","y1rvdbqtueql","zzfmtegxzlca","x5vkxpgqifuu","z5lhvqqsads4","lom3rnziwcct","2jxireop1vf2","od2xwznl2tmj","jwkwt4pge5kr","k54ptplxavqg","qwrhsbb12345","zgwpsnazvav5","gw1k5eiae2dm","nssmpwllosbx","foalhh1e4rjh","gdnaymrzvh1l","x22ltjsjtczy","y1picgbylgbp","hosehosehose","x2hsusmkgckv","yyrpozjeaidu","x2udugjwhzyb","x2zwddwznoxz","y1gaftnhxrsw","x4zxqzrkdvvo","x4nxygtbwimm","x4ukttqmmnni","y1uwxobnlweo","x4lxwcdpyzol","x4kdknjrysww","x2wtenxerawd","y1yscviubbtu","x4niafmyqtyz","x4krgghcfxbi","x22yjbkoufvq","z1zltxgrweyn","x5xripihkroh","wj4fol3ekgx2","eospingliang","jh5ni1nyo4ro","wufxryylysjf","kxme4v1a2fnc","x4vavubsftrc","x4ubzovyqvea","x5udblfbdjcg","x4eyfitzmbpj","x22qehzxqtlk","z1nwviviguyd","x4mrnrablksr","yyhglyvtxhgb","x4kxvolgjqnf","x4oiotctzpru","x4vrszpudbwn","yyahgrmdmckv","x4heminbklvv","y1wbkczncuvq","y1eswrloljth","yydigvcefshr","x4bjmwwilyoq","x5bdphdqmfxu","zmbtlwbuekvo","x5rtamwapeoe","x5merqwlfqpv","y1dscdkimaii","yylwjfsxadtw","yydwqvnrpljt","nccccccccccn","xiezjangjunz","alq1sryybknh","24wdbc4hhbnl","gq3timzsgyge","dgud22xjmm4s","y1rjszljmqki","yyvlgssyiqur","x4ksjrkyqpua","y1kdcpspryfr","yyltddraqdee","yyxclxrsvfwa","y1wdicelgiuy","x5ostflqbadp","x4kujpbrxgze","g42dknrvgege","x5mllictyoxq","y1wazftwlzsd","x2sfkjxofvdg","x5yeorzytjyo","x4vzmnelcbkd","x4isccrjxeca","x4nmuepjlyyp","y1qpfldpimiz","n232jmt4dpgj","wusfrnixi3lm","gawgsmlt2ajr","zfueeiwg1iyt","eo5y4rupjsoo","nedgxuflelcc","wrofdmrktgkg","x5selclsyscv","x2wnlpzhqxti","holyholyholy","pq54wyjxbmuv","z5yhlyztk1y4","armnwsd3squr","zoq4gzmh2zu2","fep1n5eqjcbx","4mzwgv1r1cye","x2hsnfvsqspw","eosyongchuan","5pjsjv1kebu2","iuot4k2jndzs","yhjgje1pk5yw","atslq2i1mx4v","bu1u333rkcql","x2njryvaechc","x2bazdcsekwf","gy3diojsgqge","zgqugahitgsw","x4qmkcbnkqeb","x2fecyrxjjll","x2fxbmyfggga","zhangchaoeos","1nhw5jwsyk4a","avenged1fold","zofnx2pjpvns","122411112241","gongxijia.m","yuandi123.tp","23atumqfu3wb","xadzzrvfjmur","jkasuna12345","x2wvksanrmhq","x2shahudiadp","y1dvladqiken","x2rlxcajogdr","x2sakizqeouu","x2wrmceosspw","x22iunhmkwli","zfkzmycmapcd","zhang1231232","mainsantai12","luchangyuan1","besiktas4132","yu5555555554","zzz111222.tp","zhongyu33.tp","lucasgame111","minibabylims","yhw123123123","cxy123451.tp","chongai12345","snake1234.tp","praabc12345a","gq2dkmruhage","cheliqiang11","hjxfsmc12345","gf12345qweqq","praeoso12345","x2nstbvlwtdt","x5husrqjdzey","woloveszb123"
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
	if(idx > 2000){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,1300,idx)
	
}
			
setTimeout(deleteLoop,1300, 1);

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


                  
                                                                                                                     
                                                                                                                     
