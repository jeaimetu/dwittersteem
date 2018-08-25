const scatter = require("eos-scatter");

const network = {
    blockchain:'eos',
    host:'mainnet.eoscalgary.io',
    port:80,
    protocol:'https',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};

const eosOptions = {};


const eos = scatter.eos( network, Eos, eosOptions, 'https' );


eos.contract('hello').then(contract => {
    contract.hi(...args)
});
