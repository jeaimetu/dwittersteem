//import ScatterJS from './scatter.min.js';
//import Eos from "../eosjs.js";

const network = {
    blockchain:'eos',
    protocol:'https',
    host:'mainnet.eoscalgary.io',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}




function toggleKeyInput () {    
    scatter.connect('My App').then(connected => {
        if(!connected) return false;
        
        
    const requiredFields = { accounts:[network] };
    scatter.getIdentity(requiredFields).then(() => {
      const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
      const eosOptions = { expireInSeconds:60 };
      const eos = scatter.eos(network, Eos, eosOptions);
      
      const transactionOptions = { authorization:[`${account.name}@${account.authority}`], broadcast: true, sign: true };
      console.log("acc", account);
        
        async function transfer(from, to, amount){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "DAB",transactionOptions);
}
        
        transfer(account.name, "eoscafekorea", "1.0000");
  
        /*

      eos.transfer(account.name, 'eoscafekorea', '1.0000 DAB', '', transactionOptions).then(trx => {
        console.log(`Transaction ID: ${trx.transaction_id}`);
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });

    });    */
    

}
