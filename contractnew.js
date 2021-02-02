const wasmUrl = "./tookcontract/eosio.token.wasm";
const abiUrl = "./tookcontract/eosio.token.abi";

const account = "taketooktook";

Eos = require('eosjs');
const fs = require('fs');


//mainnet
config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",//mainnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",//testnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",// 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'https://user-api.eoseoul.io:443',
  //httpEndpoint:	"https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}


eos = Eos(config);

  const wasmFilePath = '/deletecontract/eosio.token.wasm'
const abiFilePath = '/deletecontract/eosio.token.abi'

const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

const buffer = new Serialize.SerialBuffer({
    textEncoder: api.textEncoder,
    textDecoder: api.textDecoder,
})

let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
const abiDefinitions = api.abiTypes.get('abi_def')
abiJSON = abiDefinitions.fields.reduce(
    (acc, { name: fieldName }) =>
        Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
        abiJSON
    )
abiDefinitions.serialize(buffer, abiJSON)
serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

await api.transact(
    {
      actions: [
        {
          account: 'eosio',
          name: 'setcode',
          authorization: [
            {
              actor: 'eoscafekorea',
              permission: 'active',
            },
          ],
          data: {
            account: 'eoscafekorea',
            code: wasmHexString,
          },
        },
        {
          account: 'eosio',
          name: 'setabi',
          authorization: [
            {
              actor: 'eoscafekorea',
              permission: 'active',
            },
          ],
          data: {
            account: 'eoscafekorea',
            abi: serializedAbiHexString,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  )                
                                                                                                                     
                                                                                                                     
