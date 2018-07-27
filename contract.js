const wasmUrl = "https://raw.githubusercontent.com/EOSIO/eos/master/contracts/eosio.token/eosio.token.wasm";
const abiUrl = "https://raw.githubusercontent.com/EOSIO/eos/master/contracts/eosio.token/eosio.token.abi";

const account = "eoscafekorea";

Eos = require('eosjs');

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
  

fetch(wasmUrl).then(response => {
    return response.json();
}).then(wasm => {
    eos.setcode(account, 0, 0, wams);
});

fetch(abiUrl).then(response => {
    return response.json();
}).then(abi => {
    eos.setcode(account, 0, 0, abi);
});
           
                                 
                                                                                                                     
                                                                                                                     
