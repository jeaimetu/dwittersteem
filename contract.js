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
	"gi3tqnbzgene", "gi3tqnjxhege", "gi3tqnrvhege", "gi3tqnrwhege", "gi3tqobwgege", "gi3tqobxgege", "gi3tqojvhage", "gi3tsmbzgene", "gi3tsmjygege", "gi3tsmrvguge", "gi3tsnjqhage", "gi3tsobtgage", "gi4damjxhage", "gi4damrtgage", "gi4damzthage", "gi4damzxguge", "gi4danbugige", "gi4daobvgene", "gi4daojvgige", "gi4dcmbvgene", "gi4dcmjtgqge", "gi4dcmrqgqge", "gi4dcmrvhage", "gi4dcmzqgage", "gi4dcmzrhage", "gi4dcmzyhege", "gi4dcnbxgege", "gi4dcnjshage", "gi4dcnjugqge", "gi4dcnjvgige", "gi4dcnjvhage", "gi4dcnrsgage", "gi4dcnrugmge", "gi4dcnrvgige", "gi4dcnrygige", "gi4dcojugmge", "gi4dembtgige", "gi4demjzg4ge", "gi4demrqguge", "gi4demrrgage", "gi4demrrgmge", "gi4demrygmge", "gi4demzxgige", "gi4denjtgene", "gi4denjxgage", "gi4denrxg4ge", "gi4denzugqge", "gi4deobxgige", "gi4deojrgyge", "gi4deojwgyge", "gi4dgmjxg4ge", "gi4dgmrqgmge", "gi4dgmrsgage", "gi4dgmzqgage", "gi4dgmzrg4ge", "gi4dgmzygege", "gi4dgmzygige", "gi4dgnigenes", "gi4dgobrgqge", "gi4dgobwguge", "gi4dgojvgyge", "gi4dimbtgene", "gi4dimjyg4ge", "gi4dimjzgene", "gi4dimrrgene", "gi4dimrwgmge", "gi4dimrygige", "gi4dinbqhage", "gi4dinbvhege", "gi4dinbyg4ge", "gi4dinbzhege", "gi4dinjug4ge", "gi4diojsgege", "gi4diojvguge", "gi4diojxguge", "gi4dknjuguge", "gi4dknjwgqge", "gi4dknjwgyge", "gi4dknrxhage", "gi4dknzqgene", "gi4dknzvhege", "gi4dkobrhage", "gi4dkojrgqge", "gi4dkojugyge", "gi4dmmbxgige", "gi4dmmjqhege", "gi4dmmjtgage", "gi4dmmjuhage", "gi4dmmrsgyge", "gi4dmmzvgige", "gi4dmmzxgige", "gi4dmnbxgqge", "gi4dmnbzgige", "gi4dmnbzhege", "gi4dmnjsg4ge", "gi4dmnrrg4ge", "gi4dmnrvhage", "gi4dmnzzgage", "gi4dmojyguge", "gi4dombsgyge", "gi4domjugege", "gi4domrrgage", "gi4domrrguge", "gi4domzqg4ge", "gi4domzqgage", "gi4domzxgage", "gi4domzygqge", "gi4donztgene", "gi4donzxgege", "gi4doobqhage", "gi4doobugene", "gi4doobuguge", "gi4doobygmge", "gi4doobzg4ge", "gi4doojthage", "gi4dqmbzgege", "gi4dqmrtgage", "gi4dqmruhage", "gi4dqmrvgige", "gi4dqmzshage", "gi4dqmzvhege", "gi4dqmzwgage", "gi4dqnrsgene", "gi4dqnrzgyge", "gi4dqnzqgage", "gi4dsmbxgige", "gi4dsmrthege", "gi4dsmzsgage", "gi4dsmzshage", "gi4dsmzzhege", "gi4dsnbwgqge", "gi4dsnjyhege", "gi4dsnrrgmge", "gi4dsnruhege", "gi4dsnzwgige", "gi4dsobug4ge", "gi4dsojqgage", "gi4dsojuhage", "gi4dsojuhege", "gi4tambwgege", "gi4tambxgige", "gi4tamjygqge", "gi4tamrrhege", "gi4tamrygmge", "gi4tamrzhage", "gi4tanbrgage", "gi4tanjqhage", "gi4tanjugmge", "gi4tanjygege", "gi4tanrqhege", "gi4tanrrgage", "gi4tanrwguge", "gi4tanrzgege", "gi4tanzygmge", "gi4taobrhege", "gi4taojsgqge", "gi4taojtgyge", "gi4taojvhege", "gi4tcmbugige", "gi4tcmbzgqge", "gi4tcmjsguge", "gi4tcmrqgege", "gi4tcmrrgage", "gi4tcmzzgene", "gi4tcnjtgige", "gi4tcnjxhage", "gi4tcnjyg4ge", "gi4tcnjygige", "gi4tcnjzguge", "gi4tcnrqgege", "gi4tcnrygige", "gi4tcnryhage", "gi4tcnzwhege", "gi4tcnzxgige", "gi4tcobvgyge", "gi4tcobwgmge", "gi4tcoigenes", "gi4tcojqhage", "gi4tcojtguge", "gi4tcojugyge", "gi4tcojxgege", "gi4tembtgege", "gi4tembvgyge", "gi4tembyguge", "gi4temrtguge", "gi4temrygage", "gi4temzrguge", "gi4tenjzgage", "gi4tenrsg4ge", "gi4tenzugage", "gi4teobqgige", "gi4teobwhage", "gi4teobzg4ge", "gi4teojxhege", "gi4teojzgmge", "gi4tgmbqgyge", "gi4tgmjygage", "gi4tgmzrgyge", "gi4tgnbqhege", "gi4tgnbsgege", "gi4tgnbugene", "gi4tgnbygege", "gi4tgnjrgege", "gi4tgnjsgage", "gi4tgnjygige", "gi4tgnrrgyge", "gi4tgnrsgyge", "gi4tgnrvgqge", "gi4tgnzxgage", "gi4tgobrgige", "gi4tgobvgmge", "gi4tgobwgyge", "gi4tgobxgage", "gi4tgojtgage", "gi4tgojzgage", "gm3dmnrygige", "gi4timbzguge", "gi4timjugqge", "gi4timjyhage", "gi4timjzhege", "gi4timzrgmge", "gi4timzthege", "gi4timzuguge", "gi4tinbrhege", "gi4tinbygyge", "gi4tinjzgege", "gi4tinrsgige", "gi4tinrygege", "gi4tinzyhage", "gi4tiobtgyge", "gi4tiobxhage", "gi4tiojygmge", "gi4tkmbtgege", "gi4tkmjug4ge", "gi4tkmjzgqge", "gi4tkmrugage", "gi4tkmztgige", "gi4tknagenes", "gi4tknbqgene", "gi4tknjqhege", "gi4tknjsguge", "gi4tknrrgqge", "gi4tknrvgige", "gi4tknzwgege", "gi4tknzxgqge", "gi4tknzzguge", "gi4tkobzguge", "gi4tkojvguge", "gi4tmmbrgyge", "gi4tmmbxgene", "gi4tmmjrg4ge", "gi4tmmrxhege", "gi4tmmzqgmge", "gi4tmmzsgage", "gi4tmnzrhage", "gi4tmnzwhage", "gi4tmobqhege", "gi4tmojug4ge", "gi4tombugene", "gi4tomjqhage", "gi4tomrtguge", "gi4tomztgage", "gi4tomzvgyge", "gi4tonbwhege", "gi4tonjqgyge", "gi4tonrzhage", "gm3dmobzgmge", "giytanjyguge", "giytaobrhage", "giytaojugege", "giytaojzgyge", "giytcmbygage", "giytcmbzg4ge", "giytcmbzgege", "giytcmjtgqge", "giytcmjygqge", "giytcmjyhage", "giytcmrygyge", "giytcmzxgqge", "giytcnbzgene", "giytcnbzguge", "giytcnjuguge", "giytcnrxg4ge", "giytcnygenes", "giytcnzqgage", "giytcnztgege", "giytcnzygyge", "giytcobqhege", "gm3domzrgige", "giytcojsgege", "giytcojvgige", "giytcojygege", "giytemrwhege", "giytemzxgege", "giytenbrgige", "giytenbwgige", "giytenjxgyge", "giytenrsgmge", "giyteobtgmge", "giyteobvgqge", "giyteobzhage", "giyteobzhege", "giyteoigenes", "giytgmzsgige", "giytgnbqgage", "giytgnbtgene", "giytgnzrguge", "giytgnztgqge", "giytgnzwgqge", "giytgnzzgyge", "giytgoagenes", "giytgojtgyge", "giytgojugige", "giytimbug4ge", "giytimbzgyge", "giytimrsgage", "giytimrvgyge", "giytimrzgige", "giytinbvgene", "giytinbxgige", "giytinjrgene", "giytinrtgqge", "giytinrvgage", "giytinzzgage", "giytiobzgege", "giytiojtgige", "giytiojvgege", "giytkmbtgene", "giytkmbvguge", "giytkmztg4ge", "giytknjqgage", "giytknjtgqge", "giytknrzguge", "giytknztgyge", "giytkobsgene", "giytkobugyge", "giytkojtgmge", "giytmmbqgyge", "giytmmbthege", "giytmmbugene", "giytmmigenes", "giytmnztgege", "giytmobrgage", "giytmobwgege", "giytmojzgene", "giytombqguge", "giytomjyguge", "giytonruguge", "giytonygenes", "giytonzvgqge", "giytoobygage", "giytoobyhege", "giytoojqgmge", "giytoojygqge", "giytqmjwg4ge", "giytqmrsguge", "giytqmzxhage", "giytqnjqhege", "giytqnzugene", "giytqobthage", "giytqojwgyge", "giytsmbygage", "giytsmjvhege", "giytsmrvhege", "giytsmrzgyge", "giytsnrwhege", "giytsobzhege", "giytsojyguge", "gizdambqguge", "gizdambrgene", "gizdambsgyge", "gizdamjsguge", "gizdamrxgqge", "gizdanbshege", "gizdanbvgyge", "gizdanrqgmge", "gizdanrrgmge", "gizdanrtgege", "gizdanrthege", "gizdanrvguge", "gizdanzugyge", "gizdanzxgege", "gizdaobsguge", "gizdaobtgige", "gizdaobwgege", "gizdaojqg4ge", "gizdaojug4ge", "gizdaojyhage", "gizdcmzshage", "gizdcnjsguge", "gizdcnjxgqge", "gizdcnrrgege", "gizdcnzuhage", "gizdcojsgage", "gizdcojygige", "gizdcojygmge", "gizdcojzg4ge", "gizdemjxhage", "gizdemzvgege", "gizdenjuhege", "gizdenrtgmge", "gizdenzsgege", "gizdeobwgige", "gizdeobygqge", "gizdeobzgmge", "gizdgmzqhage", "gizdgmzvhege", "gizdgnbxhege", "gizdgnjxgage", "gizdgnrzhage", "gizdgobqgege", "gizdgobrhage", "gizdgobzgmge", "gizdgojzguge", "gizdimbuhage", "gizdimbwgage", "gizdimjqhage", "gizdimjrgage", "gizdinjsgmge", "gizdinjugege", "gizdinjugqge", "gizdinjxgage", "gizdinrxgege", "gizdinrzgage", "gizdiobwguge", "gizdiobwhege", "gizdiobyhege", "gizdiojqgene", "gizdiojtgqge", "gizdiojxgege", "gizdkmjrhege", "gizdkmjvhege", "gizdkmjwgige", "gizdkmrqg4ge", "gizdkmrthege", "gizdkmrxhage", "gizdkmrygqge", "gizdkmryhage", "gizdkmzqg4ge", "gizdknbrgqge", "gizdknbsgmge", "gizdknbzgmge", "gizdknqgenes", "gizdknrwgene", "gizdknrzg4ge", "gizdknzqgage", "gizdkojvhage", "gizdmmbrhage", "gizdmmbwhage", "gizdmmbxhage", "gizdmmjrguge", "gizdmmjshage", "gizdmmjyhage", "gizdmmrrgqge", "gizdmmrxgqge", "giztmnbvguge", "gizdmobqgege", "gizdmobsg4ge", "gizdmobuhage", "gizdmobvgige", "gizdmobxguge", "gizdmojrgmge", "gizdmojugqge", "gizdmojygyge", "gizdombsgage", "gizdombsgege", "gizdombuguge", "gizdomryhege", "gizdomzrhege", "gizdonrshege", "gizdonzrgqge", "gizdoobvg4ge", "gizdqmrtgege", "gizdqnjqhage", "gizdqnjtg4ge", "gizdqnzrgige", "gizdqoagenes", "gizdqobqgyge", "gm2danzrgege", "gizdqobwgege", "gizdqobxgene", "gizdqobxguge", "gizdsmrsgene", "gizdsnzzhege", "giztambygage", "giztamjrhege", "giztamjyhage", "giztamzxgage", "giztanbuhage", "giztanbvgige", "giztanbxgige", "giztanbyhage", "giztanjsgyge", "giztanrshage", "giztaobsg4ge", "giztaobwg4ge", "giztaobxgene", "giztaobyguge", "giztcmbygyge", "giztcmrvgmge",
	"giztkojvgyge", "giztkojygqge", "giztmmjsgyge", "giztmmjxg4ge", "giztmmruguge", "giztmmryg4ge", "giztmnbsgige", "giztmnbvguge", "giztmnbwgyge", "giztmnjygyge", "giztmnztgage", "giztmojrgmge", "giztmojwgqge", "giztombvgmge", "giztomzrguge", "giztomzzg4ge", "giztomzzgige", "giztonbygyge", "giztonjugqge", "giztonjxgege", "giztonrtgqge", "giztonzqgage", "giztonzxgmge", "giztooagenes", "giztqmbsg4ge", "giztqmbtgyge", "giztqmjqgqge", "giztqmjrg4ge", "giztqmjzguge", "giztqmrxhege", "giztqmzsgege", "giztqmztgqge", "giztqnbzgqge", "giztqnjyguge", "giztqnrrgqge", "giztqnrzg4ge", "giztqnzrgyge", "giztqnzxgqge", "giztqojugige", "giztsmzzhage", "giztsnzshege", "giztsnzvgene", "giztsobqgege", "giztsobqgige", "glasswalker1", "glennjrmyeos", "gm2dambqguge", "gm2damjvg4ge", "gm2damrwhege", "gm2damzsgqge", "gm2damzzgqge", "gm2danjxgage", "gm2danrsguge", "gm2danzqgmge", "gm2danzrgege", "gm2daobxg4ge", "gm2daojqhege", "gm2daojrgmge", "gm2dcmbxgege", "gm2dcmjwgege", "gm2dcmrugige", "gm2dcmzrhege", "gm2dcmzvgage", "gm2dcnbzgyge", "gm2dcnjxgige", "gm2dcnrvhege", "gm2dcnzsg4ge", "gm2dcnzxgqge", "gm2dcobyguge", "gm2dcojzgyge", "gm2dembvhage", "gm2demjtgqge", "gm2demrtguge", "gm2demrvg4ge", "gm2denbxhage", "gm2deojwgqge", "gm2dgmbsgage", "gm2dgmzqhege", "gm2dgnjqgmge", "gm2dgnjrgqge", "gm2dgnjthege", "gm2dgobugage", "gm2dgobuguge", "gm2dimbrguge", "gm2dimbvg4ge", "gm2dimrrgqge", "gm2dimryg4ge", "gm2dimzrgige", "gm2dimzxg4ge", "gm2dinbvguge", "gm2dinbxg4ge", "gm2dinjvgage", "gm2dinzuhage", "gm4deobugmge", "gm2dinzzgqge", "gm2diobrhage", "gm2diobuguge", "gm2dkmbug4ge", "gm2dkmrqgyge", "gm2dkmzvgage", "gm2dkmzxgmge", "gm2dkmzzgqge", "gm2dknbtg4ge", "gm2dknbugyge", "gm2dknbwgige", "gm2dknjsgige", "gm2dknjvgige", "gm2dknryhege", "gm2dknzxg4ge", "gm2dknzzhege", "gm2dkobrgyge", "gm2dmmrqhege", "gm2dmmryg4ge", "gm2dmnrtgmge", "gm2dmnrxguge", "gm2dmoagenes", "gm2dmobyguge", "gm2dmojqgage", "gm2domagenes", "gm2dombxguge", "gm2donbtg4ge", "gm2donzygige", "gm2doobtgage", "gm2doobwhage", "gm2doojqgige", "gm2doojygyge", "gm2dqmbsgyge", "gm2dqmbxgqge", "gm2dqmjvhege", "gm2dqmjxgqge", "gm2dqmqgenes", "gm2dqmrsguge", "gm2dqmzugqge", "gm2dqnjzgage", "gm2dqobvhage", "gm2dqobygmge", "gm2dqojxgige", "gm2dsmbsgmge", "gm2dsmjtgage", "gm2dsmjug4ge", "gm2dsmrrgege", "gm2dsmrrgige", "gm2dsmzxgyge", "gm2dsnbrguge", "gm2dsnbuguge", "gm2dsnrxhage", "gm2dsnzsguge", "gm2dsnztgmge", "gm2dsobxgage", "gm2dsojshage", "gm2dsojug4ge", "gm2dsojxhege", "gm2tambvguge", "gm2tamrsgqge", "gm2tamrugmge", "gm2tamzthage", "gm2tanjuhege", "gm2tanzugige", "gm2taobrgmge", "gm2taobyhege", "gm2tcmbvg4ge", "gm2tcmbwhage", "gm2tcnbtg4ge", "gm2tcnjvgmge", "gm2tcnrshege", "gm2tcobtg4ge", "gm2tcobuhage", "gm2tcobyhage", "gm2tcojygqge", "gm2temjsgyge", "gm2temjyhege", "gm2temrtguge", "gm2temruguge", "gm2temrvgege", "gm2temrzguge", "gm2temzwguge", "gm2tenbvhege", "gm2tenjxg4ge", "gm2tenjxgage", "gm2tenjzgege", "gm2tenjzgyge", "gm2tenruhege", "gm2tenrvgyge", "gm2tenrzgege", "gm2teojqhege", "gm2teojrgqge", "gm2teojrhege", "gm2teojtgyge", "gm2teojxhege", "gm2tgmbtgqge", "gm2tgmbzgyge", "gm2tgmjsgyge", "gm2tgmjshage", "gm2tgmjzguge", "gm2tgmrqgige", "gm2tgmrygige", "gm2tgmzrguge", "gm2tgnzzgqge", "gm2tgobthage", "gm2tgojzgmge", "gm2timbwgyge", "gm2timjrgmge", "gm2timygenes", "gm2timzqgqge", "gm2timzrgige", "gm2tinbvgqge", "gm2tinbwgage", "gm2tinjrgige", "gm2tinzxgyge", "gm2tioagenes", "gm2tiojsgmge", "gm2tiojxgege", "gm2tkmjtgmge", "gm2tkmrshage", "gm2tkmzuguge", "gm2tknbwgyge", "gm2tknrugige", "gm2tknrvgyge", "gm2tknzqgage", "gm2tkobug4ge", "gm2tkobugege", "gm2tmmbygage", "gm2tmmjwhege", "gm2tmmjzgege", "gm2tmmrrg4ge", "gm2tmnbxgage", "gm2tmnjthage", "gm2tmnzvgige", "gm2tmnzwgege", "gm2tmnzxgige", "gm2tmojugqge", "gm2tombshege", "gm2tombvhage", "gm2tomrshege", "gm2tonbvgyge", "gm2tonjrgige", "gm2tonjtgene", "gm2tonjwgege", "gm2tonrxgege", "gm2tonrygene", "gm2toobtg4ge", "gm2toobyguge", "gm2toojvhege", "gm2tqmigenes", "gm2tqmjxgene", "gm2tqmjyhage", "gm2tqmrqgege", "gm2tqmrxhege", "gm2tqnbxgage", "gm2tqnjqgqge", "gm2tqnjygege", "gm2tqnjzgene", "gm2tqnygenes", "gm2tqnzuhage", "gm2tqobtgqge", "gm2tqojqhege", "gm2tqojrgege", "gm2tsmbvgege", "gm2tsmjugqge", "gm2tsmryguge", "gm2tsmrzgene", "gm2tsmzvgyge", "gm2tsmzyg4ge", "gm2tsmzzgege", "gm2tsmzzguge", "gm2tsnrvgyge", "gm2tsnzrhage", "gm2tsobygmge", "gm2tsojtgene", "gm2tsojvgene", "gm3dambugige", "gm3damjvguge", "gm3damjzhage", "gm3damrtgmge", "gm3danbsgqge", "gm3danbshege", "gm3danjtguge", "gm3danjyhage", "gm3danrvhege", "gm3danzugene", "gm3danzvgage", "gm3daobug4ge", "gm3daobvhege", "gm3daobygege", "gm3daojsgage", "gm3daojtg4ge", "gm3daojvg4ge", "gm3dcmzzgige", "gm3dcnjxgqge", "gm3dcnzrgmge", "gm3dcnzygege", "gm3dcnzzguge", "gm3dcobsgmge", "gm3dcobtguge", "gm4dcojsgene", "gm3dembsgige", "gm3dembygege", "gm3demzygige", "gm3demzyhage", "gm3denbtgige", "gm3denbwguge", "gm3denjwgage", "gm3deobygege", "gm3deobzhage", "gm3dgmbyguge", "gm3dgmjyhage", "gm3dgmrvhage", "gm3dgmzxgige", "gm3dgnbsgqge", "gm3dgnbzgqge", "gm3dgnjwg4ge", "gm3dgnjzgage", "gm3dgnrwgyge", "gm3dgnztgige", "gm3dgnztguge", "gm3dgobzgage", "gm3dgoigenes", "gm3dimjshege", "gm3dimrxguge", "gm3dimzqhage", "gm3dinagenes", "gm3dinbqgige", "gm3dinbxhage", "gm3dinbygene", "gm3dinrsg4ge", "gm3dinrwhege", "gm3dinztgmge", "gm3dinzwgage", "gm3diobvgyge", "gm3diobwgmge", "gm3diojvg4ge", "gm3dkmbugene", "gm3dkmbvgqge", "gm3dkmbwhege", "gm3dkmjrgige", "gm3dkmjwgmge", "gm3dkmrwgyge", "gm3dkmrxgmge", "gm3dkmzsgyge", "gm3dkmztgage", "gm3dknbthege", "gm3dknbxgyge", "gm3dknjrgage", "gm3dknrygmge", "gm3dknzrgage", "gm3dknzvgege", "gm3dknzyg4ge", "gm3dkojsgqge", "gm3dmmjqgene", "gm3dmmjrgage", "gm3dmmjvhege", "gm3dmmrrhege", "gm3dmmrzgige", "gm3dmmzyhege", "gmytcmbwgage", "gm3dmnbrgmge", "gm3dmnbxgene", "gm3dmnrrgige", "gm3dmnrygige", "gm3dmnzqgige", "gm3dmnzshege", "gm3dmobsgege", "gm3dmobzgmge", "gm3dmojwg4ge", "gm3dombrg4ge", "gm3dombrgage", "gm3dombshege", "gm3domjxhage", "gm3domrqhege", "gm3domzrgige", "gm3domztgmge", "gm3domzug4ge", "gm3domzvgige", "gm3domzzgege", "gm3donjtgage", "gm3donrrgege", "gm3donzqgqge", "gm3donzvguge", "gm3donzwguge", "gm3doobqgene", "gm3doobtg4ge", "gm3dqmbvgige", "gm3dqmbzgege", "gm3dqmjugyge", "gm3dqmrxgege", "gm3dqnjwgige", "gm3dqnjygqge", "gm3dqnzvgmge", "gm3dqojwgege", "gm3dsmbugige", "gm3dsmbwgyge", "gm3dsmjxgyge", "gm3dsmjyguge", "gm3dsmrrgage", "gm3dsnbqguge", "gm3dsnbxgage", "gm3dsnrtgige", "gm3dsnruguge", "gm3dsnrzhege", "gm3dsnzwgage", "gm3dsojwgage", "gm3tamrygyge", "gm3tamygenes", "gm3tamzvgege", "gm3tanbygige", "gm3tanbygyge", "gm3tanrwgmge", "gm3tanzugqge", "gm3tanzwgmge", "gm3taobvg4ge", "gm3taobygige", "gm3taobzhage", "gm3taojrguge", "gm3taojsgage", "gm3tcmbqgene", "gm3tcmbxgige", "gm3tcmjsgmge", "gm3tcmjwgmge", "gm3tcmzsgage", "gm3tcmzxhege", "gm3tcnbtgege", "gm3tcnbugage", "gm3tcnbvg4ge", "gm3tcnbxgige", "gm3tcnjqhage", "gm3tcnjwgage", "gm3tcnrzgege", "gm3tcnzqg4ge", "gm3tcnzxgige", "gm3tcobqgege", "gm3tcobqhege", "gm3tcobxgage", "gm3tcojqhege", "gm3temjvgage", "gm3temrrgage", "gm3temzzgqge", "gm3temzzgyge", "gm3tenbvg4ge", "gm3tenjqhege", "gm3tenjzguge", "gm3tenrugene", "gm3tenzqgene", "gm3teojthage", "gm3teojwgige", "gm3tgmbuhege", "gm3tgmbxgmge", "gm3tgmbygege", "gm3tgmbyhage", "gm3tgmrvgage", "gm3tgmzsgege", "gm3tgmzxhage", "gm3tgnjzhage", "gm3tgnrvgige", "gm3tgnrwhege", "gm3tgnrxgige", "gm3tgnzsgyge", "gm3tgnzthage", "gm3tgnzuhage", "gm3tgobuhage", "gm3tgojtgage", "gm3tgojugige", "gm3timrthage", "gm3timrzg4ge", "gm3timzsgige", "gm3timzsguge", "gm3tinbshege", "gm3tinbugene", "gm3tinzvg4ge", "gm3tiobqg4ge", "gm3tiojqgage", "gm3tiojsgqge", "gm3tkmbqg4ge", "gm3tkmbrgene", "gm3tkmbsg4ge", "gm3tkmzygyge", "gm3tknbzgmge", "gm3tknrrgqge", "gm3tknrrguge", "gm3tknztg4ge", "gm3tknzvgage", "gm3tknzwgige", "gm3tkobqhage", "gm3tkobrgqge", "gm3tkobwgqge", "gm3tmmbqgene", "gm3tmmbzgene", "gm3tmmjrgige", "gm3tmmjrhage", "gm3tmmjsgene", "gm3tmmzrgqge", "gm3tmnbxgene", "gm3tmnbzgmge", "gm3tmnjqhage", "gm3tmnrxgage", "gm3tmnrxgyge", "gm3tmojqgyge", "gm3tomjqgmge", "gm3tomjxgege", "gm3tomrqgige", "gm3tomrrgqge", 
	"gm3tomjxgege", "gm3tomrqgige", "gm3tomrrgqge", "gm3tomzugyge", "gm3tomzvgege", "gm3tomzzguge", "gm3tonbqgqge", "gm3tonjrg4ge", "gm3tonjvgage", "gm3tonjxgmge", "gm3toobrgige", "gm3toobrhage", "gm3toojwgene", "gm3tqmbygage", "gm3tqmbzhage", "gm3tqmjugyge", "gm3tqmrtgmge", "gm3tqmrxhage", "gm3tqmrzguge", "gm3tqmzsgige", "gm3tqmzwg4ge", "gm3tqnbtguge", "gm3tqnjvgmge", "gm3tqnrvgige", "gm3tqnrwguge", "gm3tqobtgene", "gm3tsmbqhage", "gm3tsmbrgige", "gm3tsmjugege", "gm3tsnbqgage", "gm3tsnbygmge", "gm3tsnjrgege", "gm3tsnjsgage", "gm3tsnrqgene", "gm3tsnzrhage", "gm3tsnztguge", "gm3tsobqgmge", "gm3tsobsgyge", "gm3tsobyguge", "gm4damjxg4ge", "gm4damrsgage", "gm4damzxgene", "gm4danbwhage", "gm4danjsgmge", "gm4danrugage", "gm4daobrgege", "gm4daobxgqge", "gm4daojrgege", "gm4dcmjsguge", "gm4dcmrvg4ge", "gm4dcmrvguge", "gm4dcmzqgyge", "gm4dcmzrgqge", "gm4dcmzug4ge", "gm4dcmzxgege", "gm4dcnagenes", "gm4dcnbsgene", "gm4dcnbwgege", "gm4dcnrzg4ge", "gm4dcnzwhege", "gm4dcojsgene", "gm4dcojzgege", "gm4demzvgene", "gm4demzygyge", "gm4denigenes", "gm4denztgene", "gm4denzwgige", "gm4deobrgyge", "gm4deobugmge", "gm4deojrhage", "gm4deojxhege", "gm4dgmjyhage", "gm4dgmrwgqge", "gm4dgnbxgyge", "gm4dgnbzhege", "gm4dgnjzgege", "gm4dgnrzhege", "gm4dgojzgmge", "gm4dimbqg4ge", "gm4dimbqgmge", "gm4dinzrgige", "gm4dinzshage", "gm4diobtg4ge", "gm4dkmbqg4ge", "gm4dkmrygene", "gm4dknjzgmge", "gm4dknrqgene", "gm4dknzrgage", "gm4dkobrgqge", "gm4dkojugege", "gm4dmmbvgmge", "gm4dmmrqhage", "gm4dmmrrgene", "gm4dmmrzgene", "gm4dmmzrgyge", "gm4dmmzxhage", "gm4dmmzzgmge", "gm4dmnjvhege", "gm4dmnjyg4ge", "gm4dmobwhege", "gm4dmobzhage", "gm4dmojtgige", "gm4dmojugmge", "gm4dogenesis", "gm4domjuguge", "gm4domrugige", "gm4domzthege", "gm4donbtgege", "gm4donbvhege", "gm4donigenes", "gm4donjqgene", "gm4donjvguge", "gm4donjzhage", "gm4donzugene", "gm4donzygqge", "gm4donzzgige", "gm4dqmzqhege", "gm4dqnrxgene", "gm4dqobqgage", "gm4dqojqgage", "gm4dqojsgege", "gm4dqojuhage", "gm4dsmbrg4ge", "gm4dsmigenes", "gm4dsmjuguge", "gm4dsmjwgige", "gm4dsmrvgege", "gm4dsmzrhege", "gm4dsmzygmge", "gm4dsnbwgege", "gm4dsnjugene", "gm4dsnzvhage", "gm4tambwgege", "gm4tamjqgage", "gm4tamjxhage", "gm4tamrsgqge", "gm4tamrwgage", "gm4tanbyguge", "gm4tanjtgige", "gm4tanjxhage", "gm4taobsg4ge", "gm4taojvhage", "gm4tcnjvgmge", "gm4tcnzsg4ge", "gm4tcnztgene", "gm4tcnzugqge", "gm4tcnzzgage", "gm4tcobxguge", "gm4temjxg4ge", "gm4temjzgige", "gm4temrugige", "gm4temzyhege", "gm4tenbshege", "gm4tenbtgege", "gm4tenbugege", "gm4tenbwg4ge", "gm4tenygenes", "gm4teoagenes", "gm4teojxhege", "gm4tgmjsgmge", "gm4tgmrqgege", "gm4tgmrtguge", "gm4tgmrug4ge", "gm4tgmrugqge", "gm4tgmrxgyge", "gm4tgojyguge", "gm4timbugmge", "gm4timbzgyge", "gm4timjugige", "gm4timygenes", "gmzdomztgmge", "gm4tinjrgqge", "gm4tinjvgage", "gm4tinjvgene", "gm4tinrzgege", "gm4tinzug4ge", "gm4tinzzgqge", "gm4tiobtgqge", "gm4tiobxguge", "gm4tiojqgmge", "gm4tiojxgege", "gm4tkmbqgege", "gm4tkmbygyge", "gm4tkmzrgqge", "gm4tkmzvg4ge", "gm4tknbqgyge", "gmzdmmjtgyge", "gm4tknigenes", "gm4tknrsgyge", "gm4tknrtgige", "gm4tknrwhage", "gm4tknzvg4ge", "gm4tkojrgene", "gm4tkojyhage", "gm4tmmbygqge", "gm4tmmzzhege", "gm4tmnbugyge", "gm4tmnbzhege", "gm4tmnryguge", "gm4tmojshage", "gm4tmojwgmge", "gm4tombqgyge", "gm4tombxgene", "gm4tomrrgmge", "gm4tomzrgqge", "gm4tomzzgage", "gm4tonjqgene", "gm4tonjthage", "gm4tonjvgege", "gm4tonzug4ge", "gm4toobqgene", "gm4toojqgene", "gm4toojqgige", "gm4toojsgqge", "gm4tqmjzgage", "gm4tqmzxgqge", "gm4tqnbsgage", "gm4tqnbsgene", "gm4tqnjvguge", "gm4tqnzqhege", "gm4tqnzvgege", "gm4tqnzwhege", "gm4tqobvgene", "gm4tqojsgmge", "gm4tqojygige", "gm4tsmbtgqge", "gm4tsmjtgige", "gm4tsmzugyge", "gm4tsnbqgige", "gm4tsnbvhage", "gm4tsnjrgige", "gm4tsnjvgige", "gm4tsnjwhege", "gm4tsnzzgyge", "gm4tsobqgyge", "gm4tsobwgege", "gm4tsobzgmge", "gm4tsojqgage", "gm4tsojvgege", "gm4tsojyg4ge", "gmydambygmge", "gmydamzqgqge", "gmydamzug4ge", "gmydamzuguge", "gmydanzzgene", "gmydcmrxgene", "gmydcojrguge", "gmydcojxgqge", "gmydemjrg4ge", "gmydemjvgyge", "gmydemrsgege", "gmydemrxgyge", "gmydenjtgqge", "gmydgmbygene", "gmydgmzwhege", "gmydgnbugage", "gmydgnrsgege", "gmydgnruhege", "gmydgnzvhege", "gmydgnzzhage", "gmydgobsgige", "gmydgobygyge", "gmydgojrgege", "gmydgojtgage", "gmydimzrgyge", "gmydimzsg4ge", "gmydimzxgege", "gmydinjugene", "gmydinjxgmge", "gmydiobqgene", "gmydiobtg4ge", "gmydiojrg4ge", "gmydiojygage", "gmydkmbrguge", "gmydkmbxgege", "gmydkmrwgage", "gmydknbwhege", "gmydknjrhege", "gmydknrwgmge", "gmydkobygqge", "gmydkobzgene", "gmydmmrsgyge", "gmydmmzrhage", "gmydmnrug4ge", "gmydmnztgene", "gmydmnzzgmge", "gmydmojrgege", "gmydmojzgige", "gmydombsgege", "gmydombxgqge", "gmydomqgenes", "gmydomygenes", "gmydonbsgege", "gmydonjqgege", "gmydonjwhage", "gmydonjyhage", "gmydonjzgmge", "gmydonzthege", "gmydoobtguge", "gmydqmbvgege", "gmydqmrug4ge", "gmydqmztgege", "gmydqmzugage", "gmydqnbxhege", "gmydqnjtgage", "gmydqnrrgmge", "gmydqnrsgyge", "gmydqobvgyge", "gmydqojtgqge", "gmydqojyg4ge", "gmydqojzgage", "gmydqojzgqge", "gmydsmbrguge", "gmydsmbtgene", "gmydsmbvg4ge", "gmydsmjthage", "gmydsmrugage", "gmydsmrugige", "gmydsmztgage", "gmydsnbqgige", "gmydsnrxgage", "gmydsobygyge", "gmydsojqhage", "gq2tgnbzg4ge", "gmytamjtguge", "gmytamjzguge", "gmytamjzhege", "gmytamrqgyge", "gmytamzthage", "gmytamzxhege", "gmytanbvgmge", "gmytanjvguge", "gmytanjwgene", "gmytanrtguge", "gmytanzzguge", "gmytaoagenes", "gmytaobyhege", "gmytaojtgene", "gmytcmbqhege", "gmytcmbwgage", "gmytcmjugage", "gmytcmrvgene", "gmytcmzxgage", "gmytcnbwgege", "gmytcnbxg4ge", "gmytcnjrguge", "gmytcnrtgige", "gmytcnryguge", "gmytcnzrhege", "gmytcnzsgyge", "gmytcnzxg4ge", "gmytcobvgmge", "gmytcojrhege", "gmytcojzguge", "gmytegenesis", "gmytemjqgmge", "gmytemjsgmge", "gmytemrsgage", "gmytemrtgmge", "gmytemzvgege", "gmytenbqhage", "gmytenbrhege", "gmytenbtgege", "gmytenbyhege", "gmytenrqgage", "gmytenrrgene", "gmytenrugene", "gmytenruguge", "gmytenzwgage", "gmyteobtguge", "gmyteobugege", "gmyteobugene", "gmyteobugige", "gmyteojvgage", "gmyteojxg4ge", "gmytgmbrgene", "gmytgmbtguge", "gmytgmjxgmge", "gmytgmrsgmge", "gmytgmrtgene", "gmytgmrtguge", "gmytgmrvgige", "gmytgnbsgige", "gmytgnjsgage", "gmytgnrxg4ge", "gmytgnrxhege", "gmytgnrzgage", "gmytgnztgene", "gmytgobrhege", "gmytgojrgmge", "gmytimbxg4ge", "gmytimjvgmge", "gmytimrzgige", "gmytimzshege", "gmytinbsg4ge", "gmytinjwguge", "gmytinjygage", "gmytinjyguge", "gmytinrtgage", "gmytinzxgege", "gmytiojwgage", "gmytkmjugyge", "gmytkmjygyge", "gmytkmzvgege", "gmytkmzxgmge", "gmytknbqgqge", "gmytknjqgene", "gmytknjwhage", "gmytknrugene", "gmytkobrgege", "gmytkojthege", "gmytkojvgmge", "gmytkojwhage", "gmytmmbxgige", "gmytmmjqgqge", "gmytmmjwgene", "gmytmmrwgene", "gmytmmrwhage", "gmytmmzzhege", "gmytmnbugyge", "gmytmnbuhege", "gmytmnjsgage", "gmytmnjsgyge", "gmytmnjvgqge", "gmytmnrvgyge", "gmytmnzsg4ge", "gmytmnzvgene", "gmytmnzvgqge", "gmytmobsguge", "gmytmojrgene", "gmytmojygmge", "gmytmojzgene", "gmytombtgene", "gmytombugage", "gmytomjqgmge", "gmytomjvhage", "gmytomjzgege", "gmytomrugmge", "gmytonjug4ge", "gmytonrug4ge", "gmytonrxgige", "gmytoobsgige", "gmytoobyhage", "gmytqmbvgage", "gmytqmbxgyge", "gmytqmjwgige", "gmytqmrsgqge", "gmytqmzxhage", "gmytqnbsg4ge", "gmytqnbzg4ge", "gmytqnbzgyge", "gmytqnjsgege", "gmytqnjxgage", "gmytqnzxguge", "gmytqnzxgyge", "gmytqobsgege", "gmytqojrhege", "gmytsnbvgige", "gmytsnjyguge", "gmytsobtg4ge", "gmytsobtguge", "gmytsobygege", "gmytsojvgege", "gmytsojzgqge", "gmzdambtgege", "gmzdamjrgige", "gmzdamrzguge", "gmzdanbygege", "gmzdanjqgyge", "gmzdanjygige", "gmzdanrsgige", "gmzdanrthage", "gmzdanrwguge", "gmzdaojzgage", "gmzdaojzgene", "gmzdaojzhage", "gmzdcmbqgege", "gmzdcmbshage", "gmzdcmbvgage", "gmzdcmrtgyge", "gmzdcmrvgmge", "gmzdcmrygige", "gmzdcmzvgene", "gmzdcnbqgage", "gmzdcnbvhege", "gmzdcnjzgmge", "gmzdcnrrgene", "gmzdcnrxgmge", "gmzdcnryhege", "gmzdcnztgege", "gmzdcobsgmge", "gmzdcobthage", "gmzdemagenes", "gmzdemjxgyge", "gmzdenjqgage", "gmzdenjvgene", "gmzdenzyhage", "gmzdeobqgige", "gmzdeobwhage", "gmzdgmbvgene", 
	"gmzdcobthage", "gmzdemagenes", "gmzdemjxgyge", "gmzdenjqgage", "gmzdenjvgene", "gmzdenzyhage", "gmzdeobqgige", "gmzdeobwhage", "gmzdgmbvgene", "gmzdgmbwhage", "gmzdgmjvg4ge", "gmzdgmrtguge", "gmzdgmztgage", "gmzdgmzygmge", "gmzdgnjxhage", "gmzdgnrvguge", "gmzdgnrygene", "gmzdgnzzg4ge", "gmzdgobtgege", "gmzdgobxgege", "gmzdgobyguge", "gmzdgojygqge", "gmzdimjugmge", "gmzdimjvhege", "gmzdinigenes", "gmzdinjrgyge", "gmzdinjvg4ge", "gmzdinjwgege", "gq3dqmbzgqge", "gmzdinzqhege", "gmzdinzugige", "gmzdkmrzgige", "gmzdknbvgqge", "gmzdknbvhage", "gmzdkojvg4ge", "gmzdmmbwgage", "gmzdmmjqhege", "gmzdmmjtgyge", "gmzdmmjwgige", "gmzdmmrsgene", "gmzdmmrygmge", "gmzdmnjqhege", "gmzdmnjrgage", "gmzdmnjxgene", "gmzdmnrthage", "gmzdmnzsgyge", "gmzdmnzzgyge", "gmzdmobrguge", "gmzdmobxgqge", "gmzdmojygqge", "gmzdombqguge", "gmzdombrhege", "gmzdombvgage", "gmzdombwguge", "gmzdombygyge", "gmzdombzhege", "gmzdomztgmge", "gmzdomzwg4ge", "gmzdonbug4ge", "gmzdonjugige", "gmzdonruhage", "gmzdonztguge", "gmzdoobugene", "gmzdoojwgyge", "gmzdqmjrgige", "gmzdqmjugyge", "gmzdqmrwgmge", "gmzdqmrxgene", "gmzdqmzwgege", "gmzdqnbtgyge", "gmzdqnjsguge", "gmzdqnjvhage", "gmzdqobvguge", "gmzdqobygene", "gmzdqobygige", "gmzdqojygage", "gmzdsmbtgage", "gmzdsmbxgmge", "gmzdsmjtgage", "gmzdsmjxhage", "gmzdsmrwgene", "gmzdsnjtgige", "gmzdsnjxgene", "gmzdsnjzgyge", "gmzdsnrrgage", "gmzdsnrwguge", "gmzdsnrzhage", "gmzdsnzvhage", "gmzdsnzxgmge", "gmzdsojqguge", "gmztambsgage", "gmztamrxgage", "gmztamrxguge", "gmztanbwgyge", "gmztanjqgyge", "gmztanrsguge", "gmztanzthege", "gmztanzwgqge", "gmztanzwgyge", "gmztanzxgmge", "gmztcmbtgege", "gmztcmrvg4ge", "gmztcmztgege", "gmztcmzvhege", "gmztcmzwgqge", "gmztcmzwhage", "gmztcnjwhage", "gmztcnzshege", "gmztcnzxgage", "gmztcobsgqge", "gmztcobtgyge", "gmztcobxhage", "gmztcobygmge", "gmztembsgene", "gmztemrrguge", "gmztemzsgene", "gmztemztgage", "gmztemztguge", "gmztemzvgige", "gmztemzyhage", "gmztenjqhage", "gmztenrtgmge", "gmztenzsguge", "gmzteojsgmge", "gmztgmbugage", "gmztgmbugege", "gmztgmjvg4ge", "gmztgmjwgmge", "gmztgmzqgige", "gmztgnbqhege", "gmztgnbsguge", "gmztgnrqg4ge", "gmztgnrxguge", "gmztgobqgege", "gmztgojrgyge", "gmztimagenes", "gmztimbqgege", "gmztinbthege", "gmztiojrgige", "gmztkmbwgmge", "gmztkmbygage", "gmztkmjtgmge", "gmztknjrgqge", "gmztknrvgyge", "gmztknryhage", "gmztknrzg4ge", "gmztkobqg4ge", "gmztkobvgige", "gmztkojsgyge", "gmztkojthage", "gmztkojuguge", "gmztkojxg4ge", "gmztmmbxgmge", "gmztmmjvgige", "gmztmmjzhage", "gmztmmrvhage", "gmztmmygenes", "gmztmmzrgmge", "gmztmmzvhege", "gmztmnjtgage", "gmztmnjxgege", "gmztmnrqhege", "gmztmnrrgqge", "gmztmnrugqge", "gmztmnzshege", "gmztmnztgyge", "gmztmnzygige", "gmztmnzyhege", "gmztmobygqge", "gmztomagenes", "gmztomrtgmge", "gmztomzqg4ge", "gmztomzsguge", "gmztomzxhage", "gmztonbrgige", "gmztonbugige", "gmztooigenes", "gmztoojtgqge", "gmztqmzyguge", "gmztqnbygqge", "gmztqnrugyge", "gmztqnryhage", "gmztqobugmge", "gmztsmbsgmge", "gmztsmbzguge", "gmztsmjxguge", "gmztsmrugage", "gmztsnrvhege", "gmztsojzhege", "gq3dimrvgyge", "goktughalacl", "goldismylove", "gq3timryhege", "gq3tamrrgqge", "gordbuckley2", "gq4dkobwg4ge", "gq3dkmzrgyge", "gq2damagenes", "gq2damjsgege", "gq2damqgenes", "gq2damrtg4ge", "gq2danbqgage", "gq2danbqhege", "gq2danbxgqge", "gq2danbygage", "gq2danrqhage", "gq2danrshage", "gq2danrwgege", "gq2danzygene", "gq2danzzgege", "gq2daobzguge", "gq2daojvgige", "gq2daojyguge", "gq2dcmbyguge", "gq2dcmruhage", "gq2dcmzzgene", "gq2dcnbtgige", "gq2dcnbxgqge", "gq2dcnjthege", "gq2dcnjwhege", "gq2dcobxg4ge", "gq2dcobyguge", "gq2dcojtgqge", "gq2dembrgmge", "gq2dembtgege", "gq2demjqhage", "gq2demjtg4ge", "gq2demrtgqge", "gq2demrzhage", "gq4diojtg4ge", "gq2demzygqge", "gq2denjzgige", "gq2denrxhage", "gq2denrygqge", "gq2denrzgage", "gq2denrzgmge", "gq2denzrgage", "gq2denzrgyge", "gq2denzzgige", "gq2deojshage", "gq2deojxguge", "gq2dgmztg4ge", "gq2dgnbtguge", "gq2dgnjwgage", "gq2dgnjxg4ge", "gq2dgnrrg4ge", "gq2dgnrxg4ge", "gq2dgnzzhage", "gq2dgojwgige", "gq2dgojwguge", "gq2dimbqgege", "gq2dimbqgyge", "gq2dimbsgyge", "gq2dimbwhage", "gq2dimjyguge", "gq2dimzrgige", "gq2dimzsgmge", "gq2dinjqhege", "gq2dinrqgage", "gq2dinzqgyge", "gq2dinztg4ge", "gq2dinzwgige", "gq2diobqhage", "gq2diobtgege", "gq2diobwgyge", "gq2diojsgage", "gq2diojygage", "gq2dkmbqg4ge", "gq2dkmrqgege", "gq3timjygyge", "gq2dkmrygmge", "gq2dknbqgige", "gq2dknzyhege", "gq2dknzzhage", "gq2dkobygmge", "gq2dkojwgmge", "gq2dmmbqgyge", "gq2dmmbrgqge", "gq2dmmbwguge", "gq2dmmrqguge", "gq2dmmzsgege", "gq2dmmzyg4ge", "gq2dmnbrgqge", "gq2dmnbxgage", "gq2dmnjwgige", "gq2dmnjygege", "gq2dmnqgenes", "gq2dmnrxgene", "gq2dmobugige", "gq2domjqgege", "gq2domjvg4ge", "gq2domzxgege", "gq2domzzgage", "gq2donbwgege", "gq2donjzgmge", "gq2donzrhage", "gq2doobugige", "gq2doobxguge", "gq2doobxhege", "gq2dqmbqhage", "gq2dqmbvguge", "gq2dqmbvhege", "gq2dqmrthage", "gq2dqmzqgege", "gq2dqmzsgige", "gq2dqnbuhage", "gq2dqnjtgyge", "gq2dqnjvg4ge", "gq2dqnqgenes", "gq2dqnrsg4ge", "gq2dqnrwgmge", "gq2dqobvgage", "gq2dqojugmge", "gq2dqojvhage", "gq2dsmbxhage", "gq2dsmjzhage", "gq2dsmrqg4ge", "gq2dsmzrgege", "gq2dsmzzg4ge", "gq2dsnbtg4ge", "gq2dsnjugqge", "gq2dsnjwgene", "gq2dsojthage", "gq2dsojvgige", "gq2tamjrgqge", "gq2tamrrgyge", "gq2tamzthage", "gq2tanagenes", "gq2tanbsgyge", "gq2tanbwg4ge", "gq2tanjsgqge", "gq2tanrsg4ge", "gq2tanrxgage", "gq2tanrygege", "gq2tanzrgege", "gq2tanzygyge", "gq2taobwgyge", "gq2taojqgqge", "gq2taojrgege", "gq2taojwgmge", "gq2tcmjzgege", "gq2tcmrrguge", "gq2tcmrsguge", "gq2tcmrvgage", "gq2tcmrygqge", "gq2tcmztgqge", "gq2tcmzvgyge", "gq2tcmzvhage", "gq2tcnbshege", "gq2tcnbvhage", "gq2tcnjtgige", "gq2tcnzsguge", "gq2tcnzug4ge", "gq2tcnzzg4ge", "gq2tcobshege", "gq2tcobugmge", "gq2tcobugyge", "gq2tcojrhege", "gq2tcojtgqge", "gq2tembtguge", "gq2temjqgige", "gq2temrqhage", "gq2temrrgyge", "gq2temzshege", "gq2tenrzgyge", "gq2tenygenes", "gq2teobugqge", "gq2teojrgyge", "gq2teojzguge", "gq2tgmbrgage", "gq2tgmjqg4ge", "gq2tgmjxgqge", "gq2tgmrwgage", "gq2tgmzxgege", "gq2tgnbxgqge", "gq2tgnbzg4ge", "gq2tgnjugige", "gq2tgnjzg4ge", "gq2tgnrvhege", "gq2tgnrwgige", "gq2tgnrwgqge", "gq2timbsg4ge", "gq2timbtg4ge", "gq2timbzg4ge", "gq2timjqhege", "gq2timjzgege", "gq2timzthage", "gq2timzxgige", "gq2tinbxhage", "gq2tinjwgige", "gq2tinzqg4ge", "gq2tinzrg4ge", "gq2tinztgqge", "gq2tinzxgage", "gq2tinzygige", "gq2tinzyhage", "gq2tiobrgege", "gq2tiojwhage", "gq2tkmbugege", "gq2tkmbugqge", "gq2tkmbxgqge", "gq2tkmjtgyge", "gq2tkmjzgege", "gq2tkmrugyge", "gq2tkmztg4ge", "gq2tknagenes", "gq2tknbygqge", "gq2tknjyhage", "gq2tknjzgage", "gq2tknzthage", "gq2tknzugege", "gq2tkobtguge", "gq2tkobthage", "gq2tkojtgqge", "gq2tkojyg4ge", "gq2tkojzgige", "gq2tmmbugmge", "gq2tmmjxgige", "gq3tanrxg4ge", "gq2tmmrtg4ge", "gq2tmmrwhege", "gq2tmmrzhege", "gq2tmnjygege", "gq2tmnrtgege", "gq2tombqguge", "gq2tomjwgige", "gq2tomzvg4ge", "gq2tomzvgmge", "gq2tonjygege", "gq2toojwguge", "gq2tqmbwhege", "gq2tqmjwguge", "gq2tqmqgenes", "gq2tqmrqgyge", "gq2tqmzqgige", "gq2tqmzxhage", "gq2tqnjygmge", "gq2tqnrugyge", "gq2tqnzqgage", "gq2tqnzugqge", "gq2tqnzxgege", "gq2tqoagenes", "gq2tqobvguge", "gq2tqojqguge", "gq2tqojtgage", "gq2tqojzhage", "gq2tsmbsguge", "gq2tsmbug4ge", "gq2tsmbygqge", "gq2tsmjygege", "gq2tsmryguge", "gq2tsmzwgyge", "gq2tsnbyg4ge", "gq2tsnjqgqge", "gq2tsnjshage", "gq2tsnrrgege", "gq2tsnzygyge", "gq2tsobqgmge", "gq2tsobwgqge", "gq2tsobzhage", "gq2tsojug4ge", "gq3agenesis1", "gq3dambqhage", "gq3damjzg4ge", "gq3damzshege", "gq3damzthege", "gq3danjxhage", "gq3daobrgene", "gq3daobzhage", "gq3daojrguge", "gq3daojugene", "gq3daojzguge", "gq3dcmbrgmge", "gq3dcmjwguge", "gq3dcmzqgmge", "gq3dcnbwgqge", "gq3dcnigenes", "gq3dcnzrhege", "gq3dcnzsg4ge", "gq3dcojxgege", "gq3dembqhege", "gq3dembsgage", "gq3dembsgige", "gq3dembwgene", "gq3demjqgqge", "gq3demjyguge", "gq3demrtgyge", "gq3demrwgyge", "gq3demzqgene", "gq3demzvgyge", "gq3demzzgyge", "gq3denbzgige", "gq3denbzgmge", "gq3denztg4ge", "gq3denztgqge", "gq3deojtgage", "gq3deojvgqge", "gq3deojwg4ge", "gq3deojzguge", "gq3deojzgyge"
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
	setTimeout(deleteLoop,500,idx)
	
}
			
setTimeout(deleteLoop,500, 1);

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


                  
                                                                                                                     
                                                                                                                     
