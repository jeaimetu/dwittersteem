const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "eoscafekorea";

Eos = require('eosjs');
const fs = require('fs');



console.log("eoscafekorea contract test");

//mainnet
config = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",//mainnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",//testnet
  //chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",// 32 byte (64 char) hex string
  keyProvider: process.env.key, // WIF string or array of keys..
  httpEndpoint: 'https://eos.greymass.com:443',
  //httpEndpoint:	"https://jungle2.cryptolions.io:443",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}


console.log("calling eos config");
eos = Eos(config);

let accountString = [
	"choikwangsoo", "ge3dgmbzgige", "gyztcmrrgage", "hezdiojsg4ge", "gq3tambygmge", "hezdimjshage", "hezdknryguge", "gyztanrzgige", "ha3tanygenes", "hezdgmbyhege", "hezdknbvgqge", "ha3dsobvgage", "hezdinjyhege", "hezdgojwhage", "ha3tgojxguge", "hezdinrugyge", "ha3tanigenes", "hezdkmbygmge", "hezdgnbygmge", "ha3tamrtgqge", "hezdkmbtgmge", "hezdinrzgqge", "ha3temrwguge", "hezdiojzgige", "hezdgnzyhage", "gyztamzxguge", "hezdioagenes", "hezdimjzgyge", "gyzdsnjzgage", "ha3tembugege", "ha3tinbugege", "hezdknzxhage", "hezdknzrgyge", "hezdinzwgqge", "hezdinzzgyge", "hezdinrxhage", "ha3tcmzwgqge", "ha3tcnbqgyge", "ha3tenzrgige", "ha3dsnzqhage", "gyztaojyguge", "ha3tamjxgage", "gyztcmjshage", "ha3tenjzgige", "ha3dqmrsgege", "ha3dsojsgage", "hezdkmagenes", "hezdkmqgenes", "gyztcobrg4ge", "gyzdsnzzgmge", "ha3tgnbtguge", "ha3temjwgqge", "gyztanrzgyge", "gyztamzyguge", "hezdiobqg4ge", "hezdinzvgyge", "hezdimjrg4ge", "hezdinrsgqge", "hezdimbxgige", "gyztcojugyge", "gyztanzqhege", "ha3dqnzxgige", "ha3temrugmge", "hezdgnjwg4ge", "hezdgmbwhege", "ha3temjrgmge", "ha3tgnzrgyge", "ha3dsobtgige", "ha3donrqhage", "ha3tcnzqgene", "gyztambuhege", "ha3temjzg4ge", "ha3tgmzug4ge", "ha3teobygege", "ha3tenjrgige", "gyztanrxgyge", "gq3dqmzygige", "hezdkmbsgege", "gyzdsnrzgege", "ha3dsmzvhage", "gyzdsojqhege", "ha3dsmjqgqge", "gyztaobsguge", "ha3taobyhage", "ha3tembygene", "hezdinjuhage", "hezdgnzxgqge", "hezdgobugyge", "ha3dogenesis", "ha3dsnzygmge", "gyzdsnrqgyge", "hezdimbwgqge", "ha3tcojtgage", "hezdkmzygmge", "ha3tamzzgene", "hezdgnjvgqge", "ha3tenbsgege", "gyztamjrhege", "hezdinrrhage", "hezdinrwhage", "ha3tgmjwgage", "ha3dqnbrhege", "hezdknjxhage", "ha3donjwgmge", "gyztamrzgmge", "gyztcnjugmge", "ha3dmobwguge", "ha3dqmrrhege", "hezdkmigenes", "ha3dsmbrhage", "gyztcnrrgqge", "gyztamzwgyge", "ha3tambrgqge", "ha3domzsgmge", "ha3dqnbtgmge", "ha3dqnbxgmge", "ha3tanbrgige", "hezdinzxgmge", "gyztambrgage", "ha3tgmzugige", "hezdimzsgege", "ha3dqmbvg4ge", "hezdgnbvhage", "hezdgnzqhege", "gyztcnrqg4ge", "g42tsmrshege", "g42tsmrtgene", "g42tsnbtgqge", "g42tsnbyguge", "g42tsnigenes", "g42tsnjsguge", "g42tsnrsg4ge", "g42tsnrtguge", "g42tsnzrhege", "g42tsnztgene", "g42tsnzugage", "g42tsojrgige", "g42tsojtg4ge", "g42tsmrrgege", "g42tsmbyhage", "g42tsmbrgene", "g42tenjwg4ge", "g42tenjzgage", "g42tenjzguge", "g42tenzxgage", "g42teojqhege", "g42tqnrrg4ge", "g42tqnzsguge", "g42tqnzwgqge", "g42tqnzxhage", "g42tqobwgige", "g42tqojvgege", "g42tqojygyge", "g42tsmbrg4ge", "g43dambqgege", "g43dambsg4ge", "g43daobyguge", "g43dcmbqgmge", "g43dcmbwhege", "g43dcmbyg4ge", "g43dcmjug4ge", "g43dcnbxgmge", "g43dcnbzhage", "g43dcnjug4ge", "g43dcnrqhege", "g43dcnrwgage", "g43dcnrwgene", "g43dcnrxgmge", "g43dcnrzguge", "g43daobvgege", "g43daobugene", "g43danzwgene", "g43damjvhege", "g43damrygmge", "g43damygenes", "g43damzzgege", "g43danbtguge", "g43danbthage", "g43danbugige", "g43danbzgage", "g43danjtgene", "g43danjvgyge", "g43danrygyge", "g43danygenes", "g43danzvg4ge", "g43dcnzqgene", "g42dinbrgmge", "ha3dmmztguge", "ha3dqojvgage", "ha3dqmrygqge", "ha3dqnrwgyge", "g42damzygige", "g42danbzgege", "g42danjvg4ge", "g42daojugyge", "g42dcmbvgage", "g42dcmrrgene", "g42dcmzsgene", "g42dcnbzhage", "g42dcnrug4ge", "g42demjthage", "gyztcojvhege", "gyztamrtgqge", "hezdgnzxgyge", "ha3dmnrxgige", "ha3dmmzwg4ge", "hezdgnzqgqge", "ha3tinbwgage", "hezdgnjsgege", "ha3dmojqg4ge", "gyztcnbzguge", "ha3taojygyge", "ha3tgnbvgage", "ha3tanjzg4ge", "gyztcojqgege", "ha3dmobtgyge", "ha3dmojxgage", "g42demjygyge", "g42demjyhage", "g42dgmzugene", "g42dgmzygyge", "g42dgmzzgyge", "g42dgnrvgene", "g42dgnrzgmge", "g42dgojwgene", "g42dgojwgige", "g42dgojzgyge", "g42dimbwgage", "g42dimjugige", "g42dimjwgige", "g42dimrqgmge", "g42dimryhege", "g42dgmzqgqge", "g42dgmbwgene", "g42deojqgmge", "g42demjzhege", "g42demrvgene", "g42demrwgege", "g42denbqgige", "g42denbugqge", "g42denbyhage", "g42denjtgage", "g42denzrgage", "g42denztgige", "g42denzxguge", "g42deobvgqge", "g42deobwgene", "g42deobzgqge", "g42dimzwhege", "ha3dsmjwgmge", "hezdgnjwgyge", "hezdgnzxg4ge", "ha3timjwgige", "hezdgmrugqge", "gyzdsnzwguge", "ha3tambwgege", "gyztamjygyge", "hezdgnzwguge", "ha3timjygyge", "gyztamrqgage", "hezdimbug4ge", "ha3dsnjqgyge", "hezdkmrtguge", "ha3tgojtg4ge", "hezdgmjuguge", "ha3tcnrygige", "ha3dqmzrhage", "hezdgmjrgege", "hezdgojugqge", "hezdgnbygyge", "ha3dqobsgage", "ha3donzsgege", "ha3donbrguge", "gyztcmzvgige", "ha3dmmrqgyge", "hezdiojtgige", "hezdinrxhege", "ha3tenzvgage", "ha3dqnjwguge", "ha3dsmbwgmge", "ha3tenztgyge", "ha3tcnjrg4ge", "akpm44445555", "aladexeos111", "hezdknbxguge", "hezdgmzxgmge", "alexlarsen12", "alfacentauri", "hezdinzygige", "gyzdsojwgmge", "gyztcobqg4ge", "ha3tanrrgage", "gq3dqnrwgqge", "amareos12345", "ha3taobzhege", "gyztembxgmge", "ha3teobvgage", "gyztcnzsgqge", "ha3doojrguge", "ha3domjtgene", "ha3dqmzzguge", "ha3dsnjrgqge", "ha3dsnjrhage", "hezdknbyhage", "ha3dmnbtgene", "hezdiobugige", "ha3dqojrhege", "ha3taojzgqge", "ha3timjrgqge", "ha3doojsgege", "ha3timrsgige", "ha3dsnrqgmge", "g43dcnzrguge", "ha3tcmbthege", "hezdimjuhege", "ha3dqojqgige", "gyztcojugige", "ha3tamrsgage", "ha3dombtgene", "ha3dqmjqguge", "gyztcmjygyge", "hezdiobvgege", "ha3dqmrqgmge", "ha3dsnjzgige", "ha3dqmbuhege", "ha3tanrtgqge", "hezdkmbxg4ge", "ha3dsobygyge", "hezdiojyhage", "g43dcnztg4ge", "hezdkmjvhege", "g43dcnzugege", "hezdgmzqgege", "ha3tcmjsguge", "112233445511", "hezdknjtgyge", "gyztcmbvgmge", "ha3tgnjwguge", "hezdgojqguge", "ha3tcnbrgige", "ha3tenbyhage", "ha3tcnbsgige", "ha3dmnrwhage", "hezdimbvgmge", "ha3dmnbsgige", "ha3dmnbtgege", "gyztembrgyge", "ha3dqnbsgage", "41vv45lsv1jx", "ha3dsmrvgage", "ha3dqobrguge", "gyztanbxhage", "ha3dmnjxhage", "gyztcnjsgige", "ha3dqojwguge", "ha3dmnrtgage", "ha3dqojygige", "ha3domjqgqge", "ha3dmmzygage", "hezdgnrxgige", "hezdknzqgage", "hezdgmrwhage", "ha3dqobzhege", "gyztcmjsgage", "gyztcnzsguge", "gyztcobsgyge", "ha3tcnjuguge", "ha3dmmrygyge", "gyztanrugqge", "hezdgnjsgmge", "ha3dombygmge", "hezdgnrsgmge", "ha3dmnzvhege", "4w3kerkpbaud", "ha3timjwguge", "gyztcmbuhege", "chenbo111111", "ha3timjxgage", "ha3timjzhage", "hezdinjtgige", "gyztanrrhege", "hezdinrxgige", "hezdgmrrhage", "hezdkmbqhege", "ha3tgobwgmge", "gyztcnjvgyge", "hezdiobvg4ge", "hezdimrxgqge", "hezdgnjugqge", "gyztembygyge", "hezdinzvhege", "ha3tgmzzhage", "ha3tanbshege", "hezdinbqg4ge", "hezdgojxhege", "gyztanbuguge", "ha3dmojwguge", "ha3dsmbwguge", "ha3donjwg4ge", "ha3domrsgene", "ha3donrvhage", "gyzdsnzygege", "ha3tcnzqgige", "hezdinrzgage", "hezdknrzgqge", "chinfeinine5", "ha3tinbugmge", "hezdimbxg4ge", "compracer211", "hezdgnrxguge", "coryknemis11", "hezdkmjzg4ge", "craigm4eosio", "gq3doojqgyge", "creativethot", "criptoshrimp", "cryptocoders", "hezdinrugqge", "cryptofairy1", "gyztaobqgmge", "ha3tgmjrguge", "ha3tgobugage", "hezdiobqhage", "gyztcmbvgege", "christoffer1", "ha3dsnjvgmge", "hezdiobygmge", "hezdkmrzhege", "ha3dsnrthage", "ha3dmnrrhage", "ha3dsnzzhege", "clevengersco", "gyztambwhege", "gyztanzrgqge", "hezdgnjqgyge", "hezdknrrgige", "ha3donzzhege", "ammirevoleos", "gyztanrzgege", "hezdknrqgqge", "gyztcmzsgage", "gyztcmjrgqge", "gyztamrzhege", "hezdgmjshege", "ha3dsnbthege", "ha3tcnjsgege", "gyzdsojsg4ge", "gyztcmbsgege", "ha3tambvgene", "hezdgmzvgene", "ha3tanrygage", "gyztanbxguge", "ha3tgmjrgage", "ha3tcmjsgage", "analogpeople", "gyztanrvg4ge", "ha3dsnzzg4ge", "ha3tgmbxgege", "ha3tcnrxg4ge", "ha3dsnzvg4ge", "hezdimryg4ge", "gyztcnbxgege", "ha3dqobqgage", "ha3tgmzyg4ge", "hezdimrygyge", "hezdgnrrgige", "ha3timrvguge", "hezdknjygmge", "ha3tcnbzgige", "ha3dsmzrgage", "gyztambzgqge", "hezdgnjvhage", "gyztcmzwgege", "gyztanrshage", "ha3dsobwgage", "gyzdsnztg4ge", "ha3tcmrrgqge", "ha3dsmrrgyge", "hezdkmzzguge", "hezdgobrgmge", "gyztamzzgige", "ha3donjsgage", "hezdiojxgige", "gyzdsojvg4ge", "ha3tgmruhege", "ha3tamztg4ge", "ha3timzzgige", "hezdeojxgige", "hezdgnjuhage", "gyzdsnjxhage", "gyztanjugmge", "ha3donjrgmge", "ha3dsnjqhage", "hezdkmzvhage", "ha3dqmbvgyge", "hezdkmzvgqge", "ha3dmmzsgige", "ha3tgmrzguge", 
	"hezdinzygige", "rickyestrada", "hezdgnzyhage", "hezdinrxhege", "hezdknjtgyge", "hezdsnjqgmge", "hezdmobrgyge", "myaccount123", "heztcnygenes", "ylspaul1gg4o", "hezdomrsgyge", "hezdiobvgege", "hezdsojzhage", "myeoslockbox", "ilbeilbeilbe", "hezdsmzxhege", "hezdsnbvg4ge", "windermereuk", "slovenia1234", "hezdsnjxgqge", "petsanledger", "yunjonghwan1", "hezdqmbuguge", "marcelvr1335", "hezdqnrtgmge", "hezdkmbxg4ge", "hezdoobvguge", "hezdsmjugyge", "heztcnbtgege", "jenkdatank14", "tshamsterdam", "heztaobxhege", "wendysa11111", "zvctezmvfggm", "hezdknbxguge", "hezdqmrqgqge", "hezdombygyge", "hezdmnrtgyge", "lordofnights", "hezdomrvgage", "hezdknryguge", "hezdknrqgqge", "hezdiobqhage", "mymorewallet", "hezdmobzgege", "hezdinbqg4ge", "hezdqnzxgege", "hezdsmrrhage", "hezdqmjvgene", "mbeosaccount", "hezdiojzgige", "mykeybihueos", "hezdsmjvgege", "hezdqmrsgige", "gq3doojqgyge", "gq3dqmzygige", "gq3dqnrwgqge", "gq3tambygmge", "hezdsnbsguge", "hezdomzvgyge", "mattemulsion", "wbxyejt5ezd3", "hezdimjrg4ge", "hezdomzwg4ge", "hezdinzzgyge", "petuliak2ova", "naguminagumo", "hezdqnjtgage", "piedpipernet", "hezdkmzzguge", "hezdinrxgige", "worldrichman", "heztanzxhage", "hezdgojqguge", "pigdogsurfer", "hezdinzwgqge", "hezdkmzvhage", "hezdknbyhage", "hezdombqgege", "hezdknjxhage", "hezdkobzhage", "hezdmnjygige", "hezdonzuhage", "hezdinrugyge", "hezdknzrgyge", "heztmgenesis", "hjoltqy3s51i", "unenumerated", "hezdkobzgege", "hezdmnrxguge", "xbitgenstein", "hezdoojqgege", "sweetdolce22", "libertyforme", "samroleostes", "heztcmbrgage", "heztcnbqgage", "heztimzsgene", "hezdoobxg4ge", "spettacoleos", "hezdmnjwhege", "hezdinrzgqge", "onenonlykpro", "hezdkmigenes", "heztmmzvgene", "hezdimrxgqge", "hezdmmrygige", "mz2guilddddd", "hezdqnjqgage", "hezdsnbvgige", "heztcmbrhage", "hezdqojtgyge", "warmachineio", "mytrash.dice", "xiaobeiba222", "hezdsmrwgyge", "hezdgojugqge", "hezdmmzugyge", "hezdkmagenes", "hezdmojvg4ge", "hezdoobqgige", "hezdiojxgige", "hezdonjrguge", "hezdomjqg4ge", "pixelzkeosio", "hezdqojsgqge", "hezdqnbyg4ge", "segurata1234", "hezdmmbsgege", "hezdinjuhage", "teoskazlilze", "gyzdsnjxhage", "gyzdsnjzgage", "gyzdsnrqgyge", "gyzdsnrzgege", "gyzdsnztg4ge", "gyzdsnzwguge", "gyzdsnzygege", "gyzdsnzzgmge", "gyzdsojqhege", "gyzdsojsg4ge", "gyzdsojvg4ge", "gyzdsojwgmge", "gyztambrgage", "gyztambuhege", "gyztambwhege", "gyztambzgqge", "gyztamjrhege", "gyztamjygyge", "gyztamrqgage", "gyztamrtgqge", "gyztamrzgmge", "gyztamrzhege", "gyztamzwgyge", "gyztamzxguge", "gyztamzyguge", "gyztamzzgige", "gyztanbuguge", "gyztanbxguge", "gyztanbxhage", "gyztanjugmge", "gyztanrrhege", "gyztanrshage", "gyztanrugqge", "gyztanrvg4ge", "gyztanrxgyge", "gyztanrzgege", "gyztanrzgige", "gyztanrzgyge", "gyztanzqhege", "gyztanzrgqge", "gyztaobqgmge", "gyztaobsguge", "keycondition", "gyztaojyguge", "gyztcmbsgege", "gyztcmbuhege", "gyztcmbvgege", "gyztcmbvgmge", "gyztcmjrgqge", "gyztcmjsgage", "gyztcmjshage", "gyztcmjygyge", "gyztcmrrgage", "gyztcmzsgage", "gyztcmzvgige", "hezdmnjqgqge", "gyztcmzwgege", "gyztcmzzgqge", "gyztcnbxgege", "gyztcnbzguge", "gyztcnjsgige", "gyztcnjugmge", "gyztcnjvgyge", "gyztcnrqg4ge", "gyztcnrrgqge", "hezdqmjqgyge", "gyztcnzsgqge", "gyztcnzsguge", "gyztcobqg4ge", "gyztcobrg4ge", "gyztcobsgyge", "hezdonzwgqge", "gyztcojqgege", "gyztcojugige", "gyztcojugyge", "gyztcojvhege", "gyztembrgyge", "gyztembxgmge", "gyztembygyge", "hezdmnrzhege", "hezdknzqgage", "mithrilwheel", "hezqgenesis1", "heztanzug4ge", "heztcmryg4ge", "hezdqnbqgqge", "ponddiggertn", "hezdknzxhage", "rauleosworld", "ha3dmmrqgyge", "ha3dmmrygyge", "ha3dmmzsgige", "ha3dmmztguge", "ha3dmmzwg4ge", "ha3dmmzygage", "ha3dmnbsgige", "ha3dmnbtgege", "ha3dmnbtgene", "ha3dmnjxhage", "ha3dmnrrhage", "ha3dmnrtgage", "ha3dmnrwhage", "ha3dmnrxgige", "ha3dmnzvhege", "heztanbrhege", "ha3dmobtgyge", "ha3dmobwguge", "ha3dmojqg4ge", "ha3dmojwguge", "ha3dmojxgage", "ha3dogenesis", "ha3dombtgene", "ha3dombygmge", "ha3domjqgqge", "ha3domjtgene", "ha3domrsgene", "ha3domzsgmge", "ha3donbrguge", "ha3donjrgmge", "ha3donjsgage", "ha3donjwg4ge", "ha3donjwgmge", "ha3donrqhage", "ha3donrvhage", "ha3donzsgege", "ha3donzzhege", "ha3doojrguge", "ha3doojsgege", "ha3dqmbuhege", "ha3dqmbvg4ge", "ha3dqmbvgyge", "ha3dqmjqguge", "ha3dqmrqgmge", "ha3dqmrrhege", "ha3dqmrsgege", "ha3dqmrygqge", "ha3dqmzrhage", "ha3dqmzzguge", "ha3dqnbrhege", "ha3dqnbsgage", "ha3dqnbtgmge", "ha3dqnbxgmge", "ha3dqnjwguge", "ha3dqnrwgyge", "ha3dqnzxgige", "ha3dqobqgage", "ha3dqobrguge", "ha3dqobsgage", "ha3dqobzhege", "ha3dqojqgige", "ha3dqojrhege", "ha3dqojvgage", "ha3dqojwguge", "ha3dqojygige", "ha3dsmbrhage", "ha3dsmbwgmge", "ha3dsmbwguge", "ha3dsmjqgqge", "ha3dsmjwgmge", "ha3dsmrrgyge", "ha3dsmrvgage", "ha3dsmzrgage", "ha3dsmzvhage", "ha3dsnbthege", "ha3dsnjqgyge", "ha3dsnjqhage", "ha3dsnjrgqge", "ha3dsnjrhage", "ha3dsnjvgmge", "ha3dsnjzgige", "ha3dsnrqgmge", "ha3dsnrthage", "ha3dsnzqhage", "ha3dsnzvg4ge", "ha3dsnzygmge", "ha3dsnzzg4ge", "ha3dsnzzhege", "ha3dsobtgige", "ha3dsobvgage", "ha3dsobwgage", "ha3dsobygyge", "ha3dsojsgage", "ha3tambrgqge", "ha3tambvgene", "ha3tambwgege", "ha3tamjxgage", "ha3tamrsgage", "ha3tamrtgqge", "ha3tamztg4ge", "ha3tamzzgene", "ha3tanbrgige", "ha3tanbshege", "ha3tanigenes", "ha3tanjzg4ge", "ha3tanrrgage", "ha3tanrtgqge", "ha3tanrygage", "ha3tanygenes", "ha3taobyhage", "ha3taobzhege", "ha3taojygyge", "ha3taojzgqge", "ha3tcmbthege", "ha3tcmjsgage", "ha3tcmjsguge", "hezdonbug4ge", "ha3tcmrrgqge", "ha3tcmzwgqge", "ha3tcnbqgyge", "ha3tcnbrgige", "ha3tcnbsgige", "ha3tcnbzgige", "ha3tcnjrg4ge", "ha3tcnjsgege", "ha3tcnjuguge", "ha3tcnrxg4ge", "ha3tcnrygige", "ha3tcnzqgene", "ha3tcnzqgige", "ha3tcojtgage", "ha3tembugege", "ha3tembygene", "ha3temjrgmge", "ha3temjwgqge", "ha3temjzg4ge", "hezdomzqgyge", "ha3temrugmge", "ha3temrwguge", "ha3tenbsgege", "ha3tenbyhage", "ha3tenjrgige", "ha3tenjzgige", "ha3tenzrgige", "ha3tenztgyge", "ha3tenzvgage", "ha3teobvgage", "ha3teobygege", "ha3tgmbxgege", "ha3tgmjrgage", "ha3tgmjrguge", "ha3tgmjwgage", "ha3tgmruhege", "ha3tgmrzguge", "ha3tgmzug4ge", "ha3tgmzugige", "ha3tgmzyg4ge", "ha3tgmzzhage", "ha3tgnbtguge", "ha3tgnbvgage", "ha3tgnjwguge", "ha3tgnzrgyge", "ha3tgobugage", "ha3tgobwgmge", "ha3tgojtg4ge", "ha3tgojxguge", "hezdqnbrhege", "hezdomrsgqge", "hezdkojsg4ge", "ha3timjrgqge", "ha3timjwgige", "ha3timjwguge", "ha3timjxgage", "ha3timjygyge", "ha3timjzhage", "ha3timrsgige", "ha3timrvguge", "ha3timzzgige", "ha3tinbugege", "ha3tinbugmge", "ha3tinbwgage", "sssssssssssv", "iloveyoucyou", "hezdinzxgmge", "utilitymuffn", "monochromath", "hezdimjuhege", "msdnk1111111", "just4cryptoc", "hezdsmjsgqge", "weixintoken1", "joelsawesome", "hezdomrwgqge", "hezdomryg4ge", "hezdiobqg4ge", "heztoobygene", "hezdomrsgmge", "hezdoobygqge", "hezdiobugige", "hezdomjvgyge", "hezdomjugqge", "hezdmobwg4ge", "hezdmmzwgyge", "hezdmobtgage", "hezdqmjwgqge", "popcorneos11", "ignatsukach1", "heztgojqgene", "xlblockchain", "hezdinzvhege", "hezdiojsg4ge", "pederlamp345", "hezdinrxhage", "hezdinrsgqge", "hezdsojthege", "hezdkmrtguge", "hezdkmzygmge", "hezdkojthege", "pemzijarules", "navidadeosor", "techsruptive", "hezdqnbrgyge", "hezdknbvgqge", "hezdqmzzhage", "hezdinrugqge", "hezdomzugege", "hezdeojxgige", "hezdgmbwhege", "hezdgmbyhege", "hezdgmjrgege", "hezdgmjshege", "hezdgmjuguge", "hezdgmrrhage", "hezdgmrugqge", "hezdgmrwhage", "hezdgmzqgege", "hezdgmzvgene", "hezdgmzxgmge", "hezdgnbvhage", "hezdgnbygmge", "hezdgnbygyge", "hezdgnjqgyge", "hezdgnjsgege", "hezdgnjsgmge", "hezdgnjugqge", "hezdgnjuhage", "hezdgnjvgqge", "hezdgnjvhage", "hezdgnjwg4ge", "hezdgnjwgyge", "hezdgnrrgige", "hezdgnrsgmge", "hezdgnrxgige", "hezdgnrxguge", "hezdgnzqgqge", "hezdgnzqhege", "he3digenesis", "kevinjohnson", "atmosfanxxx1", "ostepoppmann", "stefanaeschl", "hezdqobvguge", "eosioemanate", "giytiojwgmge", "gu3dsnzugige", "gu4tkobqgmge", "gyzdgnjugege", "hezdinrrgege", "gq4dsnrtgage", "gy4tsnbvguge", "gyydoojqgmge", "alaraimimaha", "gq3tembzgqge", "heydqnzqgege", "gy4tsmjvhege", "prapoison521", "gyzdkojwg4ge", "securextrust", "lovewjq55555", "blackpanjul1", 
	"blueportugal", "giytcobzguge", "jixiong12345", "praiouaioub1", "g4ztenbygage", "ge4tgmbxgmge", "llbwoochaell", "zamzamshulle", "counselor222", "daveismyname", "ge2dimbvgene", "gu3danrqg4ge", "gu4dgmbwgege", "gy2dknrugene", "hazdaojvgyge", "iubbh3fqrpek", "nameisbetter", "chenyao11111", "giydoojrgqge", "haoshuo12345", "gruaudlarose", "peloponnesos", "pravera33333", "gy2dgnrugyge", "meituo.game", "5yqdw1131213", "eoshejiaqing", "chyxchyx2222", "prauwl5qabyx", "gi4tgojzgqge", "gu3tkmbwgmge", "ha4tmnjqguge", "sj32eosyhyhz", "praeosmrxbjc", "ryin52rita52", "y1bojfzqlthj", "chizhanfei32", "eossearchcom", "wwwmaotai555", "x2al5a2q3ig4", "praziqing333", "eoscoin33333", "yuminbaieos1", "eosxx11xxeos", "westernsamoa", "aliwildgrass", "gyzdqmrqgige", "heydcmrrg4ge", "chateausolon", "paviedecesse", "eossoelhee11", "prachang3333", "gu4taojxgqge", "chateaupavie", "a12stitch345", "oureosworlds", "eosyllzhspt1", "chenxiang111", "egjayhiyama1", "ha3tmnbuhege", "cryptoevgeny", "loveme222222", "eostoken5552", "yanmingxx123", "markxu252521", "maddocrypto4", "gyzdcnzsguge", "jaksonblaik1", "sqyyxxpp1111", "gulfofmexico", "ljf243231522", "eosmarkxujun", "whm123454321", "jiafeneoswxw", "cyzcxycrz123", "jiajiamanman", "chengsheng12", "g44dmnbsg4ge", "jhtsyleronly", "pracxycrz522", "lgh133143331", "wrfmails1234", "ha3dinbwgage", "praeosdfkdfk", "as1234555555", "keithkeith22", "armiamuhamma", "prax555555zg", "nosnosnosnos", "mynameispigs", "llj555555555", "chinagoubuli", "xuanming.io", "eoscoins3141", "q3q3q3q3q3q3", "tutorcho1234", "liushili1111", "1beauxyeux12", "xi1223334444", "linhaiyan123", "eosiocnliuya", "eostokensave", "ge3tgnjxgige", "gu2dqmjyhage", "gu2tgobzgqge", "gu3dknagenes", "gyytknbxgage", "ha2tambygage", "haytoojygege", "g43dqnbvgmge", "helloworld32", "nolansorento", "sdxtothemoon", "yzhangkuneos", "haztgmagenes", "mmmhhhh12345", "suntaolove22", "praonetaoeos", "byingyu12345", "wjlwhxosywmc", "eoschina5111", "rolronoazoro", "wsxyxbabadpy", "zjz555555555", "king3hz12345", "wangtianeos1", "fuckeos12345", "czg111555.m", "aaabb1342521", "liuyan123455", "abc222222333", "eos11michael", "fairylife333", "leeliyen3333", "zhangxinchun", "shixiwen2155", "cornucopiaok", "praxiongchen", "wmcosy123455", "zcgzcgzcg555", "qmr112233445", "351qwertyuip", "g44damzzg4ge", "maoxin111111", "asdf11223344", "aaaa123dyddp", "helloworldst", "btctoken1234", "lilingjie123", "lkr135255.tp", "gu2teobtgege", "pragztj1hnne", "guztinjxhege", "mzgw12345111", "gy2dkmjzgyge", "prawang33333", "zlh131112345", "yezengpei125", "zhanghao1233", "2wangyuxiong", "wangyang1213", "prazengling1", "gmyeosyagxia", "praw1fplpnkt", "yjiangweyeos", "xiaozha53213", "cly555555555", "huangshimin4", "lovekeos1314", "shamiaomiao1", "555wxdwxdwxd", "praziggy1234", "jimmyyu12345", "g4ytaojygyge", "nanyang12345", "e521o521s521", "lxm123321eos", "ltl521131.m", "sdkfslkdfe3d", "alberteos125", "liuping14131", "x3szfsbwdyjj", "wangyuxiong2", "hala334452cc", "igameaccount", "x3vlownfvnod", "zxiangh12345", "g43tsnbygqge", "gzheosgzheos", "aaamway12345", "chenxiang113", "aa1122334451", "ayqjxzx12345", "54321gaaaaaa", "xilouhaitang", "zhuyunhong23", "myeosburse13", "pralijun1111", "zhifangkevin", "gotothetoken", "yaojihan1.tp", "daveyboyseos", "praeos1kenwu", "pengpeng2222", "lingxin12345", "suuuuuuuuuuy", "husainkhati3", "xxcrsqh12345", "gqydgmrugege", "eoslanyumeng", "eoswangyang1", "ge3temjxg4ge", "pralxm123321", "12345asdf.tp", "qwertyuiopfl", "gentlemanner", "czl333czl333", "x5lahlimfoji", "eosairdorp11", "leeohuang521", "abcdef552211", "hanmeimeizai", "zhoujianjun1", "petercheneos", "eoschainceon", "ssl123451234", "baiziyu11.tp", "mukhsinoscar", "jinhermiaosu", "wp2erjaaw5s1", "chinaeos5222", "praumbrellas", "eosfriend121", "z1gsttlptruc", "z1ewjezkealv", "zhanglc12345", "bigdogisgood", "eoseoslqllql", "gm3dmnbqguge", "gq2demygenes", "guydonagenes", "x5pktkhiedrq", "abcddbca1234", "amethyst1234", "chengjune222", "caoqing12345", "chengjune111", "windcloud123", "z1drtxavpaev", "guzdenjvhege", "zmqhjpnkquhh", "aini1314love", "x3ezbiyquyyd", "z1jscmtxsaoz", "y1mspknsxwoi", "xiaoyuantest", "leeshiyue234", "y1cwztgcqyhu", "missinside23", "eosgamebegin", "aaa123455432", "z1jfonghqoqw", "chenyijun152", "dawoezzillah", "missuheyuecc", "guestdelacru", "jhk123454321", "12345aabcwxr", "mrluciensong", "qingfeng4321", "hkxfnzisvoex", "eosqbwahm.m", "fggssdffdsfg", "wxa123123123", "hhgffghhffgh", "shuaia111111", "kimfitrialov", "y1bpmumehbig", "jpxyzhx12345", "puuyttrrtttr", "z1hhjugjhvqo", "capcom.game", "x5dvmvwytbhw", "xlb112233445", "x5ionlwurcbo", "x5ecxnzxsvbw", "arslanstare2", "zhangyiliuya", "x5dplqzaleyl", "z1inuuwlmyui", "x5hmaiyxoiia", "x5eynfxlwtxl", "tks34fkdlove", "y1njorfqfzsc", "dujeongilvip", "ddnndd121121", "cacaopower51", "emekacollins", "rainbowdash1", "gyztaojrgyge", "hezdkobrgege", "ifeoluwanimi", "j53333333333", "marshall1111", "yyivxdtwnvzc", "wendachenggg", "z1exszqukrdq", "cmlwdsrsjyjr", "x5fkcvezfxsw", "x5kvzbpsnruh", "asdfghj13414", "x5csicwxdolk", "xu123xx321ux", "ankarapandaa", "y1oblcnayttt", "x5fjcqxkhslj", "x5ffmxljxxbe", "z1bkibxqyqri", "y1bqtqktdohy", "x5gblfmvdcli", "y1bnboopxhvt", "x3rmvqvdubym", "yyixrwqfhsjg", "y1bvigjfugbh", "x5gozpuiwftr", "x5ldingnlakl", "dengzhilong5", "y1lnztbsoesh", "perfect13524", "y1mrpppxihvf", "prau5ak31qq3", "omerayd33333", "txhtxhtxhtxh", "x5jecpbzqchb", "prahuang5325", "sunflower135", "prayydjjy123", "a1b2c3d4e5am", "aizensama112", "zhoupeng4321", "vvnnuuooppyy", "zghplaygame1", "hannibal1224", "huangxiao1in", "x5geprgyakdg", "tokenxingqiu", "abgtlbb54321", "desheng12345", "ertfgvxfjhxx", "lsq321321lsq", "gaoyixin3eos", "qhy123455432", "haowanhaowan", "jieganqiyiqu", "zorhxlvhlhph", "12345lowlowl", "undertow1234", "zhangqiangfc", "wuningwuning", "edognameis12", "x5gwkeigzqky", "kevinestoken", "eoscctveostv", "paopaopao.m", "hulishu11223", "yyccsmdpsqey", "qwsx33333333", "xiaoyu21gege", "ddffdfggfdfg", "eos2netdaoke", "zhiluoeoseos", "x3ojdkwnkwui", "y1citghxrlkx", "y1bmkutloufd", "x3qnzgixflyb", "ghgfhgggggfg", "wbyzccwtcwmd", "youngzongwei", "zhongyong321", "x5gwcvayngis", "zyblockchain", "x5lbasvlzjrr", "cynscynscyns", "david1235321", "yyimhpkidjan", "x5jzakqpxpyg", "x5folqfhhxbf", "x5eglqwpsspj", "x3olertsiowu", "z1juylyvsxux", "huang1234512", "lijianguo222", "x5ehfowcstfr", "superapple32", "eoseosdalian", "yyivooacsjbz", "x5fsvxhktybo", "x3htizbqnolu", "dexeosincome", "y1naxitycylc", "y1bgrtyvdovv", "y1cjhuipuhuj", "x5jmpgafjaas", "yyisimhccngc", "y1ntrmbvcxds", "z1sqxbcfxtxo", "x5gbqtejyofn", "chateaucanon", "dddddd222333", "z1ghuimjqwer", "yyixhidvunci", "x5ghtmbbtztm", "x5hciwlrosnl", "a52zlqt1onvr", "huanyongeos5", "ha3tomjzguge", "z1gngolcjewq", "z1gqiejblgpe", "x3dqfsuydpyv", "zpgxhzwkpfvc", "x3liopobhvkh", "y1bgfvdmzsdb", "x5jwdkpuxmoj", "x5dbgswyomhx", "app123455432", "x5khrujipsgr", "x5gmkxieivax", "y1nezfcxrkkd", "x5hcnloaszsr", "x5kxvvcfmbwk", "wanghaiqiang", "x3hxssmdflsg", "whynotwhynot", "x3ndigrtjqds", "gaundaepeace", "z1almotxlxht", "x5ipewhpqqts", "x3rpciwjvxih", "x5gwbhtxqusm", "innovation15", "x5denukvzzhp", "znqraqlmsxeu", "zhangrzoooo1", "thankgivings", "zhoupeng3125", "sxycyh123321", "wallet.bg", "haytqmbqgage", "prayiyanglyy", "x5gohjhlnaau", "kolorwewe333", "zhangshuchen", "pra125354213", "xbkbuv25pyl4", "x5djmrmrxnnk", "wangweiyizhe", "salahikoi123", "qq13141314ss", "az1314131413", "ruhutianyihi", "huangzhean12", "molujishu.tp", "yoboyoboyobo", "x5qafxvctvkz", "sadiman11223", "wang13131313", "akashsharma1", "bebasanjingt", "richardjohn2", "wwwyyylll111", "liubangdajiu", "husendehao12", "ruieos512521", "y1bjfbkmvvtg", "12345awys13z", "12345maya.tp", "pra2yangjian", "buxiangaini1", "wwwdawei1234", "mojing111111", "eoszhaolishi", "ericchai1533", "znbiopzcadea", "y1lohsxsikiq", "11211.e", "anakgurunnn3", "qiuzai111111", "praxia434142", "z1deoqxewhpx", "x5ikmrcaxixr", "x5jttwuhhdjk", "y1ndsegaponc", "x3mjwecenmqc", "nanangiaa.m", "zpvthqzhyppm", "x5etgywukfjm", "14t3actqeosd", "prajqrwfny33", "x5fkkvjobjxm", "x5gqxlmkddtg",
	"z1ieehufqyze", "x5gghxgqnois", "x5lezmkwvhef", "x5hlfjejwyqk", "xiaqunxi1234", "zozkxgclsdyi", "aimingaiming", "y1buislfeoee", "x3nxcqvydoda", "z1shfryfmwtn", "yyizmkgmikyc", "y1llkmwrcpsg", "moremoneynow", "x5qgqzdfrtmu", "y1zxnmrnbfat", "x5qenpqyotmk", "x5zryzwfltjw", "meizi1413.tp", "y1bjlamvhohq", "fgggffdsdfgg", "x5fzduguezhp", "yxj333222111", "y1nrkdonkdye", "x5hbonptwvsi", "tlraavfeqmzu", "zyymfhymfhzy", "x5formupdkbt", "yycbsdukodez", "z1dlqiiqhpnv", "x5ztnpyiaghi", "x5lebcbupqln", "x5hlqpjzxzli", "x5qfrztbjyun", "x5dhqwedoyda", "akangsulim12", "y1mvoxgdfrpr", "z1efoklpanwv", "praiseforyou", "x5jevhfjalng", "x3euldlnqmyz", "z1xaueuhjsae", "x5jmrtzcybky", "izomjwshzv21", "x5ivfnznsclk", "x5onlpxippbm", "x5hgczcrlfum", "x5otgxhpukbw", "x5elbhphwkdg", "x5hkoilszxkr", "zhangwenwu12", "z1ddnnpohmxo", "x5dqkbhyvgwk", "x5fymlbrjgsb", "jianglun1.m", "z1ifausuzjcf", "z4yqkl5d1dt4", "x4mawy3ux4r3", "y1clacmpuqzt", "x5kvenospxie", "x5kbvvcwxhwk", "y1munhjrrdbw", "x5cqvfoqcbfr", "cybchxjllyhq", "x5esyypytlwk", "j4t51unypy5q", "wizardstudio", "gu3tinrthege", "batn12551255", "1wonderwoman", "alsgetdzen12", "eos331333333", "gu3tgnjwhege", "guztaobuhege", "haydambwgege", "jesusciria11", "jiefang12345", "madridmemata", "wgyiw5unumla", "o11seventeen", "moon2million", "y1nrqdzzqwnw", "dmix5kjqfscj", "x5kdpmthbhpx", "x5lhrdfqatru", "dgddfffffffd", "z1bkdjsqzrpd", "x3vajvuvqqax", "naniiloveyou", "x5euqrddcwzu", "y1oboocbzlqt", "x5fiaizsqhic", "x3rmecqgzmsg", "wmcosy123333", "x5otxgfhnsyv", "zrrsnntzbfmy", "x5itzdusmjjx", "x3qrwlyobzir", "x5kedmfanyzx", "eosbaoyunyan", "guowentao123", "pranjwjy1234", "x5eezuirdvht", "x3mgdcthtmko", "x5iukhqrrzsa", "liguanglai12", "qisfjzpewpku", "z1iaixzwgkiz", "menyunsuro31", "hqsanlide123", "huansheng123", "zhaozongfang", "korcamper.m", "prafanchenya", "shhuuhbejjhh", "haytsmzqguge", "x5gjbngptraf", "x4woafodohud", "x3cykyojmagv", "131345qweasd", "1cr3cd4keosd", "abb123452222", "bagusanis.m", "dingsheng123", "etigeretiger", "g4ytcgenesis", "hidauathr.m", "yujiale12345", "x5qgusfirnpw", "buq2olil5bsy", "eosleciyo111", "ggfcgdxdftdt", "wzy112233.tp", "zhouhaodeeos", "iloveeos2121", "x2wwpbebpvah", "x5ilbwrioqkz", "ckvkkvjvv.m", "dabaonodata2", "gunakahff.m", "uriel1111111", "hidengass.m", "y1cbcjcufsgf", "appleoffical", "lovewarcraft", "xishanjin125", "quarterslept", "z1elcerankfd", "x5dccanngivh", "y1rutiqocnhb", "ethanxu12345", "n4cjqvy1yivi", "onw3yeuvozch", "n3javjey4bbn", "x22pnlztrqwd", "x5qujszdarce", "51heostomoon", "ckigevh4qt4h", "1ugk5tbo4esl", "wwnk1niutptj", "x5pqhyujgmjc", "adiwibowoheb", "chuanchuan14", "zfhfqskdameb", "adigotze1122", "hhojsy2oikdv", "yynyznbxjuhr", "x2rjwzfekrpk", "ha2dgobsg4ge", "lrvk4v4v5wop", "n2gziivdgz1l", "x2sbsaqdcffx", "x2ogxgrkdjnd", "x5qeoobotzqt", "qcybabpedgg4", "ryfcphchndfe", "kemurikusakr", "x2fbcppqaqdw", "x2xuwmaopgtq", "wyrdp142g4gl", "wzpbbve4y13c", "x12dbqngrsxj", "kp4c41ixfgpu", "uacktnyee3dq", "yymujoricbqf", "x3jlftyyoobc", "abcdefg12345", "huqtzbcmjznr", "kbsnof3wcph3", "y1pkygmlqgwr", "x5edcodamxey", "x4tuhhrsgzdq", "y1xasncqysyu", "az1234512345", "x5ixehywobef", "cryptorambuy", "bqzpsa4uizeo", "zcn2vrmwbnug", "jvj54payfikd", "zwq251xcshzh", "phr1hnul3dou", "x5kgezfagaad", "45qrcbedfxk5", "51v1nrzruxrz", "bvuirr1w4za3", "crzdgfpdkhtu", "xldr1e52eaj1", "thswgqzu2kvh", "vobmzttjtvkl", "zmirqkasuwgq", "lypygsqht5rn", "qlxfpgzj254e", "x3hcdqjhapae", "x5gtwgwatxpa", "abcdwen12345", "z3cnme3aidx4", "ceosssssssss", "e5zqqccxgabj", "whaleextrus1", "y4hnzndnkulm", "uc3e3gabpbfa", "lyac12h4ealx", "rusjx2rf1grx", "yybuejugsefb", "x5kbanribojh", "1binxsgfwde4", "4qchp1ss2anv", "4up5dyqybzu2", "5elbmnqqwgz1", "fxg4ba13xwyt", "gumbalgumbal", "gxppov2sa3yt", "xb3st5r5ww5j", "hg5otttafhma", "paeuamicjh4m", "y1cqftifjwyg", "x5jrjkpgyygw", "4c4sdlttegct", "z2mj2yy4qp4p", "evmsvhi1ummm", "gicqs2pnzu35", "hhbhhb123451", "hpa3lqbaqery", "muratmurat33", "qj1122334455", "ry1cfhml2i3u", "thibw4kpoyzk", "a23asvmh3ojr", "dmc5jqzwb5qm", "dmeghdzymqr5", "g25bl1wwiiwk", "vxb4xlr2xhqk", "z5sn2sr2scuu", "y1anhwtnikit", "3zugmw1gc23k", "zr1qwojditxf", "iia1k3tjuqx2", "iwowusckdff2", "tudbu5ydelec", "qyxhuri2yxcz", "uqnslmp5wjir", "y1lkwhyitqsi", "x5fpadbntder", "y1qelyfdatmq", "xishanjin522", "emknrx2f1b35", "zhaoyang1212", "vhxxkociggeu", "zxmxwqlqhxzq", "xkqwi1gmu3vw", "jxqmszthxcdp", "zvivn4nibjwo", "n5ibjjpyxtoi", "y1ncflifnwxm", "x2afzwhlcynu", "gu3dcmbsg4ge", "x5efxdlqzvxw", "x5ivfiyiggqx", "53xyrlcsbxi4", "zkk1tdbz4tkq", "tj1snkis113f", "hyutd4tn3xfu", "int1lwvpycgx", "zviulfmaz52d", "o1q142psiaya", "ymxrvvlmtux2", "qs342n4griw1", "yympaowpcjyh", "x5eywaldaeeg", "europe115522", "g1mkumshg5os", "h41m1qpgffca", "l3ju2qyf55fc", "x5gdwdsmkoyd", "y1cqqukvnfge", "y1nyomuinawy", "x4fivxjfsbwx", "x4jvwupfqzks", "1gsfla54gzph", "1s4ddcytqqhb", "bloomtodyeos", "e35ilf4txi14", "hjabcde12345", "hznuogoupcmc", "zaqzg11312xd", "jduaxmk5ltoh", "nhqrjibfuxkb", "nsn2ug4ujvlm", "o5ebyxjlvkcg", "p1rjos1fiske", "vlvtaqkzsljj", "1uu32rlhyfn4", "5f3a31an5ls3", "aceky341rwi3", "aiq2mblnnsuy", "cafccjleytwq", "zeh2tsqjlgqv", "zyfhhdaahxqc", "nwaolrmao1wr", "ozrydlwtsvyv", "rlx4nulcbfna", "snybttvrkrub", "y1zheiuvypgu", "cgpvwhgjazyg", "dbthxdieogo3", "vsugjwnt5xsi", "wpcz1a35yswr", "x5pufdgdcruh", "hjjk5j33n2sy", "yaohang12345", "ivmypigcglbp", "jmojij5ibdix", "m1xu4cl3ukid", "z22g4v1hbvpn", "z2hiwfagcfhy", "nphgcanun5jh", "oyiwppz1kuq3", "pim3xwq3l3k1", "ql1jzaoizbby", "quuitbqphrzl", "y1zwiwhdfefj", "y1mgwlikisfm", "x5ploxdceycz", "y1mjnfptofck", "5kwnqxrk1zxh", "bjkmcvmbvkuy", "bznniewah1hq", "cepoijblbomn", "djnxfrnrdnts", "wli4al1kw4fv", "ha3dmnzygage", "zhangy152152", "iohjdbutlwos", "jtcduvdgnlj1", "k2uqlqmepb1m", "w5xfvxhunmin", "kxgtfuygsxjl", "l55dhkrusu3n", "r5yexijhhwqr", "x22hepiphmwv", "y1cycjnnjwfj", "machineeeeee", "1dos1gebld1m", "2x325did5i5v", "3fiwcnnlnouf", "zzo1o3hbryz4", "acssqjuslqbf", "cerd54zbeywi", "d2vpvhheyv2q", "wangzehua123", "jiiex1lzl4xi", "k12g42jkplle", "kktrnfhyjpnu", "kugjbygcttld", "yd5kqam3xgrz", "mnrs5vpqt5hz", "n2cum5l1wab5", "pnj3elor2dr2", "r4y3sgi2wsf1", "rlgpv4gir1ur", "srjietyvyutr", "x2hhlcotmxvu", "zbwfuozczsat", "ccgf4xbaf5kx", "eocatcalehur", "fckgqbqemhj5", "fsw1bvun4tlg", "wze2njuwefas", "iqahmmy3djie", "zul2cbrhgold", "kjpaqoosipoo", "zfnnfsps4nuy", "loion1muwg4r", "xaoxgfo35u4v", "zo3h31nkvnxe", "ppnh5bkjh5od", "rvxictsotdzk", "sjrk5y515rdh", "stxkyarfjvlo", "y1nhsuvcchik", "fsq4mggg2fsm", "zndpvrf42oaz", "wc222pbmaedz", "kpppjjdklvxw", "oyus2ws12fym", "p4ctbshcigc5", "pnzr1vmawje3", "qkosfakcvuig", "rz5fyomel45h", "tagvkffbhfv2", "x4endsbojvwg", "342cmbwigpj5", "f4kcxduewcht", "gaoguoj12345", "h3szomvpwqpx", "qffrpvs4ixj4", "qxkgpssrdfsj", "rzsmmdtmxbpj", "scnmmlyuuxyp", "howisitgoing", "mcxpqmbifjuh", "4qfhpcc4gglc", "xbjtdqww23bi", "ckrpkwggnq3l", "x5541dct5zyy", "vujbitjqtp15", "hedbreiszvab", "zdrikoajyqym", "i34jlpagxngd", "k4xagnrcebkl", "mfwdpevyfkqb", "o42twj3anwzk", "ooru1upvlpu2", "pirbledczkmp", "xcbjqp42umtf", "y1cflbmqrhwp", "3euvuopleyp2", "3r1vpduk533v", "3s3pptylioaa", "4mcmparqtpeq", "agrfrr2mzmiu", "ezohbsrgtjeo", "f5r2xy3gw24e", "y2oqrmolrcxr", "lp13tj2bnhnt", "zxa3w2hbxn3w", "x2usvldzeiqr", "2s1zlzhzppia", "5wvqoxw14ybs", "bn4mmiodexkb", "z3jmcihbi5en", "unrh14kxj542", "dwjdezkopwbr", "ztqnq22rka4c", "ow1kufwu12md", "x2ntnznsczba", "x2uciwtawwiu", "imluckylucky", "1y4iqbv5gkrk", "bkd1p4atzfin", "cc4kmfpk2jrv", "eon4i3ondwyf", "jhp323sd23m3", "kpcug5xj1m4j", "lomgdw3bq1hj", "nehjz1u2xs33", "x2vdopncjrde", "x2tvcmppjjbj", "x2xnqotlnysq", "x2bduricmeub", "y1iewulczbsj", "zunmqxtewzkr", "ge3temrxgene", "chbaynb12345", "x4zvznhnvezr", "x2vhguscvgbq", "x2fgsrmesisg", "y1rqebtmshic", "x5quythwyklt", "3zcjjrekiz33", "fx2lpa3u4mme", "zl4125alpelb", "g4hfsfqqjeeo", "jvoowqasuwnp", "kfkuuw2g1jrz", "oe1bpmlyxucz", "pzxb35dchboq", "zxk5zfvfxzzm", "x2fxjtkrtuxf", "yyspflryvceg", "x2akkvnnkruk", "yyjsvdhaivef", "x5aufeszecel", "lovedappdapp", "y1lxhlkbpekm", "x5kqlvhoglkf", "x22qyfkvegpo", "y1lyswepahdp", "y1atgunrzowa", "yyphdaxsyfrf", "x4ccaxcbsoma"
	]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `eoscafekorea@active` ] };
	const myaccount = await eos.contract("eoscafekorea");
	await myaccount.clear(account_name,"4,DAB",options);
}

