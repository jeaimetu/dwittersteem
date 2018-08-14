const wasmUrl = "./contract/eosio.token.wasm";
const abiUrl = "./contract/eosio.token.abi";

const account = "eoscafebeans";

Eos = require('eosjs');
const fs = require('fs');




config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'https://mainnet.eoscalgary.io',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}


eos = Eos(config);

function transfer(from, to, amount, msg){
	eos.transaction("eoscafekorea", myaccount => {
	myaccount.transfer(from,to, amount + " " + "DAB", msg).catch(function (error){
		console.log("inner transfer error", error);
	});
	}).catch(function (error) {
		console.log("transfer error", error);
	});

}

transfer("eoscafekorea","eoscafebeans","0.0001", "test");

if(process.env.dist != "true")
	return;


/* buy ram success
eos.transaction(tr => {
	  tr.buyrambytes({
    payer: 'eoscafekorea',
    receiver: 'eoscafekorea',
    bytes: 2000*1024
  })
});

return;
*/
  

//wasm = fs.readFileSync(wasmUrl);  
//abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);

//eos.setcode("eoscafebeans", 0, 0, wasm) // @returns {Promise}
//eos.setabi("eoscafebeans", JSON.parse(abi)) // @returns {Promise}





async function createToken(account){
  await eos.transaction(account, myaccount => {

  // Create the initial token with its max supply
  // const options = {authorization: 'myaccount'} // default
    //500,000,000 is the base. Annual inflation is 5% to 5 years. Others will be burned.
  myaccount.create(account, '11000000000.0000 BEANS')//, options)

  // Issue some of the max supply for circulation into an arbitrary account
  myaccount.issue(account, '10000000000.0000 BEANS', 'issue')
})

  //const balance = await eos.getCurrencyBalance(account, account, 'DAB')
  //console.log('Currency Balance', balance)
}

async function transfer(from, to, amount){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "DAB","");
}


createToken("eoscafebeans");
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


eos.getCurrencyBalance("eoscafebeans", "eoscafebeans", 'BEANS').then(function(result){
	console.log("eoscafebeans balance", result);
});
                                 
                                                                                                                     
                                                                                                                     
