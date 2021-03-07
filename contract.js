const wasmUrl = "./deletecontract/eosio.token.wasm";
const abiUrl = "./deletecontract/eosio.token.abi";

const account = "taketooktook";

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
	"fromfromplus", "touchdown555", "laoshijiddwy", "mtwalletbank", "lingaoqiming", "dextopwallet", "dappteam.vip", "verylucky144", "az1314131413", "iphonexxplus", "topdexwallet", "newyeartoken", "misskissmiss", "whenikissyou", "mustbankbank", "verylucky145", "polandmonkey", "easyeasy1111", "dappgameplus", "dappshoulder", "shouldwallet", "dancerpocket", "mango55mango", "datedatedoor", "polandwallet", "dushenchudan", "somebodychat", "duckduckplus", "hoocompocket", "gqztknbygmge", "gyytsnrugage", "gq2tanjsg4ge", "gqydcnjwgqge", "gm2dknjxgyge", "gqzdimbthage", "liuzhongyi12", "gi3tqojqgqge", "ge3dambtgmge", "geydenrug4ge", "gmydmnzvgige", "lovetotravel", "gu4tgmzug4ge", "tenmilldllrs", "gqztcmrsgyge", "guzdinzqgqge", "gqztimbrgige", "gqzdknjwhage", "gu2doojvguge", "byteosmaster", "ge2dsmzwgage", "ge2tanbvgage", "ge3tamjtg4ge", "ge3tmobygmge", "hazdqmjuhege", "guytiojyguge", "gq2tcnzvg4ge", "guzdgojtgyge", "gq4tsmbrgqge", "gizdknjyg4ge", "gmztqojzgege", "gm4dambqgene", "haydaojygyge", "gqydmnjthege", "ge3tomzwgege", "gmzdimzvhege", "g4ydmobygige", "heydoojtgage", "ha2dinrshege", "gq4damrwgege", "gq4denzsgige", "gm4toojqg4ge", "ge4tamzygyge", "ge2tiojrgege", "heydinjrgmge", "ha3dinrsgyge", "ha3dgnzugige", "dotds1234543", "geydomjshage", "rn2222222222", "ha4tmmjqgige", "gi3tkmjwguge", "hazdanbygqge", "gyydcmzxguge", "heytkmrsguge", "giztombrgqge", "geztmnjshage", "gmztcnbxhage", "floating3232", "g43domjxgmge", "gy2dinjygige", "g44tqnzqg4ge", "guytomzwgige", "ge3domjwguge", "gi4timryhage", "gi4tinbyguge", "gi4tenrxgage", "gi4tkmjuguge", "he4dimbzgene", "heytamrtg4ge", "ha3damjzgene", "ge4tgmrvgmge", "ge4tgmrtgige", "aaaa12121122", "gi3tcnjtgyge", "whatyoulooka", "guztmnbwguge", "hezdqmzxgige", "gy3tsojtgyge", "gmzdanjugmge", "gm4dkojxg4ge", "gyytgmrzg4ge", "ha3tomrwgqge", "hezdsnjxguge", "gy4dimjzhage", "qpfmfflsrnrn", "gy4tmnztg4ge", "eoslimitless", "ha2temzxhage", "gu3dmnjxgmge", "gi4dqmzvgqge", "gm2demrvgage", "eos515111111", "g4ydimbsgmge", "ha3dqobwgqge", "hezdgnrrgqge", "haztknryhage", "guytamzzguge", "gqydmnrzhege", "haytimbvgege", "heytknbthage", "gu2daojwguge", "gu4domzsgyge", "gyytenjvguge", "hellodoujian", "galaxyeos123", "gmztiobxhege", "gmytqojwhege", "g43tcnrqgige", "gi2tonrrgege", "gyztmmjygmge", "gyzdcnbzgage", "gyydmnjugqge", "handshakehns", "gy2tgmbwgige", "boparticle42", "gy4daojwhege", "eosjasonlisz", "gqydimjwgage", "fuckamerican", "gq4tqojxg4ge", "heydknzxgyge", "gu3tinzug4ge", "gm3tenbqgege", "haytimzrgige", "hezdeobwg4ge", "gu3tanbwgqge", "gmytemztgyge", "ge4tqojwgage", "atoken131413", "gizdembqhege", "gizdkmrrhege", "ha2tmojzgmge", "seauniv21eos", "gi2dgmbxgmge", "haytemzvgage", "g44dqmrrg4ge", "gy4dgmjzgmge", "undefinedeos", "ha3dsmrwgage", "hezdimrxgmge", "gq3demrqhage", "ha3dcmruhege", "ha3tcmrqhage", "ha4tknjugege", "heztaojsgige", "haydmojugage", "hostchsoo123", "abcdymm12345", "g42dambwgyge", "heydenbugage", "gi3dknrvgage", "mastercrypto", "gmytqmztgmge", "ha2tonjygage", "gizdimrsgage", "ha2dqmjtguge", "ge2tqmzyhage", "gm2tenbwguge", "gyytsmrwgege", "gyztcmrxhege", "haztenbtgmge", "g43tonzsgage", "gi3dmobygege", "carlosgao221", "heydaojzhege", "gu4tenryg4ge", "hezdsnjsguge", "gi2tonrugige", "yangchunbude", "g4ztmobsgmge", "hezdinzsgyge", "hezdkojugqge", "heytsnrzgege", "haydknzsgqge", "gm4danzwgyge", "gq3domzrg4ge", "guytsmbyg4ge", "gu3damrugage", "haydsobqhage", "geydcmrzg4ge", "gq4tmmjtgmge", "gm4tsobugyge", "haytmmrugene", "gy4dgnjzgyge", "eosthupkueos", "hezdgojugige", "ha4dmobtg4ge", "gezdqmrqgqge", "ge4tsmrqgene", "ge4dsnbyg4ge", "g42dmojzg4ge", "ha4dmnbygqge", "ha3dsmbshage", "g44tqnjugige", "gy2deojthege", "gy4danzugmge", "gy4tqmbrgage", "gu2tomzqguge", "nicetokenbox", "gm2tgmjwguge", "gu2tqnbwgege", "heytqmbwhege", "caoweihuang5", "gqytsmbyg4ge", "gy2danbzgyge", "guydknbqgmge", "hezdeobvgmge", "haztonjwgqge", "geztenbvgage", "cathy1122333", "44fkgtawakch", "gi4dknbtgmge", "gq3tknjsgage", "ha4damrvgige", "naraeknights", "g43tmmjzhage", "gu2dqojtgyge", "haytinbygage", "gu2doobvguge", "guydembrgyge", "gizdinbrgqge", "ge4dqnbzg4ge", "guzdenzsgmge", "gu3timjwg4ge", "gy4tcojsg4ge", "haztembvhege", "haztimztgmge", "gu2tambqgyge", "gm2tembqgage", "g43tombugige", "ha4dmmzxhege", "davemillseos", "g43dkojxgege", "g43donjrgmge", "prakaikai345", "gmztanbrgige", "guzdkmbvhage", "hezdinzygege", "gmzdeobwhage", "g42demjugqge", "gm3deobvgege", "geydemzyhege", "gq4dgnrxguge", "gmzdomjthage", "g4ztimrrhege", "gu4temzugige", "gm2tgmbzgage", "gm3dsnbzgyge", "g42tcojtgyge", "g4ytmmbrgene", "gu4tcobuhage", "guytonjyhege", "g43tqnrzgyge", "gezdgnrqgige", "gezdenjxgmge", "gyzdmojtgyge", "g44daojugage", "gy2timrzgege", "ge3tomzxgyge", "ge4tmnjvg4ge", "gm3doobxg4ge", "gi2donzsgqge", "he3dinzrgene", "yifanaaaaaaa", "markbright11", "g44tqojrgege", "gy2dkmrug4ge", "worldwiseman", "noegonczeos1", "gm4tmmrxgmge", "ha2tkojyhage", "gvt2pm2nygeq", "gy4dcojzgege", "gu4tonbxgege", "gu3tgobzhage", "gu3tgobxguge", "ge2tsnrrgmge", "ge4domjrguge", "ge2dkmztg4ge", "g4ztknrtgyge", "gy3dcojthege", "guytombvg4ge", "gu3timrvgqge", "gy4toojzgige", "gi4tgnzugyge", "ryhjg5bx3zs1", "gy2teobqgige", "gyytkojsgege", "exshellregis", "hazdanzwgmge", "lovelilailai", "ha2tcnzrhage", "gm3diojrguge", "gpwk1jswitz4", "gqztqmjtg4ge", "ge4dknztgige", "gu4tcojygmge", "hezdinbxhage", "gy4tgmjsgyge", "praadvertise", "haytmojrgqge", "gy4donzxgmge", "wuchengchao2", "xinheng55555", "haytqnjxgmge", "guzdanrqgqge", "gu2dqmjyguge", "geytqojuhege", "gq2tqobrgyge", "mengwuhen522", "g4zdkobug4ge", "gu4temzxhege", "gm4tsobwgege", "gi4toobzguge", "alovelydayyy", "g43taobsgene", "g4ytsmzsgege", "gezdqmygenes", "yxh555555555", "ha4demrvgqge", "gyytoobxgmge", "gy4dsobsgage", "geytcmrrhage", "heytmojxgege", "geydonzwgyge", "g44dcobsguge", "hazdaojwgage", "sinsin123123", "gq4daobrgege", "heytanzvgege", "gqzdimrxg4ge", "gq3tqojsgyge", "gm3tonjsgege", "bunyt4v15vsn", "lz2atzvkqtw3", "gmytinjwhage", "gu3dsmrsgage", "g44tmnzvgene", "ha2tomjsguge", "gi2donbtgage", "gm3tcobxgyge", "haytsmbzgmge", "heytonjvgmge", "gq4dgmzugage", "cqfangshaoxi", "eosvanlucels", "ha3tanrzguge", "goodeostoken", "gqzdqmrrhege", "remotehorst5", "gy4dcmzzhege", "cgeosmainnet", "hazdsnbtgage", "giztgnjwgyge", "gu4tomzwg4ge", "benzcarowner", "gm4tinjrguge", "gq2domzzgqge", "gm4tonrxgmge", "gm4tsojqgage", "gm4danjvguge", "gm4damrugege", "gm2tonjzgyge", "gm4dimrxhage", "gm3dimrqhage", "gm2dcmzwgyge", "gu3tamjvhage", "gi4donzzgege", "gm3tqnrzgqge", "gm3tqnrsgmge", "gu3temzxhege", "gq4dmnbzguge", "heytinrvguge", "ha3dqnbwg4ge", "gi3tamrygmge", "guztqojugege", "g4ytgmrrhage", "gy4temjyhege", "gmydkmzsgage", "ha3dgnbvguge", "quenteen2fix", "gm3temzzgyge", "geydknryhage", "ha3doobuhage", "gq3tgojvgqge", "gq3tcojwgage", "haydiojuhege", "ha4dcnrxg4ge", "peterloveeos", "gy4tmnjrgege", "gi3dkmbxhege", "gi4tmnbzgege", "gi4tqnzygage", "gmzdgmjwhage", "gyytonztguge", "heydoobyg4ge", "guzdkobsgqge", "giydknzvgene", "gu3tinbtgene", "gm4dgobxhage", "gmytenbshege", "ha4tcmzrguge", "hezdinbqhege", "hazdmmrtguge", "godelescher1", "gqzdsmrugege", "giztinrxhage", "heydeobtgige", "gq2dgnrtguge", "raoyu1234543", "g42damjugege", "superairping", "gu4timbwgmge", "gu3teojsgmge", "gq3teobug4ge", "gq4dambzgage", "gy4dimjug4ge", "hazdsojwgage", "gu2tenjrgmge", "gq3dinrtgene", "wangbin12312", "gu4dcojzg4ge", "ge3tamjsgage", "gq2tsojqgege", "gi4doobtgmge", "g42tqoagenes", "gu4tsmqgenes", "g44denrugege", "gm4dmobwhege", "gaoxing12345", "ge3tanrrgige", "ha4tmmrugege", "gu4tcmbygmge", "gqztmnzsgige", "hezdanbxgmge", "gy4dgobugige", "hezdmobzgyge", "myeoswallets", "guzdanrwhage", "gizdomrwgmge", "gi4dmnrrg4ge", "zhzhenhui125", "gq2tsojwg4ge", "g42tqnbvgmge", "gq3tsobsgege", "yesokgood111", "thebluebirds", "hezdambvgege", "geytanzyg4ge", "gi3tmnzsgqge", "samiseossafe", "gq4tgmjuhage", "purplusnow45", "g42tombqgage", "g43tqmrwgene", "gi3dqnrygmge", "gu3dgmjvgige", "ha2donzsg4ge", "gu4dombwhage", "4jmn1v52n4x5", "gu4dimbzhage", "tomasdolezel", "nismostacks1", "garlicbutter", "ha3tcnrygege", "g44dgmrugage", "gu4tkojxgege", "gi3tqnryhage", "gq2tinrrguge", "gq3deojwgage",
	"gyydmojtgege", "gy3dqojtgage", "gy2dgnjzhege", "ha3demrvhege", "gi3tmmrtgage", "gyytknbugyge", "ge3tonbsgage", "gu3tsmjqhage", "zhaoxiang123", "ge4dgmjtgqge", "gi3tmmrsgage", "gy4tamzqgage", "haytcojrgege", "g42tgmjtgige", "gqytgobtg4ge", "ha3denjwgmge", "gq2dmmrqguge", "gu2dqnbqhage", "gmztcmjsguge", "dianadanielf", "h1upegyhm3j3", "gy4dkmjugqge", "gu4dgmjyhege", "gi4dgmzwgene", "g44tgobsgige", "gqydkmrrhage", "gu3tmmbyguge", "bonniesickle", "haztmmrtg4ge", "g42daobygege", "g44tqmzrgege", "heytqmjvgyge", "gq3dmnbsgmge", "jungbinkimss", "jjjjyyyytttt", "gqzdqnjwgqge", "gq2tsnzqhage", "gu4domjsgyge", "geydgojzgene", "g4zdcmzyhage", "walkergrey12", "gqytsmzrgige", "gqydmnjwgege", "amani.x", "haydamzxgmge", "gu2dkojzgege", "yepea25vl5ty", "bmkdj2rkwc5z", "gi3danjwhege", "gm2tenjsgyge", "gmztqmrsgmge", "goodluckeoso", "gmydoojwgmge", "ge3dcnbqgage", "zhangljiaeos", "giydqmbqhege", "gm2domzsgige", "riflepack114", "riflepack112", "whatwherehow", "g44tenbrgige", "e555ces5vpmz", "gqydgobtgqge", "guytknztgqge", "gq2dcmrvgyge", "g43dqnzwgene", "g43dgojugene", "g43tamjsgene", "gmydknjrgige", "gmytonzthege", "gi4tombugene", "zhaoweiyuan1", "mazitongshe3", "gmydqojxg4ge", "g44dmobxg4ge", "zenithse1211", "gq2demzygige", "master2maker", "gyztcmbsg4ge", "gyztanzxgige", "guzdcojxhage", "hezdqmzxhage", "gm2tknbugage", "gu2tgmrrgene", "gi2tkojtgege", "g43timjxgqge", "gqydkmzrgege", "ha4dknjzgqge", "gm4dcmjtgage", "heydqmrtg4ge", "gu2dqmbrgyge", "azj135135135", "gezdkmbwgige", "vkdpfhsvkdp2", "eossevenluck", "gi3damrxhage", "giytsmrrgene", "g4ydambsg4ge", "chenqiang321", "geytiojtgage", "gyytsmbtgqge", "gqytknzugige", "g44tomztgmge", "g4ytgojrhege", "g4ydkmjrgyge", "g42dgnbugage", "gy4tanjxgyge", "g44tgmbug4ge", "ha3denjygmge", "guztqnbrgmge", "heytonjwg4ge", "gq4tonbsgyge", "gi2tkojwguge", "gq2dgnzuhege", "ha2dinrxguge", "gy2teojsgyge", "hazdqnjygqge", "g4ztimzzgene", "gq4tinbygmge", "haytimjrguge", "g44dqmbtg4ge", "heydinzygmge", "ha2tonjygmge", "g4ydgnagenes", "ha2tmmbygage", "gm3dgmbug4ge", "gq3timjugqge", "gy4tamztgege", "ha2tsojuhage", "g4ztimbvgene", "ha3tmojyguge", "gi2tcmbrhege", "gyztsojwgene", "cdma12341234", "gi2tenrqgage", "gqydimrvgage", "giztgnrwgige", "gu4dsmrwg4ge", "gm2dgmzqhege", "jiyoungan12j", "gq4tknbtguge", "yanjingeosio", "ge4tomrzhege", "gq3dmnbzgene", "ge4taobygqge", "heydcobygqge", "gu4tcmbsgege", "gi2tgnbrgige", "oliviachan.x", "gm2tkmryg4ge", "hezdcnbzhege", "windwildseos", "gq4dgnzwgmge", "guzdkojwguge", "ge4domjzgmge", "gi4danzxgyge", "chen1eng1232", "geydemzwgene", "gqydgnjshege", "g4ytgnbsgage", "gq2tambrhage", "gy4tkojqg4ge", "eagleskyborn", "giydknzzhege", "gi3dmmjwgyge", "yanghuanan13", "gmzdeojrgage", "gy4tanjtgige", "g42dknzxgage", "ha2tqmbwguge", "gmztkmrtgmge", "g42tomzzgige", "myrocketfuel", "g44dinzygyge", "gyytenrwgqge", "gu2tamzrhege", "gyztcmjqg4ge", "gi2tcnbtg4ge", "g44toobwhage", "ge4tcmjqhage", "guzdkmbxgmge", "blackmirrorz", "gu3danjqhege", "gq2tambyg4ge", "gqzdimjugmge", "gi4tsmjzgyge", "gy2dcnzwgmge", "gi4tanbygege", "gy4demjxgqge", "gy2denjugene", "suhahuizuinb", "ge3dcnbshege", "ha4domzxgqge", "u5rwzcs4st4k", "gm4tkmrshege", "osmanxwallet", "av.io", "gu3tinbrgyge", "gqztonjtgige", "hazdinzwg4ge", "haydimjtgmge", "gq4dcnbsgqge", "gu3dcmbvgqge", "ha3tcmjwgige", "gqzdonrqgage", "gm2dqnzwgage", "g43dombygene", "gyztenbwhage", "ha4dqmrygyge", "ha3dkmrzhage", "gm2dqnzsgqge", "gu3tknjzguge", "g42dambvg4ge", "hezdamjugyge", "gi4danrwg4ge", "gmzdkmzyhege", "gu3tiobtgage", "geytomrqgyge", "geztanjwgige", "guztgmjtguge", "gu3dinjxg4ge", "gu4demrwgege", "weimjrobot13", "gqytsmrthege", "gy4tinrzgene", "gmytcmzrg4ge", "gq3tgmzrgage", "gm3tiojyhage", "gu4tcmrygige", "gqytqojsgige", "hezdmnbxguge", "hezdkojugmge", "haytembzgege", "gqztknjvgmge", "gmzdamzsgage", "gy4tkmjvguge", "gy3tqnbwgqge", "g43dkmjxgene", "gy3tinrvgene", "gq2dkmjrguge", "gm3dqmbugage", "gy4damrrgige", "ha3tkmzvg4ge", "justgamemora", "geydenbugene", "gmzdsnjygene", "gy2dkobygene", "ha4dgnigenes", "gmytimbxgige", "gmytgmrrgage", "qweasd141211", "gmytkmjzg4ge", "hazdemjygyge", "gi4domjxhage", "guytqobzgege", "xulinweisisi", "heydcobshage", "gmytonrrhege", "tutankamun23", "allgoodwater", "gmytombxgmge", "gqyteobwgmge", "gm4dimrrgmge", "gu2tonzqgmge", "gm4tkmjvhage", "gmztiobugege", "gu4demrsgage", "gm3tkmrwgqge", "gi2dimbtgige", "ramistrueeos", "ha3tmnrugyge", "gyzdsmjtgmge", "xiaojingzhi1", "wxfeosqb1231", "ge3tgojyhage", "g43tcnjxgqge", "forzagrifone", "malongeos123", "xiaoheizhu11", "heydaojtg4ge", "ge3dsmjqguge", "guytmnjrguge", "gq4dgmzqguge", "gi4damrzgage", "11yi11yi11yi", "sssszzzzrrrr", "wzixunwzixun", "geydsmjuguge", "gqytoobygmge", "gu3tinbshage", "ha2temjxgage", "jiaoxiaoce11", "judyjudyjudy", "hezdgmjwgige", "zhenromeo333", "gu2tonjzhege", "mattiasistan", "gq4dambwgege", "geztcmjvgyge", "gy2tonrrg4ge", "gmytcnrqgage", "gq3dcnzqhege", "guytcnjtguge", "geztanjxgege", "hezdonjsgige", "gqytonzzgage", "heydkmrqgege", "xv5m2jbrc3br", "ge4dkmjqhege", "gm3tkmzsgmge", "ha2toojsgqge", "g4ydonjsguge", "warfollowsme", "g43donzuhage", "gy4dkojrgqge", "gu3tsmrwhege", "hazdambrhage", "gq4dqmrtgige", "xiaotuzi1234", "fengke123455", "gm3tqojvgmge", "mahdidavoudi", "gy2dimjqhege", "he3tmmjsgene", "gi3dqmzwgyge", "gi3tinrqgmge", "gy2tenrrgege", "g44tmnzzgmge", "gm4dgmruhage", "g42dmmjvgqge", "gi2tqmjsgqge", "g42dgmrugene", "willowliuliu", "haydcobrhege", "josephpierre", "heytanjtgmge", "g42dsobwgige", "s3gpvjdg3cbp", "gi3toojtguge", "ha4dqmbugene", "rexscatter11", "hazdqmrwgene", "haytmnzzgage", "gu4tmmzygige", "guydmojvguge", "giydcobvgqge", "haztmobrhage", "ha4tgnzvhege", "gm2tonjsg4ge", "ge4tenzugage", "guydgobvhage", "lifeisgreat5", "gmzdanzsgige", "gu2tsmrshage", "ha2dgojrgqge", "hezdmmzygyge", "bellaartemis", "ha4tmmrzgqge", "gq2doojtgyge", "ge3dmnjzgqge", "gq4dgnzrgyge", "gyytenjzgqge", "gq2tsojxgqge", "gm4deobwguge", "jpwallet2244", "haztmnbuhege", "guydemjxgege", "gq4timbqhage", "junjiewallet", "giztonzyhage", "gu4dgnjrg4ge", "gu4tqnjzgmge", "gqytamzuguge", "gy3dcmzugyge", "giztanjuhage", "jasonhilleos", "gy3dgmrvhage", "guztsmrtg4ge", "wesalexander", "ge3dmnzvgyge", "gsymxxgsymxx", "hazdsojqgege", "gm3demzugage", "gq3timbxgmge", "gqydcmrugege", "guytqnrrgyge", "darrenbonse2", "g4ytiobygege", "gmytgmbtg4ge", "gu3dimzugage", "guytinjrgage", "gqzdqmbvguge", "w2sa3abcdeos", "ge2dknrsgene", "gmydknzsgyge", "gq3dcojuhege", "ge2diojqhage", "gq2tmobrgage", "guydkmrrg4ge", "guzdmmjzgmge", "gu2dgnrwgege", "gi4tgnjsgage", "gu2dcmbwhage", "guztenrtgyge", "geztcnjyhege", "gmzdgmjxgige", "gmzdinbxg4ge", "gmzdanrrgyge", "gmytsnzvguge", "1brarqrskwwq", "eosurosalcom", "ha3dcmrwgage", "aaa12345aaaa", "gy3dgobshage", "zhaodabao321", "gq2tgojwgqge", "g44tsojugige", "guzdamrxguge", "gu3dgmbqgige", "gqztenbqgmge", "gq3tsobthage", "titantse4321", "gezdinrrgmge", "miao555yh333", "ge3deojvhege", "futurecolazb", "gm4tenrqhage", "g4ydqmbvgmge", "gu2tkmrzgage", "aazz12345123", "he2tqojzgene", "gyzdmnrzgige", "luguozhiwww1", "gm3dambygege", "gm3tcobqg4ge", "gmztmnzxg4ge", "hezdonbxhege", "vayaskte5w5y", "gu2dqmztgqge", "gu2dqojqgege", "gyytkmbrhage", "gqytknjvgmge", "gqytmmjthege", "ha3tmobzgqge", "gy4tamjtgige", "he4tmmjygene", "gu3dembugyge", "smallwoods22", "keepthefaith", "g3zdonjygmge", "hoorooobloke", "g4ydemzzg4ge", "gu4tonbzhage", "ha4demrwgege", "hezdcnbwg4ge", "gm2dimzzhege", "5w3haoxinghp", "geydgmzwhage", "gm3dcnrzgmge", "gq2tgnbtgige", "gqydinjtg4ge", "gi3dgmbsguge", "xuxuan123451", "u2mg5pbt2dhf", "gi4dinjwgige", "gi3doojwgyge", "giytmmjvg4ge", "g42tcnagenes", "gmytqnbwhage", "ha3domruguge", "ha2tkmbtgene", "g44danzwgmge", "gy4tcmzxgege", "appleappleos", "g44damztgege", "he3tgojugene", "haztomzzgage", "ha3dinbzgyge", "guzdsobygage", "gyztsojygene", "gi3timrxgmge", "chendaige124", "gu2danzsgige", "gqydkmzwhage", "gq3donbxguge", "haydemjxgmge", "gu2tsmbqguge", "ha4dgmjqgene", "guztanjzg4ge", "ha2dsojvhage", "g4ytmojzgige", "hjfzyllyzjfh", "gyqhut5o3klx", "ge4dsnrtgige", "eosknightsav", "ge3dsmjwhege", "gmydmnbvguge", "gm2domrrgige", "gm3tqmrxgage", "lrl123451234", 
	"t2p5c4cc5cxq", "gq3domruguge", "heytkmrtgege", "hezdcobxg4ge", "ge3dgojvgege", "gu3tcobrgyge", "ha2tknruguge", "ha3tinrqg4ge", "gmydoobygige", "g43dgojxgene", "gi2danzthage", "gmztsmjqgage", "gm3tqojqg4ge", "g44tanbygege", "hazdsnjzgmge", "heydcmjugege", "eoscometosun", "gq4dmojsgage", "g4ydonzvgyge", "g4zdsnjwgmge", "ha2tsobygmge", "eosgolden123", "zhangzongwu1", "g4ydmnzwhage", "ge4dcobrhage", "gy2tmnbqgege", "geytinjsgyge", "guytiobqg4ge", "haytomjrgage", "gm3temjyhege", "gm2tknzsgmge", "gu3dmnrvgage", "gqydamzwhege", "gm2tamjwg4ge", "gu2tqnzqguge", "sailsureos54", "gy3tcnzrhege", "gi3dsoagenes", "hezdonbuhege", "heytimrsgage", "g44tcmzwgqge", "gy4tsnjugage", "gy2damrvhege", "gqytsmbsgqge", "moazzamakhan", "gq2denzqgyge", "guydgnzzhage", "hd25fkbwpuaa", "eos1dawn1wyc", "hezdqnbsgmge", "ha4dembshage", "geydanbqgege", "gmydinbzgyge", "gq2dinrwgige", "leftwing1111", "gy2denztgege", "g4zdenzzgene", "gy4donjtg4ge", "giztqnjwguge", "gi3damrwgqge", "g4zdeojsgqge", "gqytkojwguge", "gq4dcnbzhage", "gm3tsnzzguge", "gqydgmzrhege", "ha4dgmrqhage", "g44tenjqgmge", "gy3tsojyhage", "gm4dknbxgmge", "g43tembqgige", "gi3tmnryguge", "gqzdmnjzgqge", "gy2dcnrrgyge", "gmzdamzxgege", "g42tanzvhege", "ha3dcmrug4ge", "giydqnjtgege", "hazdsmjrg4ge", "julienmader1", "ge4tinzsgmge", "gi2temrsguge", "g42dimrthege", "eoseosfafafa", "dimension441", "guytmobvguge", "gyztmnzvguge", "gq4temjwhege", "gmydeojrhage", "g43tqmbtgege", "ingrapefruit", "gu2demjygage", "minibaby5555", "gq2toojugege", "eoschengdusc", "ha3tombug4ge", "gqzdombvgqge", "eosiomaxgreg", "gi2dqnrsgqge", "haytcobsgmge", "haydinzzhage", "gyydcmzxgene", "elonthwallet", "gu4deobygage", "g43tqojugige", "geztaojvhage", "gm3tcmzvgqge", "g43dcnztgege", "jwiltshirejw", "gy4dknzzgege", "g44dmojugege", "gu2damjvgege", "gq2tmmjvguge", "ge3tkmbrguge", "heydgobwgege", "gyztknbshage", "giydsojyhage", "gu2dqnbygege", "gu4demrugmge", "g43tknrtgene", "gi2dmmjwgige", "gq4dcojtg4ge", "ge4tcmbsgmge", "ge4dgmzrg4ge", "gq4dknrxgage", "gm4tqnbsgyge", "gu2tenbygyge", "ha4donzygene", "heydqmrtgene", "ha4dknrwhage", "gi4tanbqguge", "ge4tmobuhege", "kongcrypto11", "gu2dinzrgmge", "gmytomzqgmge", "gi2tmmbugege", "gm3dgmjqgege", "ha4dinbugqge", "gm3tanrsgege", "gmytgmrqhage", "steinberg123", "ha2tsmjwguge", "gmytomzsgage", "gu4tonzygqge", "gmytsojtgige", "muyiloveseos", "g4zdcmrxgege", "gyytgnzvg4ge", "hezdanrxhage", "w5od1cebcpcg", "g4ytkmrwgyge", "haytomjtgmge", "gmzdcmjzgqge", "gy2tqnjzgene", "gi2teobzhage", "gyztanzuhege", "gm4tmmjqgage", "gm2tgmbvgage", "g4ztamzqgqge", "gi4tomryhege", "imeosimeos11", "gyytcobzguge", "gyydmmzygene", "bitopro12345", "yumingch5555", "gm3tanbzgege", "gqzdkmjsgyge", "gmzdgnjygyge", "hazdqobrgmge", "gy4dgmjshege", "gmytqmzzguge", "hazdonbtgege", "gu2tsobygige", "gq4dkobwg4ge", "gizdqmrqgmge", "gu4dgmbugige", "ha4danrzg4ge", "gm2teobsgqge", "yuhaita12345", "gi4domztgege", "babaibashiba", "gi2dinbsgyge", "gq2domzzgmge", "guztiobsgege", "guytknbyg4ge", "3333eos33333", "gm2tgobvgmge", "ha2dmojsgage", "hezdmmbrhage", "qqexeos22222", "giztoobzgyge", "unclelei1234", "guztamjthage", "g4ydqobugege", "guytsmjvguge", "guytaojzhage", "gmztcmbzguge", "geztaobygqge", "ge4tgnzuhage", "he2tgmrxgene", "gm4tknbzgage", "twksosdotcom", "gy4tonjsgege", "guzdimbrhage", "haztcojvgmge", "ryfk1xgtfb2y", "gu4tanrvgege", "xiawenhui123", "gi3danrshege", "giztqmygenes", "gizdomrqgmge", "haytqnbwgige", "g4ytkojwguge", "gq4taobyg4ge", "chainvideoio", "gq3dgojsg4ge", "purung212123", "gi3tambsg4ge", "guytmmrug4ge", "gqydoobzgqge", "haztinbvgqge", "gy2tkmrwgqge", "g4ytcnjygene", "g4ytmmbwgene", "gq3toobrgege", "ha4dkobqgage", "giztcnjzgene", "guzdsmrqgage", "geztknrygyge", "gy4dqnjwgqge", "hezdcmjygyge", "wudong113355", "ha4tcoagenes", "ha3tkmjygige", "gy3tgmjsgege", "hezdenrtgage", "gqjzkjhkhbdc", "gu3timbzgmge", "srassociates", "hezdonzwgmge", "gm4timzxgage", "gi4dsmjugmge", "gq2tsnzshege", "giytgnzqgage", "gm2dgobqhege", "g44tkmzvhage", "gq4timrsgqge", "heztcmztgige", "g4zdemjzhage", "g4ztanrzhage", "gi2dqnbygqge", "gm3dsnrrgqge", "ge4dsmjrgige", "gy3timzxgage", "gmzdgnrtgege", "1maybepeter1", "adeoseoseos1", "xkguoqianbao", "g44dqmbwgyge", "g4ytimzwgage", "gqytgnzsguge", "gm2tinjygyge", "gqydgmrygmge", "gizdkmrtgige", "hezdoojtguge", "heydsnzshege", "hezdqojsgege", "limelodge111", "gm4tenzsgene", "gu3tgnzugage", "g44tkmzqg4ge", "gmydiojxgige", "geydemjxhege", "gmydkmbsg4ge", "gm4dqojzgige", "gm3tmnzzgyge", "gq3denbzgage", "hazdmnjygage", "gy4tcnzqgige", "geytkobthage", "guytgnbsguge", "owocowy12345", "ha2dknzwgige", "gmydonrygmge", "hezdaojtgmge", "eosiotoupiao", "heydkmjtgmge", "ha4dkmrygage", "gmztanjsgyge", "g43temjqgage", "g44dcnjtgige", "hemantsahela", "gq4tanygenes", "haytcojqgege", "guztqojxhege", "gq4tonjxgmge", "gq3tenbvgege", "gmytcnbwhege", "gi4tqojugqge", "haydenjwgmge", "biggamerefer", "gu4dimzygyge", "g42dkobygyge", "webframework", "gizdamrsgene", "murrrrrrrrrr", "gu4demzxgene", "heydenbygqge", "hynjhyun1212", "ge2timjsgmge", "gu2dcnrzhege", "g43tgnzwgene", "boqueronesia", "gqztonrsguge", "gq4tembtgage", "giztqmjtg4ge", "gm2tomzqgyge", "ha4dqojsguge", "gyzdoobvgige", "g42dknrwguge", "ha4tonjrgmge", "gqytqnrqgege", "gq3tmobxguge", "guydknzvgege", "geytoojygage", "ge4tgnjzgqge", "ha2tknjtgene", "gy4tsnrxgage", "heytenrthage", "ge3donbsgage", "g43dkobygyge", "gi3dkmzsg4ge", "gy4dmmrtgene", "alex.game", "gi4dknbrgege", "hezdeojxhege", "haydqobsgqge", "huifacai1212", "g44tanzvgage", "hezdsojrhege", "haztgmbrgige", "giydgoagenes", "lmtme1111111", "iamlaogaoeos", "kimduckkyum1", "gi2dgmrvgene", "guztcnjygqge", "eos4ueos4you", "g4ztamzsgyge", "gy4damrsgene", "ha4dkmrzgene", "ha4dqobvguge", "ha4timrygene", "g43toojvgige", "giytsmbrgege", "ub152olncic1", "ha2dmnzsgige", "haztcmzyhege", "geztmmbsgmge", "beautifulleo", "prajialei311", "gq2dmmzyg4ge", "gu2tcnrzhege", "g43tqmrugqge", "heydqojrgene", "guzdkobsguge", "eosgoldexfee", "ha2tenbqguge", "muktadirkhan", "gm2dcmbthege", "gm2dcmzrgige", "gyzdgmzygene", "andrychowski", "laveoswallet", "haztonrsgage", "geydqojrhage", "gm4demjzgage", "gm4dsmrqgage", "heytmojrgige", "gm4dsmjzhege", "g4ydanbrhage", "gqydombtgege", "ha2tqmjxhage", "giztemrqgage", "gm4dcnbugage", "qq1234554321", "geztanrsg4ge", "guytmmzvgyge", "gy3tcmjuguge", "ha3tonbsgyge", "gy4tcojugene", "gezdqnrqhege", "g43toobyhage", "ha4dqnjvgege", "ha3tsnzzhage", "gi3dimzzhage", "hwg111111111", "g44tmnjugmge", "heytamrxgege", "gi3dgojxgmge", "v1c2y3srcxgz", "guzdeobwg4ge", "gu2dsobshege", "shenlihuaeos", "gm4tsmrzguge", "ge3dimbqg4ge", "he3tanzygene", "ha2tmnjtgige", "ge2tsojygqge", "gy2damjtgage", "gm2dkobsgage", "bleecoin1234", "gyytomryg4ge", "xiaoguai1214", "guydmmjugige", "geztemzsgige", "giztcmjzgege", "gqzdamrzgege", "ha2dmmjzgage", "giytinrxgmge", "ha2dinbtgege", "gyzdanjxgage", "hezdmnjygege", "guydgnzvgqge", "ge2tmmbsg4ge", "g44dgmzrg4ge", "ha3tknjsgige", "g4ydoojxgige", "guztqmjthage", "zguopeng1212", "eosguaguale1", "ha2dgojvgqge", "ha2tmnzvhage", "ha2dqobtgmge", "haztkmzyguge", "gm2tcnbxgqge", "gm3dambsgege", "gm3dsnruhage", "gu3tiojrguge", "geydsmbwgyge", "superx111111", "guzdemrugige", "gi2dinzsgige", "g42tenbwguge", "g4ydknjxgege", "gy3tsnrthege", "gi2denjsg4ge", "plushechnick", "gy2dsojyhage", "gq3demjvgage", "guydenbqguge", "gi3tanbxguge", "g4ydqojygige", "ha2tqmbwgene", "g4zdknbygene", "gyzdomrshege", "neverland111", "gq2dkmrzgyge", "gyzdmmrxgqge", "2liangwallet", "gm2tanbsgyge", "gi4donzvgqge", "heydsmzxgyge", "guzdmmbtg4ge", "gmydomzuhage", "gi3daojygene", "ge2tqobtgqge", "dnp1cdwufh4x", "gi4tqmrxgqge", "gq4dinzsgene", "ha2dqnrrgqge", "gu2tinjugege", "gm4tiobshege", "hezdeobwgyge", "lance1yobdc2", "gq3tmnbqguge", "gezdenrzgyge", "ha4tonjsguge", "gm3tcnrzgyge", "hazdgnjwgige", "ge4dmmbrgqge", "tencentvideo", "gu3tinrvgyge", "ge3denjtgage", "play1eggxeon", "haytaobthage", "angelia11111", "gi2tenrxguge", "youzixier111", "michaelliuuu", "gq4danjthege", "g4ztombugqge", "hezdombtgige", "gm4dombxgene", "eosbettester", "henryyue1111", "guzdomjtgage", "gq2tsnzxg4ge", "willeostoken", "raojin21eos3", "1gyzxzzzmshs"
]


async function deleteAccount(account_name){
	logString = account_name + "will be deleted";
	console.log(logString);
	const options = { authorization: [ `taketooktook@active` ] };
	const myaccount = await eos.contract("taketooktook");
	await myaccount.clear(account_name,"4,TOOK",options);
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
	if(idx > 1500){
		return;
	}
	console.log("after calling index string " + idx);
	setTimeout(deleteLoop,300,idx)
	
}
			
setTimeout(deleteLoop,1000, 1);

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
//eos.setcode("taketooktook", 0, 0, wasm) // @returns {Promise}
//eos.setabi("taketooktook", JSON.parse(abi)) // @returns {Promise}

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


                  
                                                                                                                     
                                                                                                                     