/*
function ttt(account,callback){
	MongoClient.connect(url, function(err, db) {
		const dbo = db.db("heroku_dg3d93pq");
		const findQuery = {account : "길막테디"};
		dbo.collection("user").findOne(findQuery, function(err, resFind){
			 if(err) throw err;
			 const sendAmount = resFind.wallet;
			
transfer("eoscafekorea","gyydoojzgige","0.0001", "test").then((output)=>{
	console.log("OK");
				 const updateQuery = {account : account};
				 const myObj = {$set : {wallet : "0"}};
				 dbo.collection("user").updateOne(updateQuery, myObj,function(err, resFind){
					 if(err) throw err;
					 db.close();
					 callback("success");
				 }); //end of updateOne

}).catch((err)=>{
	console.log("transfer error");
	db.close();
	callback("success");
});
		});
	});
	
}
*/

//ttt("길막테디", (result) => {console.log(result)});





/*
eos.transaction(tr => {
	  tr.buyrambytes({
    payer: 'lghackerthon',
    receiver: 'lghackerthon',
    bytes: 400*1024
  })
});
*/


console.log("calling delete");
function deleteLoop(idx){
	console.log("before calling index string " + idx);
	deleteAccount(accountString[idx]);	
	idx = idx + 1;
	if(idx > 2000){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,1300,idx)
	
}
			
