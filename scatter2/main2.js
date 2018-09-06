

const network = {
    blockchain:'eos',
    protocol:'https',
    host:'mainnet.eoscalgary.io',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}


function toggleKeyInput () {
  document.addEventListener('scatterLoaded', scatterExtension => {    
      const scatter = window.scatter;
      window.scatter = null;



    
    const requiredFields = { accounts:[network] };
    scatter.getIdentity(requiredFields).then(() => {
      const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
      const eosOptions = { expireInSeconds:60 };
      const eos = scatter.eos(network, Eos, eosOptions);
      
      const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
      
      eos.transfer(account.name, 'eoscafekorea', '1.0000 DAB', 'memo', transactionOptions).then(trx => {
        console.log(`Transaction ID: ${trx.transaction_id}`);
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  });  
}
