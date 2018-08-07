const wasmUrl = "./contract/eosio.token.wasm";
const abiUrl = "./contract/eosio.token.abi";

const account = "eoscafekorea";

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
  

wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);

//eos.setcode("eoscafekorea", 0, 0, wasm) // @returns {Promise}
//eos.setabi("eoscafekorea", JSON.parse(abi)) // @returns {Promise}

var request = require("request");

/*
var options = { method: 'POST',
  url: 'https://mainnet.eoscalgary.io/v1/chain/get_abi',
  body: { account_name: 'eosio.token' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body.abi);

});
*/

var options = { method: 'POST',
  url: 'https://mainnet.eoscalgary.io/v1/chain/get_code',
  body: { account_name: 'eosio.token', code_as_wasm: 'true' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body.wasm);
	eos.setcode("eoscafekorea", 0, 0, body.wasm)
});





async function createToken(account){
  await eos.transaction(account, myaccount => {

  // Create the initial token with its max supply
  // const options = {authorization: 'myaccount'} // default
    //500,000,000 is the base. Annual inflation is 5% to 5 years. Others will be burned.
  myaccount.create(account, '1000000000.0000 DAB')//, options)

  // Issue some of the max supply for circulation into an arbitrary account
  myaccount.issue(account, '500000000.0000 DAB', 'issue')
})

  //const balance = await eos.getCurrencyBalance(account, account, 'DAB')
  //console.log('Currency Balance', balance)
}

async function transfer(from, to, amount){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "DAB","");
}


//createToken("eoscafekorea");
//transfer("eoscafekorea","awesometeddy",1000.0000);
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
/*
eos.transaction("eoscafekorea", myaccount => {
// Issue some of the max supply for circulation into an arbitrary account
	myaccount.issue("eoscafekorea", '20000000.0000 DAB', 'issue')
  myaccount.transfer("eoscafekorea", "awesometeddy", '1000000.0000 DAB', "first transfer test");
});
*/

//eos.getCurrencyBalance("eoscafekorea", "awesometeddy", 'DAB').then(function(result){
//	console.log("awesometeddy balance", result);
//});
                                 
                                                                                                                     
                                                                                                                     
