const wasmUrl = "./contract/eosio.token.wasm";
const abiUrl = "./contract/eosio.token.abi";

const account = "eoscafekorea";

Eos = require('eosjs');
const fs = require('fs');

config = {
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", // 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'http://dev.cryptolions.io:38888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

eos = Eos(config);
  
wasm = fs.readFileSync("wasmUrl");  
abi = fs.readFileSync("abiUrl");

eos.setcode('myaccount', 0, 0, wasm) // @returns {Promise}
eos.setabi('myaccount', JSON.parse(abi)) // @returns {Promise}

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


createToken("eoscafekorea");
transfer("eoscafekorea");
                                 
                                                                                                                     
                                                                                                                     