setTimeout(deleteLoop,1300, 1);

var static = require('node-static');
var file = new static.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 8080);
			
//deleteAccount("eoscafekorea");
/*
accountString.forEach(function (item, index, array) {
  //console.log(item, index)
	deleteAccount(item);
})
return;
*/
			
			

//wasm = fs.readFileSync(wasmUrl);  
//abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
//eos.setcode("eoscafekorea", 0, 0, wasm) // @returns {Promise}
//eos.setabi("eoscafekorea", JSON.parse(abi)) // @returns {Promise}

/*
async function getTransaction(){
	const transaction = await eos.getTransaction("94edddbaaa0a98872f6300768e6321effe5ccc91a3834eddfad9d59ded9db2d7")
	//console.log(transaction);
	//console.log(transaction.trx);
	console.log(transaction.trx.trx.actions[0].data.quantity);
}

//setTimeout(getTransaction, 3000);
//getTransaction();

async function createToken(account){
  await eos.transaction(account, myaccount => {

  // Create the initial token with its max supply
  // const options = {authorization: 'myaccount'} // default
    //500,000,000 is the base. Annual inflation is 5% to 5 years. Others will be burned.
  const options = { authorization: [ `taketooktook@active` ] };
  myaccount.create(account, '10000000000.0000 TOOK', options)//, options)

  // Issue some of the max supply for circulation into an arbitrary account
  myaccount.issue(account, '10000000000.0000 TOOK', 'issue', options)
})

  //const balance = await eos.getCurrencyBalance(account, account, 'DAB')
  //console.log('Currency Balance', balance)
}


async function transfer(from, to, amount){
	const myaccount = await eos.contract(from);
	await myaccount.transfer(from, to, amount + " " + "BEANS","");
}



//createToken("taketooktook");

if(process.env.dist != "true")
	return;

eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
	console.log("thebeantoken balance", result);
});

eos.getCurrencyBalance("eoscafekorea", "eoscafekorea", 'DAB').then(function(result){
	console.log("thebeantoken balance", result);
});

//transfer("eoscafekorea","awesometeddy","1000.0000");
               



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


                  
                                                                                                                     
                                                                                                                     
