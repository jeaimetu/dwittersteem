const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "thebeantoken";

var express = require('express');
var app = express();

Eos = require('eosjs');
const fs = require('fs');

var port = process.env.PORT || 5000;
console.log("port", port);

 app.listen(port, function() {
   console.log("Listening on " + port);
 });

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
"ha4dsmbygmge","guztmnrvhage","gqydqobxguge","pamegarrio12","dumpshitcoin","g42dknbvgqge","gm4dombzhege","xsz4xl4w3fzt","gm2timbqgyge","saygoodbyeto","leonsun11111","guzdmmrugege","gu2deobwgige","geytgobugmge","ge2denbsgige","g44tmnzsgege","guztqmrtgqge","geydmnjvgene","haydmmjygege","lifangyi5555","gq4donrrgyge","qianyihong55","ha2tknjrguge","gy3tsmbsgige","gq2damqgenes","zuczintjwqjy","gy3domrugmge","gq2dkmztgige","giydemagenes","ge3dmobvgene","ge2domrrgmge","gyztkmrqgege","gezdkmbvgige","haytembtg4ge","enjoyeosroy2","g43tgnbygage","gqydimjyhage","heydonbyhege","gy3dgnjvhege","darpanhongal","gy3dcmzwgene","ha4denqgenes","gy2dknrvgmge","gqydimbsgqge","haytmnzyguge","giztsnrthage","gu3dknbuguge","gu3doobzguge","hezdenzwgyge","whaleexcpu2h","gu3dkmrxgmge","gi2tgnzxgege","vpvslyhiubkt","cryptogenius","limeirangeos","gy4dqmbyguge","geydknzrgege","jofczu1lprye","masterithink","gy4tgobqgqge","wuyiyiwallet","haytqojugyge","gi2dsnqgenes","giztsnzshege","ge4tmmzwg4ge","gyztsojugyge","haydsobvgige","g43dqojvg4ge","ge4dmnbqgege","gi2tkojwgage","eosyahei5lhh","cryptorambuy","kurotorieos1","gyzdsobxgage","g44tiobzhage","gmztqnbxgege","g42tsnbwgene","gy3tinrxhage","ge4tsnbygyge","eosurthebest","g4ydenbtgmge","guztqmjtgene","subaolei1234","geydsnrvgene","gyztanbuguge","gy2deobyguge","gi4tenjwg4ge","heytambwgene","gqytenzvgene","gu3dgmzygige","gmydcmrxgene","taotaotaotao","g42denbxg4ge","g43dcnbqguge","g44tinztguge","aaacccoooooo","ge4dqnrvhege","giydonbugage","gu2tgojvhage","ljj.eos","gqztmobxguge","ha3tgmrqgyge","ge4tknzvgige","gyytambtgege","gy3tgojrhage","g42timrvhege","g43tambwg4ge","gu3dsnzyguge","gqytqnbthage","gu3dsnjuhege","gm2tinztguge","gu2tsnjygage","eoscausaqiao","gq3dknigenes","ge4daojtguge","ge3tcmbvgege","haydgnzygqge","mywalletmzfd","g43tmmbrgmge","gy2tonbuhege","gu3dqmbsgage","gmzdgnrvguge","ha4tmmrtguge","duobaaaaaaaa","c2115w2poogy","hazteojuguge","abc333222333","g44tqnjthege","eoszjslinkun","he3tcnjxgene","g43tinzwgige","geytiojwgene","gyztgnzrg4ge","gi3tembqgyge","g44tcobug4ge","new2thisgame","guztgnbtgege","bearcandyjar","mississippi1","gu2tambvg4ge","gu4tqmrthage","gu2tinjugige","geydgojshege","dinosaur.x","gyytimbqgyge","gu4tomzshage","gu3dsmjqgqge","he4dcnzwgene","1pythonworld","bitworldbank","listentomak1","zhoulijuan11","g43timzygqge","gu4tomrrgqge","badastsaving","gi4dqojwhage","g4zdgmjug4ge","g43temzvg4ge","gqydmoigenes","zhuliangsong","stuardodevel","ge3dsmrrgyge","gq3dgmjygene","gyzdomjzhage","gy4tioagenes","haytkojwhage","gizdoojtgege","gamesky2dice","gu3dmmzvgage","gy3tsnzygige","montblanc123","eosyuanyimin","bentengzhong","ge2tkmbzgmge","gqydcojrgene","s.io","gyztkmjzgene","ccppeeos1213","geydinbvgene","ha4tamrqgqge","eosvenezuela","gyztmnjzguge","g43tiobvgyge","luckyfancy11","legeslegjobb","modrexler543","dublinsocial","guydsojwgyge","haydcojshage","giytcobrgege","ha3doobygyge","gy4tcmzrgege","xiaoyusll511","tokenhodlerr","heztcnjxgene","hazdgmbrgage","gu2tenrwgige","ha4dmojwgmge","pandafungame","eossaveworld","giytoojsgage","gy2tomzxhage","haztemzzgyge","gu2tmojyg4ge","gmztinrrgage","heydkmrrg4ge","gu3donzsgqge","gyztgnzugqge","g44tgmzthage","bjeosaccount","hazdimrrhage","g43tinbqguge","gy2dsnbvhage","heytqnrsgene","gi3danjtguge","haydinrqgmge","ge3teojzhage","heytiojygqge","gm2dinztguge","haydknbugage","gy4dgojyhage","bpdappincome","gu3dgmjugmge","panrunlong15","gu4tmnbzgyge","g43danjtgene","g4ytmnrsgmge","ge4tsmzug4ge","g44tgmjxgage","xiaohuadong2","gmytqmigenes","haytamzrgmge","stuarteos123","gu3tmnzqguge","gezdqnjxgene","ha2tonjwg4ge","gmydeobugmge","gy4domrxgene","eoscpurental","gu2timbygege","eosxiaomaomi","gm2dqobxgmge","gyztkmjqgige","eisenbahn222","gu2tsobygmge","gmzdqmrsguge","giztombqgage","gq4dsnrtgage","g42tinrzg4ge","ninoeoswalle","ha4donrwg4ge","g4ytimzsgege","krdczikaplqe","haydknrwgmge","g4zdiojqgige","heztanbsgqge","guztonjwhege","zzings112233","gq3dmojtgige","rezen5rezen5","gyytkojtgene","ge4dcobrgyge","ha2donzqg4ge","gyytanbsgqge","guztgnjtgige","111111555333","ge2dmmrzg4ge","g44tmmrvgage","mystaccount1","youzigongzhu","gqytgmbvgene","ha3tmnbygege","ha2doobzgyge","gu3tqmrwgage","binancecleos","billwang1234","gi3tsmrvguge","giytkmztg4ge","guzdkmrygyge","guytqobxhege","gi4dinbsg4ge","gm2tomjvgene","gizdonqgenes","gi4dqnjvgene","haytmmrugage","gm2timzrgege","g4ytaobwhage","haztcnrvgqge","nobodyforeos","heytkmztg4ge","gu2tgmzvgage","gmytmnbqgage","giytmmjwhege","ha3tkobrhege","gq2tmmrshage","gmytsmbqhage","heytsmbsgage","saveaccounts","gm3dambugige","ge3tgnbugege","gm3tsmigenes","jx12345lihua","gqytomzqgene","hazdenjwhege","emaosuper123","hazdgnjzguge","gm3dmmbwgage","gm3tkmjqgene","absol4unlock","g4ztmmzugqge","guztsobrguge","gy2deobvgene","wwwwww222555","gizdcobwgege","chezedude123","vladimirwish","ha2teobwhage","gqzdqnjsgige","bafengbudong","ge3dknjwhege","pierrenader1","giytknrrgene","g44dqnbrgage","gi4tmgenesis","gy2tsmjzhage","whateos12345","ha4dgmjugige","gi4tomrxguge","ha2toobqgmge","gq3donjqgage","sal451assa22","ge4tiobthege","gyytknjqgige","xidezhuangsh","gy3temjygige","sendeostoann","gm3dcnjzguge","guydsmzvgage","gi3tsojvguge","wodeqianqian","geydsnbugyge","haydkmbzhege","gezdinjygage","gyytknzygmge","geztanzrgage","ha4tcmzshege","ge4dkmjugage","guydmnbwgage","heydsgenesis","gu2dsmjsgmge","giydkmzzguge","g44dsmbsgmge","gu4demjrgene","gmztcnjsgage","geydenbwgmge","hazdinbshage","g44tqnzxgege","gu4dknrxgmge","gi4dknzvhege","bigibigibigi","eoschina4444","geytmojvhege","guztemzugage","gu2tmmbqgege","gu3tcojrhage","gi4toobyhege","g44tkmrwgmge","shine2myeosk","xiaoxiaoniao","ge3dmobvhege","haztombrguge","g44tmmrqhege","gi4dgobwguge","hezdmnrwgqge","ha3tgnrxgene","jrbizqs3ykpg","gu4donbqgmge","geytonrugqge","mochcocaine1","kaizenonward","gyztiobwguge","gy3tcnjuhage","hazdgobsgyge","heytombvgage","peterscatter","gq4dinbqgege","gm4tsmigenes","gezdeobygage","lwzx134towia","ge4tinjrgige","zbeoschange3","gm2dombuhege","ha3teobygege","gu2domrzgqge","ha3tsmrygene","gezdenzuguge","gy2dqnrrgqge","whaleexcpu3x","ha3temrshege","gm2dcmrygmge","gi4tsojwg4ge","giztonjvgige","luckygoteam1","gyytqojyg4ge","gm3dkmjwgmge","g43tinrwhage","gyytsobtgage","gezdmmbvhege","fastwinhold1","ha2domjrg4ge","gm3dimbzgige","ha3dmnzsgyge","whaleexcpu3y","gu4dcmrygyge","hezdqojqgyge","gu2dimjzgyge","gyytoojqhage","gm3domjxhage","tanghonghuis","gmztinrqgqge","gizdaobugage","ge3tinjwgmge","gmzdsnrrgage","ha4tgmzyguge","eospeijun123","ha3tsobxgage","gi2dmobrg4ge","gy2dqmbygmge","gmytmmzwhage","jnqf2b1sp3ut","qiuiquqiuiqu","heztanbygene","gy4dcmzqhage","233233233233","guzdcobthege","gi4dsmjwgige","gq4diojtg4ge","haytanrrguge","gy2donbzhege","gm4diobtgqge","koudkoudkoud","heytsmzwguge","gu4tcnbrgege","vevczdmmiany","gy2dqmzxgige","guzdknbtguge","ha3tsojtg4ge","hotbitioeoss","gq4damzqhege","geydemzzgage","gqzdaojwg4ge","geztenbthage","yiwanfuweng2","geztqnjxgyge","chencheng123","wangjianfeng","mayongliang1","rjbeauregard","ha3dknbrgqge","dreamtheater","haydgnztgige","hezdcmagenes","hezdemrug4ge","gu4dknzyhege","hazdsmbsgmge","gu3denbwgege","g43dkmbrgige","lugbvnd1yp5i","gmydsobygyge","gu3tomjwguge","ge4donrwguge","gm3tsnrtg4ge","famillyfirst","haytenzwgene","gqztonrwguge","ha2tgmbzhege","uu13145252uu","gezdenzvgage","gqzdsojygene","hawkhawkhawk","ge3domjxhege","ge3demjygyge","gu2tsobtgqge","guytenbqgmge","lyb111111111","hezdoobqgige","guydqnjsgige","ge4dgmrrhage","giytombrgage","gu3temjxgmge","gizdamrygmge","haztembxgage","guzdsmruhege","ge2tamrygqge","ha4timjzgage","zhangke12345","heydsnbvhage","giytgmbsgage","giytqmjrhege","ha2tgnjygage","g43tanrtgene","gyydimjtgene","gq3tamjqguge","g4ytanjwgmge","g43tkmzyg4ge","ha4tknjshage","sheos21sheos","gu2tsnjzguge","fastwincpuem","gmzdeojsgqge","sparkywizard","magicalmagic","guzdqnzqgmge","g4zdmnzsgmge","ge3tiojrhage","gq2tkmjqgige","ge4dmobsg4ge","haytmmrugyge","ha4tkmbygqge","ge4dknjzgige","geydsobrguge","g44tqmzzg4ge","gu4denrwg4ge","gy4danbwgige","gm4dombrhege","haytmnjshage","g44dmmjzgyge","gqztombqguge","iloveyechen5","gi2demjtgyge","meiqiheng111","lina11223344","g44tmnbvgmge","eosunshinego","gu3dqnrqguge","nbwkjuactp4s","gi4tenjvgmge","gy2dknrzgege","olllllllllll","he2dknbrgene","ha3tanzyguge","gm4taobsg4ge","gu3tkmbzgmge","eosbancor123","gy4tcmjxgmge","ge3tkmjzgqge","gy3tcmrrguge","gy3tomrugege","alibabaoneos","luyaoyaoy213","ge2tsnzvgene","guytambug4ge","gqztiobqgene","g44doobwgqge","2exvspdbl4qg","gy4dmnrsgige","he4tmnbugene","happychinese","ge3dsmrzguge","gy3tinbygqge","gqytambyg4ge","gqydkmbxgage","thinkbiteos1","hazdcmzrgmge","gq3dgmrygage","giztqmbxgyge","giztimbyguge","ge4tmmzsgage","hazdgmzvhege","gq4dgmjtguge","gy3tanrvgyge","ha2tgmzxgqge","ge4dmojrg4ge","gq2tsojrgyge","gqytsmjsguge","ge3tgnrxhege","geztgobqhege","ha3dgmrxgene","ge4dinzzgyge","whaleexcpu3n","gq4tgnrzgage","renzhewudi55","gq4tonbyhege","g4ydonzsgqge","btbeoswithdw","geytgnjtgege","haydiojtgene","yanbinhao111","daishuhezi11","giztgmigenes","epitomeclhun","fstring12345","guytambzguge","giydemzzgige","haydqmjyhage","ha2tqmbvg4ge","ge3diobrguge","ge3tcnygenes","rodzaevskiy3","geztknbvhege","gi3dmobwgyge","ge3teobvgige","geztomzwgage","guztemzsgege","haizaifengzi","gy2tmmzugege","ha4dqnbvhage","g42tinbsgmge","gm2tsobshage","ha4dqnbygene","xxxqqq333111","gu3taojrgene","priceupup111","ilovemyeostt","giytqmjugqge","lmzlmz131425","ha2tmnbqgyge","ha3dsnzrhage","vmosdnoadgde","ha2dgnrwgige","gmydinjugene","gy3deobrg4ge","giytgnbtgage","gq3dmnzshege","heytomrzgmge","ha2tsojrgage","ha3taobvgene","gulfofmexico","geydsmzqgene","luoluohuachu","gm4dkobzgmge","gmztcmbvguge","gy3doobvg4ge","geyteojygyge","ecafescrowww","whaleexcpu2k","gy2timjsgege","ge2tqnzqguge","hazdcobugege","gqztcobsgqge","eosdoyouhave","gm2dsnrugage","gu3tknbygmge","ha4temagenes","llmlovetxtsf","geytmnjvguge","ge4dmobtguge","gq3dgmzshege","gm3dkmjshege","ha2tiojrgyge","g4ydiojygyge","ge4tsnzqgqge","macbook12345","ha4dmnbsgige","g43tqmrvgene","gu3denzrgyge","xdaexdeposit","ge3timjshage","gu4tgmjxhege","gmytinbxhage","giytiobzgege","vssbwmyhxnyw","vnajjnzvnuyx","giydqnbshege","gy2dinzqgege","gi3temjvgmge","georgezhang1","giydgnbqgige","haydenbtgege","gu4tgmrqgege","neoxian11111","gy2dcmbvhege","gu2tgojxgqge","g4zdeobsgqge","2jiazhitouzi","gm3tanzzgyge","g4ydoobqguge","haytsobzgige","haytiobtgage","okbtothemoom","g42tsojzgmge","haztknjvgqge","goeos.e","ge2tombrgqge","ge3denzygyge","ge2tcmrsgene","haztsmygenes","g4ydkojuhage","gy2tmnjtgege","gy2tknjvhage","gi3dmnbqgmge","ge4tonzzgqge","haztkojrhage","gezdqnrxgmge","gy3tonbugene","gezdomjugege","eosfreakout1","gyztanbvhage","ha4tcmrxgige","eosrobin1133","ge3dgmrsgyge","ha2dmnrugige","geydaobtguge","gy3dsnrwgyge","giztqnjyguge","g44tmmrvgege","ge3dqnbugene","gi4tamzqgige","gqztemjqg4ge","ge3dimbwhege","hezdinjvguge","g4ztenjqhege","ge3dmnzqguge","gy3tamrsgene","gmzdqmrqgene","ge3tanbsgqge","gezdonzsgmge","ha2tsmbxgene","ge3tsnbygyge","gu2dooigenes","ge4dqnzygege","gu2tcmjugage","guyteobvgqge","giztsmbqhege","gizdoobxgmge","ge4tmmbxgyge","gm3tmobzgyge","gq3dsnzvgige","he4dqojsgene","gy2dsojyg4ge","ha2tmnrwhege","gyztknrshege","mingmin15sui","ha4dknzvgege","he2tinigenes","haztiojugqge","qdwgobi3zkcx","ynuj2ohwazqi","m1ivgdwyocf5","buxiangshusi","gqytgojvgqge","hoowallet145","trustbetcold","umhkltijad4n","haydcnbsgige","sumansouth12","guzdinjygige","g4zdkmbwhege","gyytiobvhege","gy3dkmrshege","gy3dsnrzg4ge","haytkojxhege","gi4dcmzyguge","giytamjthege","gu4dgnzxgage","gi2tamzwgqge","hoowallet125","nonameforyou","g44tcobzhage","ge4dcmjzgmge","gq4damjsgage","eduardo13542","speedyledger","gezdinjvgqge","gq4dmnjygege","heydknbygyge","ge2tinrxgyge","gqztemjtgage","guzdenzyguge","gu3tmnzsg4ge","gy2dimruguge","gm4tqmbwhage","yanyli4ka123","hezdimzzgage","g44tombyhege","ge4dkmjuhege","g43dimjrgene","g44tsmjrgage","gu3dknjtgige","ha4tmmzvgage","giztknjxgege","guzdkmzxgmge","hazdgojwguge","ge4tknjzgene","gy3dmnqgenes","mxyuzhbj1432","haztambwgige","gyztomjqhage","gy3dknjygage","gu2tqoagenes","lsdgcr123451","gy2dinjyhege","g44taojxg4ge","gu2dqobtgmge","gm3dsmjyguge","gy2tmnrzgage","antking12345","hackerdarwin","combowallets","gy4dcojyg4ge","hazdqnzqgige","ha2tsnbugqge","whaleexcpu1w","heydmnrvgage","heytamjyg4ge","gu2danrvgyge","g44dqojxgage","gi2toobugige","gqzdsmjvgige","gmzdinbvgege","hazdqnzqhage","g44timrqgqge","gyytmnrsgage","1o4clrnzsuxy","gi4dkmigenes","gu3dcnjug4ge","g43dgnbtgmge","whaleexcpu2a","giydonrzguge","guydqmbvg4ge","kidsresearch","gq3toojvgqge","gm3taojvg4ge","he2tembugene","gyzdkmzxguge","gu2tmnzrhage","heydanrxgege","heytcnzwgige","guztomzugqge","hezdomrygmge","zxkxdandy123","gu3diojsgyge","gu2tsnzqgage","gu4dgmjyhage","guzdqobygege","gm3damjvguge","g44tenrvgige","gm4denjqgene","hazdqnzzg4ge","gyzdcmjuhage","axkkh3nhnmyt","gmytinrwgege","gu3dsmbtgyge","gqytqnzrhege","gy2tenzqguge","ge4damzuhage","gi2taojtgqge","gu2dimrqg4ge","hazdsoagenes","giyteobqgmge","ge4dsnrygyge","gi3tcmzqhage","geytqnbxgige","gqztmmzsgyge","he3teoagenes","asdasdasd444","gq3dqmrzhege","gy4dinrtguge","gu3tanrwgige","eosclubgroup","ha3tqmrvgege","geytqnjwgage","hazdgnzugage","gy3tsnzrgige","eoseostomars","gy2deojwguge","zhanghangdev","ge4tambyguge","eosbaishishi","heytimrsgege","gi3tkmrwgage","gu3tenzrgqge","gu3danbwgmge","gy2doobtgqge","gyytinrvgige","eoslpguo1234","ha2tqmbyhege","gi2damzyhege","gezdqnzrgege","aw1234554321","hazdaobyguge","geztcnjvhage","ge2dmnbyguge","gu2taobtg4ge","gm3dembsgige","onotoleholds","g4ytkmrtgege","ha3tknbzhege","gu4dqmbqgene","gu2tsmrxgage","jordglobens1","gu4tmmagenes","gq3tgobzgege","yushengdanni","g42dqnjsgene","g44dqmrqgyge","gizdomrshage","lkyeos111111","numbertheory","gm4dqmrrgege","gy3dcmzsgene","gu3tiobuguge","hazdanjxguge","ha3tknrygyge","ha3dmmjsgege","gy4timjqgyge","ge4dombtgmge","eosrayisking","ge4tqmzqguge","gu4teoagenes","g4zdamzqg4ge","gu2tqmzzgqge","ha4denzwgege","guztsnjuhage","gu3tsnbrhege","toyota133333","ge3dmobsgage","gy3dsnjvgqge","g44tsmjrgqge","gm3taobwgege","gi3tcojzgqge","eoseoseos115","gi3tkoagenes","gqytsobtgqge","monkeyplay55","gy4tanbsgige","gu4tonzsgyge","vvwyjoexktuf","he3dimjqgene","geztamjqgege","heydeobxgige","kingcoolcorv","zhangyuenet1","gy2donjwhege","gu3domzzguge","gq4dgmbygige","guytinjugmge","haytcnjzgige","gi4tknzzguge","gm2dknjrgqge","haztomzyhege","leewaie12345","linzi1234555","gyzdsmbshege","woz4ndc2pifh","g42tmojugige","miao555yh333","guydombug4ge","gy3tmojuguge","g4zdsnjyhage","gm4tanrxgmge","geytmnbyhege","ge4damrqhage","giydgmbugyge","luckybingogo","gy2daojtgene","huocoineosio","ha3tomrwgmge","ssssvvvv1111","heyteobwg4ge","gqztmmrzgene","gy2tonzygmge","ha4dcnbwhage","gqztenagenes","johnnyfirstw","haytcnrsgqge","gu2diobrgyge","aeczerwinska","gi3dcnztgage","guzdeobsgage","fredericimho","gq3tmmjzgqge","gq4dimjrgyge","banaaniapina","sunshinebank","ha2diobrg4ge","giztgnbvgege","haztgmzugmge","community111","he2dmnygenes","madincomeos1","gqydqojtgage","gi3tenjuhege","gu4damzqgage","pokereoscost","gu4dsnjxgege","gmytoobyhage","giydamrwhege","gy3deobugene","gq2dqobxgage","gy2dsnjugene","gu2tcnzqgqge","ge4danzthege","haydgmrugege","eosbeijingtv","hezdsojtgage","gi2dknjyhege","gm3tinrvgige","ha4dgmrshage","hazdgmzsgage","ge2dknjqgyge","gm4diojqgage","geytcnzzgene","gi2diojvhage","qixunzhang2b","haydqnztgqge","gmytkobygage","guydgmrwgyge","whswhswhswh2","gizdmmryhage","gy2tanzzgqge","hannexiao123","ge2dknbwhege","g4ztqmzsgmge","gy3dsmztg4ge","eosuperheroq","gi4dcmrqgyge","guztenzzguge","g43dgmjxgege","ha2tqmruhage","eosnopity123","richguytoken","gy3tamjsg4ge","yishengpinga","nhgsoitbh4hb","gu2dinrtg4ge","ha4dsobwguge","g44donbqguge","changenowioa","eospokerbank","ge3domrshege","hirevibesdev","eosirongrong","ge3dmmrxgyge","giydomzygqge","heytcnzwgene","giydqmjugyge","heztqnagenes","gq2tcojvgage","3b4tphkontst","haydinrugyge","ge4donrugyge","puenie2aihee","gq4tknzuhage","heydkmzzgage","gyydqobwgmge","eosgreatgoal","gm3tgmrrgige","gu2diojug4ge","gyztsojsgmge","ge2tcnzsg4ge","gezdqmbrgyge","g43tknbygene","giztomjzhege","gi4dqnygenes","abnexusindia","lyqeos232323","gu4dsobuhage","g44dknbvgage","ge4tsmzthege","ge3tmobygqge","geztcnjzgene","g44tkmbugqge","haztmnzugyge","hezdqnbxgige","guzdqmjygege","gu3dinrugage","gi3tmmjsgege","gy4tcnzzgyge","gy3tsnzwgene","pramodeosdac","joeljoeljoel","fckthesystem","ge3taojxg4ge","whswhswhswh1","gm2tqmjxgene","geydenzrgyge","ha3dmnzvhege","guztcmrwhage","jacobbella11","ge3dqmrug4ge","giydqnjxgyge","v3dyrecusjk5","alexandrite1","gi2tcmrrgage","gi4tonzqg4ge","gi2tmmzrgege","geztmmrwg4ge","ha4tgnzwgmge","g44temzugage","gu3tembvhege","ha4deobygage","ha2tanjugage","gi2doobrguge","gqzdsmrqgene","gezdqnjtgage","heztaojthege","geztmnbwg4ge","g44tgmzthege","gm2dmojqgage","gm2tmojygqge","gmytqobxgige","guzdcnbqg4ge","yangjg521152","gizdomrwgyge","ge4domygenes","giytamryg4ge","guytkmbvhege","paul12345eos","gi2donzvguge","gm3dcnzrguge","heliumprime1","ge4dmnrvgmge","gqytqnzvhage","giztaobwg4ge","gezdmmjqgene","gm2tkmrzhege","gq4dcnjygige","qiuquanfei11","gq4tonagenes","gq2dcmbyguge","haytqnjrgyge","giytamzzgmge","g44tgojzgige","goinglongeos","ge4dcojygmge","gq4dgnzygige","haydamrugqge","gq4donrsgege","haztgojvgmge","guztamjvguge","hazdanzsgqge","bitcola.e","gi3tsmrugyge","g43dsojxhage","gy3dinjwguge","gu2denrqgage","gmztaobvgage","ge2damjsg4ge","g4ytsmbzhage","ge4dgobzg4ge","haydenrugmge","eosbigmoney1","gmytknjugyge","gutesuhishke","gu2dimbuguge","ge3tmmrvhege","wk2pkqjjk5pq","geztgnrtgene","g4ytknzvguge","hazdcojwgene","4hw2tzmaeugs","gu4tamztgyge","heyteobtg4ge","eosdacserver","gy2tanrugege","g44tmmzygmge","gyzdimjzgage","guydqmqgenes","gy3dmnjugige","gezdcnrqhege","gqydonrtgyge","majamajamaja","gi4dqmbzgege","gu4dsmzzgege","gu2tmnzrguge","gbpndqjcwrok","haytmmbxgeg5","gezdoobxhage","gqzdombyhege","gi2dmnbxgege","geydgnbzgage","gezdonjwgqge","g43teojygege","ge4tiobxg4ge","gq3taojsguge","gm3tmmjrgage","ha2tqobvgage","gy2danjwgmge","haydsmrugene","gmzdinjrgyge","jm.game","nightmare123","imtokenstart","gregseosacct","eosironmanio","gu3damrzgqge","gizdgnbyguge","wangheyaoeos","ge4tcmrqgige","vjqiqgkzyktw","g44dinzvhage","heztanbugene","gy2temjxgage","gu2dsnjwgage","gyzdomzshege","ge2dkmzuhege","gqytmmzwgmge","he2dsnjtgene","gyydqnzygqge","gmzdqmrugyge","g4ytinzygmge","g4ztgnrsgene","guztemzsgyge","gizdmobqgege","ge2teobsguge","g44tmmrrgage","ge3dsmbzgage","g44tmnbzgage","baihualin333","gu3tgmzxgege","g4ydmmbwhege","haytgmzzhage","haydmnbygene","ge4tcnbxgige","g43domjrgene","gm3dmobsguge","heydqnzwgege","geytgnrtguge","hazdknrzgqge","gyzdonjvg4ge","guztcnjzgage","he3demjzgene","gyztqobzhege","gu2tknjzhege","gy2tkmrugige","tokenplanet2","guztenrxgage","gezdqmbqhege","ge4donruhege","shortestpath","hiddentiger1","hazdsmzvhage","ha2tmnbuhage","splitjourney","ge2tanbzguge","gq3temrqgene","guztgnzxgyge","geyteobwg4ge","geytqmjwgage","mapleafoneos","gq2tmobzguge","g4ztkmjwgige","gi3dmmrtgqge","whaleexcpu3m","heydaojuguge","haydcmzthage","oldseaeos123","giytgoagenes","ha2tomruhage","lvk1t4fzbag5","rockyzhinian","gizdknzqgage","gm3dsnzsgige","gy3timzxg4ge","hezdanbqhege","giydgnqgenes","ucmzhl41ykaj","gi2tombugege","bangladeshcm","gy2dknjvgmge","gu4tinbqg4ge","gy2dcnrvgage","gi2donzugqge","ge3tombwgqge","ge2tkobzgege","frankeger111","he4dqmbsgene","g43donigenes","gy4tkmzzgmge","gy3dcobtgmge","gy2dmmztgege","1bankofchina","ge3tqmbqgqge","guydcnrtgyge","giytonruguge","gy2taojsgmge","guytmnrqguge","gm2tsnzwguge","g44tonrwgmge","gyydknzvgige","eosriobrazil","ge4tinjwgqge","ge4tgnbzguge","gy3timryhege","gy4tknjzhege","ge4dimbxgage","gu4donrwhege","g44tamjqgege","eosneowallet","heytmnjqgige","heydinbygyge","ge2dambuhege","gi2tkmzshege","ge3danjugage","ha4tanzxgyge","gi4tenjwgmge","dql112233445","g43deojxgene","gy4tqmbzgage","ha2dgnrwgqge","heytqmzsgmge","gq3dgobvhege","ha4demrqgmge","ge4tgnrzgage","chaitong2222","gm3tomrygege","eosqbdz13141","gimmeyoureos","f1bpvjct5ryk","g43dinrwgene","gu2domzqgmge","gyztamzzgige","randominator","ha4tsmbsguge","ha2dmmrwguge","gy3dembqguge","gi4tiojsgage","he2demjxgene","ge4tmojthege","g44timbvgqge","gu4tanzrgyge","gi4domzwhage","gy3tsojyhege","gmydenrsgene","gm4dqojwhage","gy2dkmbrhage","hezdomrvhage","gi4dkobqgene","gi4tknjtguge","ha4tgmztgene","lymsydlymsyd","gu4damrthage","guztmmrygige","gyzdcnrugige","gq4dmojwhage","eoswalletlin","gizdmmbrgene","funcity1sale","geytcmjug4ge","bangbangtang","guztmojwgage","gyytmmzshage","gy4dgnjygene","leishen11111","giytcnjqgyge","yanyuanateos","ge2tinztg4ge","ha4dqmzvgyge","gi4tcmbugige","hezdcmbvgege","gi2dqnjuhege","g43tinbsgige","eosforliming","heytimjyhege","geztgmrtgqge","casaodysseus","gm2tanjuhege","gyztemjwgmge","gy4damrqgege","hazdmmzsgege","gy4tsmzthage","g44tgmzshege","zmh333555333","gyytmnzygige","g42tkmjtgege","g44tamjzgyge","veganforever","gy2tcnrtgmge","ge2tkobxguge","cryptomonday","giztmmjsgyge","guztqmjzhage","gu4donjrg4ge","haydinjsgege","g44demrvgqge","giytanjvgege","ledgerderek1","gqzdqmzug4ge","gyzdombuhage","haydknrwgqge","gq4tmmrsgage","gi4dsmbrgqge","ge4tsnjtgige","gy4toobyhege","ha4dqmzxgmge","g44tombzgyge","gyzdqmbxguge","gu2tomrsgige","ge4tcmzxgmge","fengzhilvren","gi3donrqhege","gmztmojtgmge","gu4tgojygyge","giytmmjuhege","ha3demjyhage","ge3temjwgage","zichaoeos123","gy3tsnbwgyge","gezdaobxgyge","haydanjugige","hezdcmrugmge","giztanjsgyge","geydqnbugene","g44tknjyguge","ha3dqnzugyge","boeserfilzer","bidname.eos","geydeobqgene","gq4tmmbtgqge","gy2tqobyhege","g43dembzhage","zincographer","gi3tamrtguge","ha4tqmbshege","gmztgnbsguge","haztkobsgqge","eos4dinner11","ge2denjqg4ge","he2dooigenes","tangzhs12345","ha4dknrqgege","tmledgerwal1","gu3tenjqguge","geytomrrgyge","gi4tkmzxgyge","gqztemjygqge","gu2tgobwgige","gy4tmojxgene","sverigeyb214","gq2tsnbygege","gezdcmrwgene","gm3donryhege","ge2tiojzgege","ge4denjwhege","haztgnjxgage","gu3tknryhege","haydmnzzgege","gu3tqnbtg4ge","ge3dsnrtg4ge","gu2tqmzrgege","gi2dsmjrgege","gy3tcnjygege","zhuochunliao","eoseostdmtdm","gm4tenygenes","gu4danrvguge","eosisgravity","heytimjwg4ge","guzdimbrgige","g44tknbtgmge","heytimjwguge","justall4ueos","csloveeos111","guytsnrug4ge","gi2dkmbwguge","heytimjwgage","lizihao12345","d1tw5p4ewvab","gyztqmbrgene","gu2tonjxhege","haydiobxg4ge","gi3tmobrg4ge","geydqobqguge","cdsecurelock","heydmmjwhege","gm4donzqgene","daveovoxo123","ge3tqnrrgage","giztqnjshege","gqzdknzsgyge","gy4dsmbvgige","hezdimjxgqge","ge3demjthage","bhexdelegate","gu4dimjyg4ge","davwattebled","alchemy11111","gqydgnrwhege","gu2tcobrgage","gy4dambvgqge","ihavesomeeos","gu3tgmbwgege","ha3taojygyge","gy4timrrgyge","gyzdomrsguge","hezdkojthege","gezdonrugege","eosuniversio","gmytmojsgege","g4ztonjyguge","hezdsmjwgige","haytqmbzg4ge","guzdanbvgqge","gyztamzqgage","ha4dgmjzgige","g43domjyhege","guzdsmrsgene","gu3dknjuhage","gq2tgnrshage","gqztemztgqge","gi3tqnrqhege","gi2diobuhege","gezdonzygage","gm4dqnrwgyge","gezdenbzhege","eosnationftw","graphenedevs","eosfinancess","imjolieyeung","gyztqobvhage","gq4tkmjxgyge","gu2tamjvgage","ge3dgobzgege","gm4tsnjug4ge","thequeen1111","heydcnzwgmge","guzdamjrgqge","gi2tsnjwgage","zhangjunjing","gm2taojygmge","heydgnbyhege","gi4danzsg4ge","bjacademic11","ge4tmojqgage","edwincarlson","telouewallet","gi2tinrwgyge","eosguanliang","welovecasino","gu2tgojxhage","gmytsobtguge","sysrq1111111","gq2tamzthage","gi3tknbqgmge","gq2daojsgene","gm4domzwgene","eosaccount11","omarysbast14","gy2dinzqgene","lovehuazhiyu","gi2tinzwgqge","gyztsobqgyge","eosnanjing22","gi2demjygage","ge4tcnjvgege","geztamjqgene","ha4tmnjrgyge","gmytimjwguge","gy4tonjsgage","g44dcnzwgige","mochamocha51","ha3tgnbwgene","g4zdaobugmge","g44tomzrguge","gi2tmnzxguge","gu2tcmrvgqge","yetsyvaneza5","gmzdeojthege","gezdombsgyge","g43temzrgige","gy3dcmbvgage","ge4dombrgige","geztimjwgqge","gq4dmnbqgage","gm4damzxgene","gq4dmnjsgene","lovethecrazy","gyztcnbrg4ge","gi4tinzzg4ge","gy2dmnjqgage","g44dsnjygege","hezdcobvgene","ge2tmmbrgqge","guztgnzwhege","ge4dgnrwgqge","gu3denztgmge","guztanbvgyge","ge3dqojzhage","eosunclejish","ge3dqnzrg4ge","spiritofmath","wangyunqiang","hezdenbygqge","heydkmjsgige","ha3tanjtg4ge","g43tambwgege","gu3tcmzrguge","gq4dqnrqgyge","doooooooooot","gr3ylau55255","gu3tgnzsgyge","nicksoman123","gq3tqobxgmge","aeosfacaigao","ge3dkmqgenes","guytenrsgyge","eosoceanfund","yinggonghui1","heytcmzuhege","gy3dqojzgene","gi2dkmbvg4ge","sunxiaoyanxi","ge4tomrqgege","gu4deobygyge","g4ztknzxgage","ge3tinbvgage","guytonzvgige","ge2dknzwgene","sunchengrong","uelasyfjakxu","btccpooleos1","whptmapeosio","g43dqnrugage","firedubstep1","gi2dcnzuhage","g4ydomrvgage","gq2tcmzvhage","citizenchain","shotsgcrypto","mrfinesse123","gyztinrsgyge","tseol5n52kmo","g44tqnbugmge","ha3tqnrsgqge","ha4tgmzqgmge","haydimjshege","5omypwxuscri","m3o4uvz2kfnl","ha2dmnjqgege","gi3dcnjwgyge","g4ytinrzgege","gi2tcnbshege","hazdgnjygqge","gy3dgobwgene","gi4tsmrtgage","woshihhh1234","extopcoineos","gu3danzug4ge","gmztcobxhage","giztqmbsg4ge","yzy135134132","haydgnjqgmge","ge3tsobsgige","gi3tonrsgege","gy3tqmbvg4ge","gu4dinztg4ge","gu2dinbshage","gm2dombxguge","gm2tqojygyge","gu3tmnzqgige","gu4tgmrsgige","gyztcmbzgige","g44demrtguge","gmztmmqgenes","gq2tonjvg4ge","gq3dambyhege","gyytkmbugene","gu3donzthage","gyzdenzyguge","mingtianniha","gq3tmmrrgyge","gu4dmmzvgmge","ha3tomjyguge","gezdamrqgige","gu2tcmbzgage","risahavlik13","gmzdsobxgmge","guydmmbqgyge","zoommgotosky","g43deojugege","g43timrvgige","gu2tsmrqgmge","ha3dknzsgige","qjlwngce2hxf","asz3yuotrfbp","gqztmnzxhege","gy4timbqgige","g44tmnzrgyge","supereosc122","gq3dsmztgqge","hezdenrtgmge","gq2dqmjxgene","haytmnrqgage","toolkitproxy","eosadaideeos","g4ytkojwgmge","ge2tknrwhage","ge3tknbug4ge","ha3dmmzvhage","beeeeeeeeeet","chainbwallet","gqydaobwgmge","eosrobbieqiu","he3timbxgene","gezdgmzvgqge","g4zdknzrguge","ha4dsmjzgqge","222eramos222","dcxcapitalzz","ge4tonbygqge","gu2domrzhage","g4zdenzthege","gyztenrzgege","g44tkojrgene","gq2tcmjygige","heytqmjwhege","triple123eos","hezdemrzhage","guytcnrxgege","gmzdqmjugyge","ge2dsnrzgmge","balabalabili","hazdknztgqge","guzdoobqg4ge","keicz32oc1ad","vuuuuuuuuuuu","4takjqrqrq51","gyztkmrrgmge","guztinrxguge","felipe.x","gq3dgnbugmge","gmytqnrrgege","gmydcnigenes","gy2tcobthege","slipstream11","gyztemzwgage","ha3dgnbwhege","gy2tanbxgmge","ha3tanzygene","gy2dgnzuhege","wombatwombat","ge3tanrwgene","ha2dimbrgqge","ha3tqmrygege","gu4tomrygqge","gy3tcnztgmge","geytiobxgene","maladramaham","gmzdenjzgege","hackcontract","haztonzrgege","biboexchange","ha2dkmjqhage","gy4tgmrrhege","g42tamjthage","coscoscoscos","gq4doojtgige","geydimbtgyge","gy2dqobrgage","deuxwowo1234","gm4tmmzuguge","solidusmoney","madox4good24","guydmmbyguge","gqztemrxgage","kkcoindotcom","g43tgnbvgmge","ge4tiojvguge","eoskywallets","geytkmrwgyge","gq4tmmjqgige","baisky123453","gm3tambxgyge","wolfberlinsf","eosscatterw1","he4dkojygene","gqydgmzqhage","g44dmnzsguge","gy2tknzxgene","gizdenbygyge","ge3dkmjtgene","gi3doobwgmge","aaronwangeos","gi2dgojvgqge","lannadanna11","haytgnztgyge","dengxingying","ge2tcnjugige","haytcobsgqge","hezdmmygenes","gezdknbvgene","gu4dambzgmge","giydcnrqg4ge","guztsnzsgmge","bigoneyaoeos","gq3tgnrwgqge","gy4tqmrygege","eosioooookex","gy4timrugyge","gyztkmjtgqge","hezdimjugyge","gqzdcojqgqge","gu3dsmrxgege","maximusay222","ha3donrqgmge","1markpython1","gm4tsmzwgige","gm4denigenes","gi2tqobzguge","jamezjamezja","guzdsobrhege","justfly2mars","gq2tsnrrg4ge","he2tgnzvgene","gi2tsmbwgige","gqytonjtgege","youngprodigy","gm4tknrwhage","gi3tenzsgene","gy2tgmrxgege","gezdqmjzgyge","gyztcnbug4ge","g44dmmjqg4ge","11xinyangrmb","gqytcmzwgqge","geydknrrhege","lxzabcd12345","ddybqnnabjdu","adpen13kwon1","gu4dqmztgene","ge3dcobygege","g44tsobygqge","gm4domjvgqge","hezdgnbsg4ge","ge2dinzqgmge","g44tenjygege","giydomzqgene","eosrlaehdgml","gezdomzqgyge","huobideporit","ge3dknbugqge","jpressler123","ha4donzzgage","haydimbtgege","heytaojwgqge","gy3tgnbygene","ge3donrxgige","ge4dmmzxgqge","guzdomzsguge","gyytanrsgqge","gy2tonzvhage","zhengzhike12","tktmadkvkxm3","tanyaraye123","guydgmjvguge","eosledgerpet","xiajing12345","heytqnjzgage","geytqmjsgqge","gi4dmmjuhage","gi3daojqgmge","ge4tcmzygige","gu2tgmjvgage","giydcmjrgyge","gu2dsojwg4ge","haydgobtgyge","chinachina11","zhoushenghua","heydgnbqgyge","gi4domjvhege","ha2tmmqgenes","gmztgnzxgyge","batokeneos11","yinmeister11","haztamjwhage","edg13xduzc3x","gu2tiojxgyge","g44dsnzwgmge","hezdcmbxhage","gi2tsnbyhage","gmqc1vewuhg4","gyztcmjsgage","gu4dsmbsguge","gy3tcmzyguge","heydgnbqgmge","eos11tanghua","g42dmmjqg4ge","geztaojxgene","gqzdqmrzgqge","g44doobqgege","ge2donzsgyge","haydoobuguge","gu2tgnztg4ge","guztemjsgyge","zypheresteos","gmytinbygmge","gyztcmrqg4ge","gi2diojxguge","gyytqnjtgqge","geytqmbrg4ge","gyzdcnbygmge","gy4dcnrrguge","gm2toojygage","gy4tonbwgene","haydamjvguge","guydaobxhage","he3taoagenes","gqytimjuguge","ge4dqobshage","xiaowuge1111","gq3dsojygege","qcrfwbfwdzte","gu2dgnrqgmge","haytsmzrgege","gameskypools","guytonbvg4ge","g44danbqgyge","g43tsmbtg4ge","guztknbsgqge","g4ztmojsguge","ge3dambvgige","gmztinzwhege","hazdemrzg4ge","whitefamily2","pengtao12345","gqydgnrqhege","g42dqnjugyge","gorjachevs52","ha4tmmrxhage","zoroonepiece","gu4tmmjzgqge","hazdinbvgige","gq3dqnzxgege","gu3tgnzsgege","guztoobxgene","zhaoyang4141","g44damzsgqge","gyydonjxgene","gqydcnztgige","ge4tmnbwguge","geytimrsgege","eos5dloveall","fukaizun2fkz","guydanjrgige","2unplio1jycf","guztqmbrgege","hazdonzsgage","ha4dgmzugqge","gmzdgobwgmge","gy3tsobshege","jtf42ojtf42o","g44tqobugqge","314251gfhayz","ge3dimzygege","jordanwang11","geztambrgyge","denysyarkovy","ha4tcmbvhege","gyzdsojvg4ge","guztsnjvhage","gyztsmzrguge","exxeossendto","gq3dgnztguge","giydkobvgqge","gm4dimzxgege","zhouhuang321","heydanzsgyge","dinnerwinner","gq4dkmjrhage","ge4tcmzwhage","gi3tenbsgene","jaqvldk2nkp3","giytimrygige","guztsmztg4ge","ge4tknztgige","guytomrzgage","ge4denrsgege","gu3tkobxgige","gyydsnzzg4ge","geztqnzsgyge","gu2deobugyge","gi4dsnygenes","g4ytmmjxgege","ge2domjyguge","ge4damrrgage","gy3doobshage","gyztknbvgage","gqytomjuguge","gy4dimrwgmge","bbheasxtlatd","ge3daobxhege","gy2domrvg4ge","coindeltaeos","gy2tgmzvhage","g44donrqgige","heztanrygqge","bibox2wallet","eossnowman11","geydonjzhage","gq2tkojvgqge","kubrickian35","parson1almar","giydcmzsgqge","ge4dkmrxgene","etdapp333333","g42tonruhage","ha4tsnigenes","potocamp1234","ge3dmmjwgage","vicapple2222","gy3dgmjtgige","asiniscalchi","gu3dkmjqgege","gy3dmmjrgige","heydemrzgige","hutiansheng1","hornertrader","liberty11111","gq3tambuhage","gu2tqnbsgmge","willpowers11","gmztknzrguge","gzeosgotosky","gy3dgojqgage","stefanaeschl","ge3doobqgmge","gy4tcobrgqge","gq4tknzthage","gu3dcmbxgyge","geytcnbxg4ge","geytkojqguge","donggedongge","giydoojyhage","heytinbzgege","ge3tonrsgige","gm3dqnrvgqge","gqydgmbyg4ge","gqzdknjyguge","eosmaosichen","ge4diobsgyge","gqzdsnrsguge","gm4dinjvgage","gezdamzwgmge","guzdcmjtgege","gi4tmnrwgqge","gu3tqojsgige","gm3tenbsgige","g4ytknzzgyge","gezdcojqgene","gi3tgobzgage","gy3tqnbwgyge","ge2tsnzyhege","gy3dinrugage","g44tenzzgqge","gm4tmmrygege","hazdmmbzgmge","gyzdsmjqgige","bensigbensig","ge2domzvgege","gyzdmnzugige","gyzteojwhege","heydgojqgqge","gy4tinjsg4ge","gm2tamzugmge","gu3dcmjygmge","guydqmzsgage","tobecontinue","gu4danbxhege","gmzdonztguge","gmztmnzshege","ge4tsmryhage","gi2dkmrqgege","gmzdgmryhage","gi4dombrgege","gi4dgnjzgene","g44dcnrtgqge","gm2donjqgage","whitewoodeos","nualvwtxgb1i","gyytknzygqge","eosbitpanda1","gu2taobqgege","eosbossme111","gy2dmmrwgqge","g44tmmrqguge","myeoscasino1","dreamislive1","haztkmjzhege","gyztsnrzgage","ge4tknztgege","g4ydambvgyge","gq2dknrtgqge","wuk1sigtk3tn","gu2tcmrygene","ge4dknrtg4ge","gy3tqmzwgqge","gyztsnbugene","gu2tanrxg4ge","hezdonrqg4ge","gqztmmrwguge","g44tknbxgage","ge4tenzzg4ge","ha4denrsgene","ge2teobqgage","gu3timzxgene","ha4dknrzgege","gy2dsnrvgene","gm3dcnrrhege","g4ztmojygene","oneapplepkwy","g44dgmzsg4ge","guzdmmbwgege","allcoineos11","cryptreasure","hazdcnzshege","enbcash.e","hezdsmruhege","ha3tqobygige","guydkobvgige","gq4domzyguge","gm4toojqgene","gezdanzqgmge","giztimrqhage","gi4dkojsgqge","haydknrzgage","gezdcnjvgmge","guzdcnbugage","gu2denjshage","gq4dimzvgige","possumlife53","gqztqnbuhage","g44tkmrtgege","ge4dinzqgmge","gq4demzwgige","fangjiaboy22","ge3tsnjugyge","ha2domrsgene","gy2tmobqhage","geytmmjug4ge","kanninnabuer","gu2tmnjvgqge","gm2tknbzhege","gy4dinbthege","gezdenzxgene","gy3dimbqhage","gmytcmzvgqge","wangjun11222","ha3dsmrwgene","iloveyoubp55","g44tinzshege","gq4dsnzrhege","gmzdcobshege","g44tmmigenes","gi3danzxgmge","gqztgmzugene","vsxtfkvqwbml","ruvex2mdjlzw","gyzdgmrsgyge","g42toojyguge","ha4dqnzvgene","gm2tonzygene","gm3damzugene","fairdapp2222","gu2dqmzugyge","gy4tsmrqhage","ge3dknzzgene","gezdenbsgqge","gu2tgmzvgqge","gezdcobzgqge","ha3donbzgige","ha3dgmzwhage","g4zdcnrtgege","g4ytemzygyge","haydcnbugmge","ge3tinrrgige","bedouinwhite","guzdambthage","g4zdanzshege","heytcmzxgyge","ge4danrqgqge","hvhv1islrah1","gnosisgnosis","whaleexcpu2g","geydqnbyhege","g44dsnrxg4ge","gu3dmmzrgmge","matrix111111","gq3tmmjuguge","eosofmonster","nanoxbinance","conanltfxyao","josephcheung","gu3dcnryhege","hezdsnrvgige","eoszgt343343","heydimzygige","heydimjygige","gu3tknbtgage","gi2damrtgyge","gi3dcmrvgmge","tobetiopower","gm3tkojzhage","ha2tmmbrgmge","giytanjwgqge","millywallet1","gu3dqnrsgqge","guztmmrqgmge","gyzdanzzgage","gizdanztguge","ge2dkmqgenes","ge4tsobvgmge","bitfineos131","gu2tqmzvgage","gm4dsnjvgmge","gyzdknbxgege","fiempzdwkfyb","gi3tmnrqgqge","gu2dqobsgyge","gqydqnzwhage","gmzdmmjtgqge","eoshenzhenio","ge3donigenes","wheatwallet1","g44dmmbshage","gm3dcmzugage","gq4domzsg4ge","zhoudurk1234","haydimygenes","guztmmzrg4ge","gy3dgnjshage","gu2temrsgage","gi3danjrg4ge","heydcmrtgyge","g43dgmzrgege","g43doobzgege","gu3dmojzhage","giydsobtgage","hazdgmbug4ge","g42tomjsgene","gmztsnzugige","hazdsobzg4ge","heydmmjtgqge","ge3dombsgige","ge2tgnbygyge","eoshulunbuir","gq2doojugige","ge3dgmzzguge","gy4dgnjug4ge","gi3dmmjsgqge","giytimjzgage","ge3tambwgmge","g44dcojygene","ge4dmmbwgage","eoszhangfeng","heytqobzgqge","h5l3qpc1tozy","dodunri11111","gi4tenrsg4ge","giztsojzguge","gu3dombxgqge","geydkmagenes","gy2diobtgene","hezdomzthage","eosbeautyeos","g44diojsgqge","eoswatermark","gi4dembshage","gm2doojygyge","gu2dmmzvgqge","gyzdsnzygege","gu2denbshege","eospokerlady","gyztambrgage","guzdcnjtguge","appreciabler","heytomzygage","ge4tgnjvgene","ha4denjxhege","g44timbygege","gu4tknjsgage","ha4dgmbxhage","gy2domzxgqge","qijuqi222222","gq4dembrhege","gyytknzsgage","vcgqdyepghel","guytqnzxgqge","ge2dsmbqg4ge","ge3tmmbthege","g44tagenesis","gu4tkmzsgege","gu4deobzguge","ge3donrtgige","yuanzhengeos","gmytqnjxgage","geztambugene","hazdombzhage","guztaobrhege","gu3tknzxgene","gu3dinrygmge","gi3tgmjqgqge","g4ydknjugige","xys521314xys","gm2dsmbxgmge","g43diobqhage","bbgamesadmin","eisenbahn111","michaelhorse","sykv5ecjor2i","ge4teobugmge","gy3damzygene","gmytcnbwgene","ha3diobxg4ge","gm2dooagenes","wanimaoishii","ge4tomrtgege","heydonrvgyge","luismarin123","gq4domrwg4ge","gezdgnzrhege","gi4dgmjxhege","g4zdgmrzguge","ioeos1331122","gy3dknbwgmge","geytkmrvgene","g43timygenes","gmztcojrgage","g43dkmbvg4ge","ha4dgmryhege","bitpieeosoo2","gu4dsojvhege","gizdmnzsgege","makunming111","eosfakerroll","gyzteobxhege","gy4dimrrgege","gi4denbthage","unparalleled","gyytgojwgyge","g4ztcnrtg4ge","guydgnzrg4ge","eos12345xxxx","gyzdonjtgige","g44dqnbvhege","ha3tkmbwg4ge","gmydamrvhege","ha2dgojvgyge","gu2donjxgmge","g44temjrgqge","eosaccountwm","hezdkmbygage","pjczerwinski","guztenruhage","myeosaccouna","haytqnrugage","guydkmzrgage","heyteobtgmge","g44tmnbwgage","gi2dimbqhage","ge4temzthage","g43tmnzyg4ge","gyytqmjwgege","ha4dsmjyhage","gq3tknzyhage","ming12345345","haydkmzzgmge","gu4dgmjuguge","zxcasdqwemko","thatdappguy1","vnsskuxyqmyq","geytambugene","haydcobrguge","12345az54321","ha3tcojxgmge","ha4demzugene","hazdgobzg4ge","vjohgywduxao","gyydkobxhage","gyytiojvg4ge","hazdemzvgqge","g43tkmrrgige","gy3tsojsgige","gy2tsnzugage","g4ydcmjrgene","number2iseos","gu3tinzsgmge","wangjian21ss","kozhivallil1","gi3tinzrhage","g43danjygage","ge3timzrhage","giztmobtgige","ge4dqmbxgmge","41333.e","gy3tcmjugage","g44dqnzwgqge","gi4demzxgige","gi4tamjqgege","g44dqnzwhege","g44tqnzwhege","papabab22222","eoscaramis11","gq2tqoagenes","gu4dgmzygage","g43tgmzqgene","gq3tsobqhage","eoswallet525","gezdqojwg4ge","gq4doojyguge","hezdenzrgege","geydamjtgene","ha4dgmbqguge","up2eaccount2","gi4dcmjtgmge","gq4danzvgyge","hazdcnjrhage","haytqnjtguge","gy4dgmbwgmge","gy3diojzguge","mississippia","eostarteos34","ha2doobzgene","hp1122334455","guztqmbygege","gy3tonjxgmge","ge4tkmagenes","geytmnbwgene","g43tmnigenes","geytkmbqgene","gezdgojrgene","gq2dooagenes","geytknrqgene","gezdimzvgene","gm2tcojzgyge","gu2dcmygenes","gq3dsnqgenes","ge3dcnzzhage","gu4dcmygenes","guztknagenes","gy2tqmagenes","ge3daojxgmge","he3dinygenes","he2timagenes","heytgnigenes","geydemzxgene","ha3tcnztgige","gi4tambwhege","futhuarenesp","ha2dqnbtgage","haytcnjxg4ge","momi.gm","gi3dsmigenes","gu2tmmrqhage","gq4deojwhage","gmztanzwgqge","ge3tsmbzgege","gezdqnrrgige","gezdamztgene","gyztgmzzgmge","yelinvillage","gyzdemjrgige","gu3tknrthege","lemyeospurse","gi2tomrxhege","gu3dimbzhege","ge4timzwguge","heytqnrrgege",".f.i.r.e","gi2tonjvgage","guztinjrhage","gu4tonjsgqge","gu4tgmrygmge","gu2dcnrtgqge","ge2tgnrwgqge","guydknzsgege","guztinbxgige","zinipaul2312","gi2tiobugyge","gy2tqnrugqge","gq4tsmjqg4ge","nvadrzmuzdie","gu2tcnrqgige","geydkmbuhage","vanwuchun123","ha2dknrtgage","gm2dsnztgmge","gq4tgnzxguge","giyteobrgage","gu2dcmrvhege","geytkmzugige","geztimjsgmge","gq4deobygmge","eoslsblsbeos","gu3dsnbwhage","lijhdperfory","gi4dkmbsgmge","gy4tcnrshege","ha2tmnjqg4ge","gyzdenbygege","gq3dcmzqgmge","ha3tanjvhage","gm2toobqgyge","wangyonghuan","gq3dimzzgige","ge4danrrgege","gqzdenjrguge","gu3tonrtgage","geydembwgege","gm4dgmjvgene"
]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	try {
	const options = { authorization: [ `thebeantoken@active` ] };
	const myaccount = await eos.contract("thebeantoken");
	await myaccount.clear(account_name,"4,BEAN",options);
	} catch (error) {
		console.log(error);
	}
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
	if(idx > 20000){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,600,idx)
	
}
			

setTimeout(deleteLoop,1000, 0);


//deleteAccount("eoscafekorea");
/*
accountString.forEach(function (item, index, array) {
  //console.log(item, index)
	deleteAccount(item);
})
return;
*/
			
			
/* for setting new contract
wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
eos.setcode("thebeantoken", 0, 0, wasm) // @returns {Promise}
eos.setabi("thebeantoken", JSON.parse(abi)) // @returns {Promise}
*/
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


                  
                                                                                                                     
                                                                                                                     
