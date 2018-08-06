const wasmUrl = "./contract/eosio.token.wasm";
const abiUrl = "./contract/eosio.token.abi";

const account = "eoscafekorea";

Eos = require('eosjs');
const fs = require('fs');

config = {
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", // 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'http://193.93.219.219:8888',
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
  
/*
wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

console.log("Wasm", wasm);
console.log("Abi", abi);

eos.setcode("eoscafekorea", 0, 0, wasm) // @returns {Promise}
eos.setabi("eoscafekorea", JSON.parse(abi)) // @returns {Promise}

*/

async function createToken(account){
  await eos.transaction(account, myaccount => {

  // Create the initial token with its max supply
  // const options = {authorization: 'myaccount'} // default
    //500,000,000 is the base. Annual inflation is 5% to 5 years. Others will be burned.
  myaccount.create(account, '1000000000.0000 DAB')//, options)

  // Issue some of the max supply for circulation into an arbitrary account
  myaccount.issue(account, '1000000.0000 DAB', 'issue')
})

  const balance = await eos.getCurrencyBalance(account, account, 'DAB')
  console.log('Currency Balance', balance)
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
eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
	console.log("eoscafekorea balance", result);
});
/*
options = {
  authorization: 'eoscafekorea@active',
  broadcast: true,
  sign: true
}
eos.transfer('eoscafekorea', 'awesometeddy', '1000.0000 DAB', '',options)
*/

eos.transaction("eoscafekorea", myaccount => {
// Issue some of the max supply for circulation into an arbitrary account
	myaccount.issue("eoscafekorea", '20000000.0000 DAB', 'issue')
  myaccount.transfer("eoscafekorea", "awesometeddy", '1000000.0000 DAB', "first transfer test");
});

eos.getCurrencyBalance("eoscafekorea", "awesometeddy", 'DAB').then(function(result){
	console.log("awesometeddy balance", result);
});
                                 
                                                                                                                     
                                                                                                                     
