const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch'); //node only
const { TextDecoder, TextEncoder } = require('util'); //node only

const privateKeys = [privateKey1];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('https://user-api.eoseoul.io:443', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions



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

api.transact(
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
                                                                                                                     
                                                                                                                     
