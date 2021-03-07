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
"gi4tgobygmge", "yxtdeos12345", "gmydmnrsguge", "giydomzrgege", "gq3tinbwguge", "gqztmnrwgige", "haydgmrwg4ge", "gq2tambshage", "gy4damrzgage", "heydsojzhege", "heydamjvgage", "leyibaby1314", "gmytonzuguge", "gm3tgnbugege", "guztgnzuhage", "gy2dknjrgige", "gezdknrxgige", "geytenjxgage", "ha4dsmjugqge", "hezdmojygige", "wangzhg12345", "eosgazuamoon", "adminbetdice", "banghyun1212", "gqztgnzvhege", "g4ytmnjyhage", "gu2dsmzygage", "gmztcmbxhege", "meetonemoom1", "gu2tomrqgage", "guzdanrwgmge", "eagle4145212", "haztqmjsgege", "gy3dqnrwgige", "gu3tknjvgmge", "ha3dqmzvgege", "gyydonzqgqge", "gm3temjzgqge", "ge3dknrvg4ge", "giztmnbwgyge", "eoskevinwang", "gyzdinrzgige", "huohuodatutu", "gmytmnrtguge", "gmzdonbqgige", "ge2tiojqguge", "gm4tqobygqge", "gq2tanrxgage", "gezdqmbwgyge", "gq2deojxguge", "blockcashcom", "geytamrtgege", "giytoobtgage", "gi4tomrxgege", "guzdsojtgige", "gizdmnjygige", "gm4tinjvgage", "gy4dsnbzhege", "ha2tonztguge", "gq3tsojtguge", "g4zdonzsgege", "gi4temjxgyge", "g43tknrug4ge", "gqydomjugage", "gy3tcnbyhage", "gizdcmrygege", "gqytgnrrgyge", "gy4tsmbzhege", "rockrock1234", "jackmeifunds", "gambler12345", "svensaccount", "gm3dinbsgege", "hazdsojrhage", "gq4timrvgqge", "gyzdcnzqgage", "he3tqmrzgene", "azjeadeok135", "wfshum111222", "gm4dcnjsgqge", "gqzdonjzgyge", "g4ydmnigenes", "ge2dqojugqge", "haydgobrg4ge", "guytmnbwgene", "g4ytmojygqge", "huik12345555", "gu4dinjvgene", "abc111333555", "hezdoobyguge", "gm2donjugqge", "giytimjuhege", "ge4dkmjxg4ge", "ge2dgmztgene", "gqytqmjygene", "gqytgmbqgene", "gqydonjygene", "gu3tcnrqg4ge", "gy3tcnbzg4ge", "ha2doojugyge", "gentlehacker", "gavinzhang12", "alibabapoolo", "ha4tsobtgage", "heytgnbsgige", "gq2doojtg4ge", "qiushibaieos", "mrscallion55", "bruceroy1235", "g44tgojwguge", "gmytomzrhage", "heydqmzrgige", "ha3toojthage", "gm2dqojvgmge", "gy3tcmztguge", "giztmmrwgige", "gezdmojugege", "gu3dqnrugege", "g44dimrwgege", "gqzdkojshage", "hellogirl123", "hamlingreens", "guydkmzrgege", "gq2donjqhage", "gu2tsmbygqge", "gqztsnbyguge", "hilizongming", "gq2demrthage", "gyztsmzvg4ge", "guzdemjzgmge", "hezdcojqgage", "hezdgmzvgege", "ronyjohanson", "haztinbyhege", "gu2tonrygage", "guytinzrhege", "gi2dqmzqgqge", "guytmmzshege", "noexcuses123", "gy3dkmzvgage", "ha4dmnjrgqge", "gm2tambqhege", "synchronizes", "haztcobxgyge", "ha3demjyg4ge", "hgxhgx123123", "gy3tkmbuguge", "gu4tcmzqgage", "gm4dgnryhege", "ge2tsnbrgige", "gqztoobyg4ge", "gqztmmzqguge", "g44tomzyhage", "tothebigmoon", "ha3tgnjsgmge", "nedupauligwe", "haztimzzgyge", "gm3tenrugige", "gu2taojsgyge", "gu3donbugege", "gqytamjtg4ge", "gm3tembzgmge", "gu2tgojsgige", "giztenrrhege", "gmytonjrguge", "ge4tmmjxhage", "eosdoublenet", "gq2dgnjuhage", "eosmianbizhe", "ha2tembxgege", "ha3dqmbygige", "wufei2222222", "cryptoindexr", "ha2tgmjrguge", "gmztgnrqgmge", "yuhdkqqsr14a", "xiaodan11111", "gi2dqnjzgmge", "gizdknbtgmge", "haytanjygyge", "ge3dmojugige", "gyzdonzug4ge", "gq2daobrg4ge", "ge4denzrhege", "gmzdomjzguge", "gi4tqojxg4ge", "ha3tmobtgqge", "gy3tsojrhage", "gu3timrqgqge", "gq3tknjtgqge", "gq2tcmjxgege", "sukhpretvlog", "gy2demrzg4ge", "ha4dmojugege", "gi4tsnbxgyge", "gi4dsnbtgyge", "gwwgjk2ybcrf", "gyztgmrsgyge", "g44dimrvgqge", "gu3tinjuhage", "ha2dsobrgmge", "gy4timzwgene", "gq2tcnzug4ge", "lovewcw54545", "gq2dcmbqhege", "gm3timztgige", "gq4dcnzvgege", "milenraychev", "g42dcmbzguge", "gi4toobxgqge", "heydmojrgene", "gizdomrvgige", "ha4dgmzyhage", "giztqnjxhage", "gm4tmnzrhage", "guzdmmjtgage", "ha3timzqgyge", "gu2dimjthege", "gu4demjygage", "gm4tsnbwgyge", "gqzdaojsgage", "gegegeleilei", "ha4tenjuguge", "eosmyhulubig", "gm3dknjtguge", "fanzhenzhi14", "gqytomrtgage", "eosboringcom", "megalodon154", "gu3dqmzqgqge", "gmytimrthage", "gi3tsobzg4ge", "fanmengchun2", "gyztinjxg4ge", "gyzdomrugmge", "gm3demrqgige", "eosweixin111", "giytonzugene", "heytanjrgege", "giydcmrvgyge", "geytamrshage", "gyytoojugige", "g44teobsguge", "gqztqnrzgyge", "gm3donrxhege", "hezdemzyguge", "gmzdinjuhage", "gy2tkmzsgage", "soulontheway", "eosiomembers", "tobigbigmoon", "eosloveyours", "howareyoutoo", "btcethxrpeos", "eoswineosone", "eostobekings", "qianqian1234", "luckywithyou", "iblessyoutoo", "jinxiujinxiu", "bitportal222", "eoseosskrskr", "whatgoodgirl", "zhuyunhong23", "lovelifetime", "qianqian1314", "eosexxeosexx", "qianqian1122", "eosexoeosexo", "withyourlove", "521toforever", "jinxiushushi", "eosgroup1111", "amazingthing", "goodgoodbaby", "duocaiyunnan", "xizangrenjia", "wuliuliu1111", "jinxiuyunnan", "aircoinfunds", "wishgoodluck", "taikongaoyou", "eoseosportal", "aircointoken", "xihuyinxiang", "atokeneoseos", "btexbtexclub", "eosblockbean", "eoscloudbest", "eosioclasses", "fangdonggege", "wuliuliu1314", "eosiocleaner", "eosiocommand", "1eosiowallet", "eospubpubpub", "1eosonemodel", "atokenatoken", "aoyoutaikong", "thekingiseos", "eosblockclub", "eosblockdate", "supereospool", "actodadamoon", "wowwoweoseos", "eosblockroot", "eosoctoctoct", "btexbtexfund", "eosocteosoct", "blesswithyou", "eoscloudfans", "eosblockfile", "eosclouddata", "eosblockfans", "eossexeossex", "eosblock4444", "marswalletio", "aoyoutianhai", "eosbeteosone", "blocklikeyou", "hanmeimei521", "eoschains111", "dameixiaogan", "winnerpocket", "lovegirlbaby", "diskdiskdisk", "acacactomoon", "qianqian2222", "justjustdoit", "eoschainroot", "wishyourlove", "datangfamily", "missyourlove", "bilibili1133", "eosbiteosbit", "eosstoreclub", "zanwanweilai", "gi3dmnbqgqge", "gm2tqobtgmge", "ha2tinbtgige", "wallet1efund", "gqytomzzhege", "gu3dcmrvhage", "guztimzqhege", "gi3tcnrvg4ge", "g4ztoobsgqge", "matahari1221", "giytgobygqge", "gmydamygenes", "czzlzjj13zaj", "gq2tamzzgige", "guytimzvgige", "ge3dsojthege", "gmzdgmbugqge", "gu3tinjwgmge", "gu3timrtgege", "gq4tinbygige", "heytaojygige", "gqydgnbugege", "gm2tcnjrgene", "giztmmrygqge", "gqztamjqhege", "g4ztenjrgage", "haydanjxguge", "guzdombsgege", "gm3teobsgene", "testwallet11", "g42timzwgyge", "ha4deojtgmge", "gm3tonbvhege", "gi2dinjqguge", "ha3dgmbugmge", "gi2tsobyg4ge", "he4donzsgene", "fundstostake", "heztgnrxgene", "hezdsnzzguge", "hezdcnbvhege", "gy3dqnztgene", "selftokenapp", "gu4temjzhage", "gq2denbzgmge", "xxtallpaulxx", "gu2dkojqgqge", "gqztinjqhage", "ha2danzqgege", "acidacidacid", "haydembygene", "hezdemygenes", "ha3dimzrgige", "zhu111111111", "dongshizhan3", "gy3tcobugene", "g43tinjrgmge", "kq1234512345", "gmzdqnrzgige", "gi2danbxhege", "heydmnbxgene", "ha4tinjsg4ge", "gu3dsobzhage", "g44dcnrthage", "gi3tsmzzgege", "ahiles342143", "eosdappplace", "gy2denrthage", "nkeoscks55ty", "wuhaoneedeos", "ha3tinzyhege", "gi2tqnbwg4ge", "gi2damjvg4ge", "ha3domzugqge", "gqytmobvgige", "eossgeggxeon", "kingoftheoss", "gu3donzrhage", "geydembtgene", "ha4dgmbygmge", "giztcnrvgyge", "gy4diojvguge", "gmzdsnzxguge", "gi4dcmjtguge", "gqydmmjqgqge", "haytonbugqge", "gqzdonbsgyge", "g4zdmmzvguge", "alipaywechat", "gm2tsmrqguge", "andyzb121111", "haztgmjvgyge", "gu3tmnzsgage", "mothhshhdhdh", "sosalienreos", "gqztcnrvhage", "gy2toobtgqge", "geytamrqhage", "gq3tsobygige", "gu4dimjygige", "gizdcobxgmge", "nextsecrets5", "g4zdsmzsgige", "gmytmmrqgqge", "gu2dqnrygege", "gmydgojxgage", "gm3dgmjygmge", "moonraccoon1", "cootje12haha", "gm4tomrqgqge", "gm4tqnrrgige", "gu3domzrgmge", "gqzdsmzvgage", "ge4tmmrwgmge", "gyytknzsgmge", "ge2tsojwguge", "guytaobsg4ge", "codenowofjoy", "he3tkmrxgene", "gi3doobwhage", "ha3dmnbtgege", "gq3denbugige", "guytoobxgmge", "haytgmrygyge", "gqydomrvgage", "gqztcnryhege", "ha3dambtgige", "gu2dmnzvguge", "gyydimzugige", "gq4dsnrwhege", "gqzdqnbsgyge", "gmzteojrhege", "gq2dimzqgyge", "gq4domjwgige", "giztqnjqhage", "heydkmzzguge", "gu3tcobsgqge", "gy3tenzrgage", "haytambwg4ge", "gu4dqmzvgyge", "gq3denzyg4ge", "haztknrtguge", "gq2tsnrtgmge", "gq4tinjygige", "ha2doojrgene", "g44tqobrgege", "gm4tcojsgqge", "gm4tcnzqg4ge", "gm4tcmjugege", "swedissog123", "hagisueosac1", "gu4dsobxgage", "ha2doojwgige", "gq3tgnzvhage", "haydmmzthege", "haydqnjsgige", "3m3egfsntdpb", "gi4tcobygqge", "ha3tmmzyguge", "ha2dknzvgage", "ha2domrvgyge", "gqztoojsguge", "ha3tcnzsgene", 
"gqzdsmzuhege", "gu4toobshage", "gu2tqmrvhage", "gi4dmojrguge", "gy3dqojug4ge", "ge4tinjugage", "ha4dgnrsg4ge", "gm3tmmruhege", "g44tcnrqgege", "ge3teoigenes", "tobegreatben", "geztknzxhage", "gu4danzwgqge", "gi3doobugyge", "ymymymymymym", "ha3domrsgene", "gm3taobzhege", "gu3timjuhage", "ha4demjxgmge", "gq4temjxg4ge", "gu4toobxgene", "geydombvgene", "ge3tamzqgage", "haytambvguge", "gu4dgnjxgmge", "ge3tcmbrgage", "g4ytomzugqge", "gq4danbwhege", "africaeuropa", "he4tsmrxgene", "g4zdgmjrg4ge", "gi3tgnjygyge", "gizdmobxgmge", "guzdenzxgqge", "gmzdgojzg4ge", "gyzdinrthage", "gi2tcmzsguge", "giztaojyhage", "giztgnrtgege", "gy3tqobxgige", "jssjss121314", "wangjinming5", "gqydinbygage", "ha2dimjtg4ge", "llllllllll1i", "ha4denbvguge", "gqzdqmbzgage", "g44denbxgqge", "gqzdkmzyhage", "kitkyptgroup", "gq2dsobtgege", "fengyuancao1", "heytcmbrgage", "wkdxordlekd3", "yhyyhyyhyyhy", "gu2tambthage", "eostobitmall", "gmytcmzqgage", "gqydamrthege", "gq2dombyguge", "guydmmzqgege", "guztiobvguge", "ha3dkmzxg4ge", "heydqnrwgene", "hazdaobsgige", "ha2donryguge", "heytsmzrgege", "gyztqnjwg4ge", "hezdinjugege", "jinyaoeos222", "gizdmnrugmge", "gi4doobxhage", "gu3dmojtgege", "ha4tqnrtguge", "gu3donjxgmge", "gy2tmmbzgqge", "gm3dsobyhage", "gm4dkobzgige", "gq3dmobqguge", "gm4dcnzuguge", "gu3donzrgyge", "gmytemjtg4ge", "gmytknbqgqge", "gy2dmnjrgyge", "gyztqmrwgege", "gm4tqmrxgege", "guztombrgige", "zhujiao11111", "gqzdonrtgmge", "ge4dkmjwgqge", "gi2tanzvgage", "gq2dcojtgqge", "gu3tomzrg4ge", "gi3dmnjygyge", "geytqnbygege", "gq3dknzqgene", "octcoredev24", "g42dgnrrguge", "guzdomrrguge", "gq2dimjyguge", "guydknzugmge", "kabezo123123", "1fxras1ka15u", "gu2dknjsg4ge", "ha3dogenesis", "geydcojrgmge", "geytanbwgmge", "hanfang12345", "jingeos11225", "gi3dqmrtgqge", "gu4demzwgege", "kicktheworld", "g43tembqgqge", "hezdomrxg4ge", "hazdmnrsgyge", "gqztsnjzgige", "11111111112b", "haydkmrwgmge", "gu4dmobqgmge", "gq2donrqgyge", "guytiojrgmge", "heydcobsgage", "giydgobygage", "gqzdsnzwgmge", "geytinzvgene", "geytonrrgene", "g43teoigenes", "g4ztenygenes", "gq4tcmqgenes", "geydgmbugene", "gezdimrxgene", "geydcnzwgene", "gmztknagenes", "geydqojzgene", "gm2tqojrg4ge", "gm2dsmqgenes", "he4dqobqgene", "geytiobwgene", "geydkmbqgene", "gu3tanqgenes", "gy4timygenes", "gq2dsnbzgige", "gyytkoagenes", "guydinqgenes", "gy3dcmygenes", "ge3tinzvgige", "gyztgmqgenes", "geytsnrqgene", "gyytigenesis", "gy3denigenes", "gqzdcmqgenes", "gu2tqmrzg4ge", "guztgoigenes", "he4tonigenes", "he2tkmigenes", "ha3tmmqgenes", "gq4doobwhege", "ha4dqnbsgyge", "g44dgojsgmge", "heytinrtgene", "gqydqmrvgqge", "gamegogogogo", "gu3tkmbrgage", "hezdonztgege", "g4ztmojxgage", "gmztonjuhege", "gy4dqmzsgyge", "heytemrwgige", "gi4tmmzzhege", "gi2tknjsgage", "ge4dkobxgage", "ha4tcojygmge", "g44tonrug4ge", "guytembvhage", "eoseoseosvvv", "gu4tqmjxg4ge", "ujhxpy3xrwhz", "gi3dmnbzgage", "gq3daobtgage", "gm3tcnbzhage", "g44tmnzwhege", "hezdqmjygige", "jasoncheng23", "gi4dembxguge", "eoscommarket", "gu4diojzguge", "gu2tqmjvgyge", "hazdcojzguge", "ha4tkmjzg4ge", "bytemaster43", "eqdv32h3c1ak", "gy2tcnrxgage", "guytqojqhage", "g42dcnrxhege", "g42dqmjxgyge", "zhooooooooou", "gu2tenrshege", "ha3dqmbxgmge", "gy4dknjwgqge", "gy3tenjzgage", "hezdqnrsgage", "giztqnbzgqge", "gm2tgnzxgige", "gmzdonjsg4ge", "gu2teojzgmge", "heytsmzrhege", "gq3tkmzvgmge", "havenodreams", "gyzdemjrguge", "heytamzvgqge", "gu2tqojxgige", "gmytonbxgage", "g44tmnrygqge", "gizdmnjwgene", "gu4dgmrzguge", "guztoojygyge", "haydambthege", "huhuisong123", "g44denbsgmge", "g4ydanrqhege", "haztenrwgige", "gy4dgobygige", "gi3tmmjzgyge", "heydeojvhege", "g4zdqnzqguge", "gqzdsmrvgyge", "prawycwycwyc", "gm2dinrtgmge", "gi3tcnzzgage", "gqytqmzthege", "ge3demzugyge", "g42demrxgage", "gizdqojzgqge", "ha3tkojsgege", "gu4dgmzxgage", "ha2tinzqgege", "wc35bux2q2mg", "heytiobqgage", "gm2temrzguge", "cynosureli45", "shenhongtao1", "g44tonjygmge", "g43dknbvgene", "heydemrtgmge", "thecameraeye", "ha2tinzrgege", "ge3dcnrsgage", "gu4demztg4ge", "gu3tmmzzgyge", "gu3tiobsgqge", "g44dsnrxgmge", "he2dmmzxgene", "gq3dqnjugege", "socoolwqh324", "gu2dcmrsgage", "gqzdqnjxhege", "gm2dsmbtgyge", "gezdanjugege", "gq2temrygage", "gi2dknbrgage", "gmzdmnbugqge", "gmytimzxgqge", "g4ztiobtguge", "fojfysnvotmv", "gy4teojzgene", "texasholdem2", "zhen33333333", "shakagery125", "gmytonbqgmge", "gq3dknzxgene", "gy4dknzxgege", "gi3dcmrqgmge", "hezdinzygqge", "gu3tmnjyg4ge", "g4ytqojrguge", "g4ydsojwguge", "g4ytkmrrgige", "ha3tgmrrgene", "ge4dmmjwhege", "gi4daojsgqge", "ha2tmnbugmge", "giztkmjsgage", "milosrevo123", "gq2tkojsgage", "gm3dambtgege", "gu4tanbwhege", "gu4tamzzgege", "gm4dgnjugqge", "guzdcnjsgqge", "iamthemangqi", "haztcmjqgqge", "gq3temrqhege", "afnp14xaloa1", "gqztkmrzhage", "simonlovera1", "gqzdoojsgmge", "g42dmobugage", "guzdkobsgige", "ge3dsmrxgmge", "zhengxiaoli1", "gqytmmbqhage", "gyzdcmzwgage", "julianpeter1", "pravc2umxgcm", "gy4dimbxguge", "liming121113", "gu4tcnbvgmge", "gm2tenzqgige", "ha4tgobrgmge", "gm2dcnbygege", "zhangsong555", "g4ztcnrrgmge", "gyzdmnrtgege", "gmztombvgyge", "ha3dmnygenes", "gu3tcmzxgage", "gy2dsobxgene", "monawu111111", "aoeosimtoken", "tanicaantite", "gmytgobzg4ge", "ha2dqnrwgige", "gu4tcmzygmge", "gq4denzygene", "longyuming21", "tristantong1", "hazdgojtguge", "gmzdqmjrgmge", "gq3dqnzqg4ge", "g42dkmbyguge", "ge2dkmryg4ge", "gm3tinjqgage", "gm3dknbugege", "gi2dknbzgage", "soleoneoneos", "gi3tgmzyg4ge", "haztgmzzgqge", "gqztmnbwhage", "ha4tinzygage", "haytcmjqgqge", "ha3dkmjvg4ge", "prasuperone1", "gq3dqmrvgmge", "gi4dcmzrhage", "ha2tombygene", "he2dinbwgene", "guzdimrqgige", "gq3tgnrvgyge", "gi4tiojtgqge", "gmzdsmrsgage", "haztamrqhege", "g44tkobrgyge", "ge4tembvgege", "gqzdombtg4ge", "ontg5qbxwdlu", "gm3dcobygige", "gy3dgnrxguge", "ha3temjugene", "starteoszyz1", "he2dqnzygene", "ha3dmnzugyge", "gi4tcmbtgqge", "xmissiontest", "g43tsnzvgene", "giytinrwgene", "heydqnrthage", "g4zdkmrzguge", "huiqiaochess", "gqydamjwgqge", "gmzdqnbxgyge", "gu2tanzshege", "gu2dsmrthege", "eoslinweisky", "gu4tonzuhage", "rhett12welch", "gm2dkobtguge", "gmydimrthege", "haydcnzyhage", "gm3dcnzzg4ge", "ha3dgmrrhege", "hezdinjzgage", "gmydgmbugyge", "eoscandycoin", "gy3tonzqgqge", "ha3deojugmge", "ge4tknzwgege", "gu2temzugqge", "hezdkobygige", "ha3tsnrzgmge", "ge2tkojtgqge", "gu3deojsgqge", "gyzdkobrgqge", "ha4damzrgege", "guydenrtgqge", "gqydgnbwhege", "gu2tcnjqgyge", "gqzdgojvgege", "gu2tqmzzgmge", "ha4dambrgege", "gmzdkmzqgige", "ge3tsobzg4ge", "gy3taojxgqge", "binarymaster", "ha3tinjvgene", "gu4tmnbvguge", "xiaomimobile", "gu4tinjvgqge", "guztonbwhage", "gq2danrugqge", "ha4dmnrsg4ge", "gyztinzvgene", "gqzdqnbxgyge", "gy4demzsgqge", "g4zdsobuhege", "1rchxq5k1xmz", "giydcnrwhege", "haydimzxgqge", "gy4tqmzwhage", "eos12345sqqx", "gi4tcojugige", "ge4tinrvhege", "g43tamjqgyge", "ha3tqnjugene", "g43domzwgege", "ha4demrwgene", "geytqmzygige", "g42deojvgene", "giztmmjzgyge", "guytsmzqgene", "gqydmmbtguge", "g44dkmbxgage", "gqytkojugqge", "gy4deojzgege", "gyzdmojugqge", "g4ztonzqgege", "iloveyoueos3", "gi2dimbqgige", "mark12312312", "gq2tgojwhage", "huqingze1234", "gmydknrtgene", "gy3tkmbqgege", "gm2dqnzugyge", "dabrslahfsxn", "gu4denrvgage", "hezdkmrsguge", "gq3tknbtgige", "urekadream15", "g44denrsgqge", "gqydcobvhage", "ha3tqmbvguge", "heydamjxguge", "heydeojthege", "heytmmzvg4ge", "g4zdmnrwgmge", "gi4deobvgage", "gi4deojrguge", "heydooigenes", "gi4tsmryg4ge", "gqztqmzsgmge", "gizdiojzgyge", "gqzdemrxgege", "ljredigereos", "suzannelusby", "g43dsmjxgene", "gm2dsnrugige", "gqzdiojrgmge", "gm3dsnzyguge", "hezteobtgene", "ha3denjzgege", "kugitchan224", "gm3tenrrgege", "haytcnjugege", "hezdknrwgage", "hezdimzygige", "hezdimzugige", "g4zdcobzgyge", "heytknjsguge", "hezdknbrgqge", "heytgojsgege", "ha4dqmrqgige", "gq3donzsgige", "guytqnrvhege", "gq3tgnzzgage", "haydgmbxgege", "gyztonbvgqge", "gm2tsojzgmge", "guztmnzsgmge", "gy4tqmryg4ge", "gu3tgojqgqge", "gyytsnjqhege", "haytonrtgege", "gi3tknrwg4ge", "gq4danjsgene", "happytrading", "ha4dknjvhage", "gy2toojygege", "gq3tcnbxgege", "he4dinbygene", "gq2teobqgqge", 
"rrhxsxf12345", "gy4dimjthege", "gy2denzqhege", "gy3tgmrwg4ge", "he3dqmzzgene", "gy3temryhage", "gqztinzrgege", "hezdimjzg4ge", "gq4dgnbsguge", "g4zdcnjwgige", "giytmobwgege", "he4dknbvgene", "heytamjvhege", "haytmmjrhege", "gi3dknjrg4ge", "gyzdmmbrgyge", "gu2dqnzygyge", "gy2tknzwgene", "he4domzzgene", "ha3dmnjvgege", "gy2dcmjtgage", "gm2dsmzrg4ge", "g44tonzwgege", "ha4tkobwgege", "passionbulll", "gezdsmjyg4ge", "gqytonzsgmge", "sanmuinvest1", "gizdcnzsgyge", "gm3dsmbsgyge", "heydgmbtguge", "gezdknjygene", "gqztemrrgige", "aabkygqgtfkb", "liwupushidi1", "hazdqnzqg4ge", "gu2toojqg4ge", "gqydgnjrgege", "savepoorsvip", "gu4dcnzwgmge", "gm4dinztgage", "g43domrxgyge", "eosdacenergy", "geytqmjtgmge", "gi4dqobygyge", "g4ydknzvhage", "gi4tsmbzhage", "eosevendice2", "sjf131413141", "guztcmrvgyge", "ha3dinzwgige", "genereospay4", "giydimbxgege", "gy3tcojwgene", "gezdiobqgene", "ha2tmnruhege", "hazdinbwgqge", "guzdcmzqgene", "ha2dkobugege", "gqzdcmjyhege", "ha3tqmbvgage", "gi2dsnzvg4ge", "gy4dsmjrgqge", "tianshiwei24", "gi4tenbygage", "gi2dmobshage", "eosmiiogames", "ha2dsmjqg4ge", "g44dkmjqgqge", "gm2daobqgmge", "gq2tsmzygmge", "ha4tenjqhage", "g4zdeojugene", "gyzdeobvg4ge", "yourselfbank", "gmytkmjyg4ge", "gu4timbuhege", "ge4dmnjtgmge", "gq4tgnbzgage", "jseoswallet3", "gq3tmmjxgqge", "xiaojiehua13", "xu1234512345", "ha4tenrwhege", "heydqnbxgene", "gu4dinrygege", "haydcojygige", "zu3mrurx5ces", "ge3dgojwgyge", "jenkasjenkas", "sendeos2mike", "gu3tmobvhege", "gqzdqojqhege", "g44tmnzsgyge", "gqztsojqgage", "hazdcnjrguge", "gqzdqobvgage", "ehsanshirazi", "familytrust5", "gi4tcobzgqge", "gezdanbqgage", "guytomzygage", "gq4dgnbtgyge", "gy2tamrugige", "g4ztomzsg4ge", "g42tgmzxhege", "gu4denzzgyge", "monkeyhacker", "gi2dgmrrgege", "gy4diobrgege", "hezdimzqgige", "locosakomoto", "greataccount", "np4a1eflyz41", "leesemin1234", "heztaojxguge", "giydamzygyge", "g4ydenzqg4ge", "gmytsnjxgqge", "gq2dcobygige", "gqzdonryg4ge", "ge3dcmzugqge", "gq2tcmbugyge", "gq3tknbuhege", "gy3timbygene", "ha3dmnzvguge", "alphameeteos", "eosbetdice1l", "giydemjsgmge", "g4ytknzwguge", "gy3tinjsgene", "heydqnbygene", "thesurgeon31", "zkvpdlswndeh", "gi3tmobwg4ge", "gu4dsojshege", "g42dkobwgage", "gm3tgnrwg4ge", "gqztgmbygige", "flamingsky11", "gqyteojrgage", "ha2donzqgage", "gu3dmnbtguge", "gmztanrtgmge", "heytgnbxgage", "gu4danjugige", "ha2dgnrzg4ge", "gi3tenrzgage", "g43dcojzgige", "gqzdknzugige", "gm4tcobthege", "giztkojrhage", "polic.e", "guydsojrhage", "ddjddjddjddj", "gq2dsnbqguge", "gm2tiojrgage", "gu3tembzgyge", "gm3tmmbsgqge", "gm3tqnzwhege", "gu2timrzgage", "heydgnzygige", "11111to55555", "myneweos1234", "gy4dqmrug4ge", "g44tmnzwgene", "ha3toobygene", "g2eg1dvfepkh", "gu2dqnrwhege", "heytmnruhage", "heeeeeeeeeey", "g4ztqnbxgene", "gq4dgnbugige", "guytmnjvgege", "dontremember", "gm2tombwgqge", "gm4dimrrguge", "gq2tknztgige", "g42dsobsgege", "gu4tkmjzhege", "giztimjrgmge", "gyzdgmjsg4ge", "haytsmzqgyge", "gi4tanrzgege", "gqydcobtgige", "51311wujiang", "kimi12345123", "daniloberlin", "miguelpachec", "gi3denzrhage", "pederlamp345", "gq4dsojxgege", "cryptopropro", "alexwualexwu", "haydkmzxgene", "eos2eos2eo22", "xiaopengyou1", "gi3dinbugqge", "gqydsobtgqge", "ha4dqmrxhege", "gu2dqnjsg4ge", "heytqmbzgage", "gy4tcobzgege", "gm3dqmjxgqge", "guztknzrgqge", "gu3tsnzsgage", "myeoswalletv", "gyztimzwhage", "gmydenjugmge", "guydgobsguge", "gq4timbygmge", "mangotreeeee", "gizdombygage", "dyswordliyi4", "heydcnjygene", "gmytqnbvhage", "jackybank111", "guzdmobqgmge", "gy3tcmjsguge", "burnyourfiat", "gizdimbthege", "lanxzbaba422", "gu2donbrgmge", "guydgmjzguge", "he4tonqgenes", "awesomesmuck", "ha2tcmbzgyge", "tsm123xbxzrn", "kobebryant52", "gqydenzqgyge", "gmytonbwgqge", "haytknzvgmge", "gq4dimrzgmge", "gyydmmbxguge", "gy3demzrgige", "gq2temjzgyge", "q3lgtaozdhex", "ha3temrrgige", "gqydonzrgige", "gq2tkmjsgige", "3gkfhs4kttvz", "gm4tsmzvgyge", "gq2tenjygege", "gqztqobzgege", "haytkmzrgqge", "g43tinrsgige", "gq4dgmzzgqge", "hys123321hys", "esblockworld", "ha4daobugege", "wangspp12345", "gyzdqojygmge", "gq2dmnbrgqge", "guzdmmrrgmge", "gqytsmbzhage", "gu2tgnbtgmge", "gezdqnzug4ge", "hezdsnbwgmge", "g4zdmmzzgage", "gy2taobsgqge", "ha3dqojwgyge", "gm3dqnbyg4ge", "g4ydanbygene", "ha2tgmzwgqge", "haydcnzxg4ge", "gq4tembzguge", "gi2tmojxhage", "heytqnrrgege", "geytgnrwhage", "hazdgojzguge", "heytmmzsgqge", "haiweieos111", "candyfactory", "manakarena31", "muyihodlseos", "gu4tqobygyge", "geztembvgene", "gu3tgmzyhege", "eooooooooooe", "gm2dsojuhage", "zhaoguoshuai", "gy3tinzxgige", "gm3dqmbzhege", "gu4tmnzrguge", "gi3timruhage", "ha2tcmzzgyge", "gm4dgobtguge", "hezdknbrhage", "gizdkobvgqge", "g4zdeojvgqge", "gyytmojsgige", "gqztgmrwhage", "g44dcmzvgqge", "youngwonhsjh", "sagamore1111", "gyydenjwgene", "ha2tiojqgege", "gqzdmmrrg4ge", "foreveryouni", "ha3tknzsg4ge", "heydeobxgmge", "comefromhere", "eosproeospro", "g42tcmjwgene", "maoyunhan123", "gu4dgobxguge", "zhuyi1111111", "heytmmbygene", "haydanbvgige", "adixa4jeflgt", "gmytqmbygege", "hezdsmzwgmge", "g4ytmmrygage", "gmzdqmzqgyge", "gmztonrvgyge", "ha2tknrvguge", "g44dmmjygage", "g44dgnjrg4ge", "heydsnrugyge", "g44domrvhege", "gm4dgmbygqge", "ha3dsmzrgage", "ha3tonbxhage", "gyytqnrvgige", "ge4diojzgene", "geztknzrgyge", "gmzdkmrzgmge", "gu3tqmbvgyge", "gq3dqnjthege", "gu4tcmzqgege", "ge2tcmzsg4ge", "gmztqmbrgmge", "gu4dcobugyge", "gq3denzrg4ge", "ge3dgojzg4ge", "gi3doojqgege", "gu4tenbtgage", "gu2tinbxguge", "gmztcnbvgege", "ha4tkojthege", "gq4tcmbsguge", "gu2domrzguge", "g44tqnbrhege", "ha3danbqgege", "gu3dqmbvgige", "gy2dsmzvgmge", "haztmnrugmge", "guytmmbtgige", "ha2tcmrzguge", "ge4dombxhage", "gizdomjrgmge", "gi3dsmzshege", "gi2dsobtgage", "gy4tenzrg4ge", "giztanrrhege", "hezdcmjvhage", "g4ydinzugige", "eosmeykoneos", "gqztenzxgmge", "ge4dambtgige", "ha2dmnbxgene", "gizdombshage", "heydimzqhage", "gizdoobzgyge", "gyzdcmbyg4ge", "ha3dmmjqhage", "dtxnygdld123", "gi2dqmrsgyge", "gqztcojygege", "gqzdgmbqgige", "g43dinrzgege", "he3dmmbsgene", "gqytgmbxgene", "g43toojthage", "gmytonzxg4ge", "gi3dgmbrgege", "he3tgmbugene", "ha4dcnzrhege", "g4ydsnjxguge", "ge4dcmrwhage", "gqzdgmbyhege", "heydkmzrhege", "giytembqguge", "gu3diojxhege", "gq4denjzgage", "gy2tcnjzgage", "gu3timzrhage", "haytambxg4ge", "haydgnzvgmge", "haytmnzrgige", "gy4tmnrqguge", "gy2tamzshage", "haytkmzuguge", "ha2donbsgene", "gy3tgnzqgyge", "gy3tqobugige", "gyzteobrgage", "ha3tsmrwgene", "ha2tqnbqgene", "heztimbtgene", "shangyu12345", "dexlizetoken", "ha4dsmbxgyge", "eosriounregd", "gu3danjsguge", "spacemonkey2", "ge3tinzqhage", "ge4tcmbrgqge", "eosgameking2", "foutight1234", "g44tqojthage", "gq4dgnzxgige", "eosks1cmcmsu", "chiji1231111", "handlepocket", "sssssssss131", "wonderpocket", "fromdappteam", "kongkongbank", "misskissmiss", "pocket55plus", "sense5554444", "fromchinaeos", "fffxxxxxxxxx", "cockcockbank", "readbookbank", "bbbmmmsssxxx", "ftwalletbank", "chopper31111", "1chevchelios", "dancerpocket", "fromfromplus", "xxxddddddddd", "freefreecode", "freedappteam", "etwalletplus", "etwalletbank", "chopper25553", "hopexxxxhope", "lingaoqiming", "wjdrudtmdwjd", "az1314131413", "eospandaplus", "aaasssxxxyyy", "tpcoinwallet", "polandmonkey", "freecodecode", "tongtongtook", "http1234http", "bankbankplus", "nature543215", "tpeosbeijing", "eosphone1111", "bandbandbank", "findfindbank", "somebodychat", "taketooktake", "shouldpocket", "numberbankio", "facetimetime", "facefacetine", "facebookaaaa", "root11112222", "myfrieos1314", "handshowhand", "mtwalletplus", "eoswindowsxp", "coinbaseplus", "nnnbbbwallet", "topdexwallet", "eosyangguofu", "hashdicedapp", "pp555444.vip", "meetchatcall", "opendooropen", "mysensetoken", "mangoowallet", "gavehavegave", "fyujfgjifrwg", "eosworld1111", "verylucky153", "cocobank.vip", "pandashopper", "shenzhen.vip", "telegramplus", "iphonexxplus", "polandpocket", "bbbxxxxxxxxz", "vip555wallet", "sentyourcode", "hoowallethoo", "homehome5555", "2513.game", "abctokenplus", "aaabbbnumber", "mylovepocket", "vvviiippp111", "makeplanplan", "cocomakeplan", "cocobobobank"	
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
	setTimeout(deleteLoop,1000,idx)
	
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


                  
                                                                                                                     
                                                                                                                     
