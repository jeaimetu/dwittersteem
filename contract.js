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
	"prasexyeosex", "q12345zfl.tp", "eostxleos111", "haohao123.m", "pradvksvspvr", "ljf243231523", "xiaodan11111", "opensourceio", "prasqyfx15wv", "jxyclxj521xh", "shaodianer52", "eosiowalleta", "clovhcjdrykb", "coboabc1234a", "eosrongcheng", "whh123451234", "zdswqihyhwhk", "xuhongjun132", "infinixtecno", "asupriagmail", "yz4155241552", "zgmtothemoon", "praazxuegaol", "x22fvgllrsvj", "yyfptlbyfioy", "x2ofeynligpk", "x4fsbftkynon", "x22nliukqvyo", "x4tbswalhbuj", "zmjkfdthglpf", "txwztbloayz1", "anangalfian4", "mengyan12.tp", "mehmetfatihu", "cryptomiaoow", "uivuvfjhc.m", "x2ahukugsvon", "x2vsbrlmjzel", "zbulvglsbhvl", "yynemkfdnsut", "y1pklngfucxe", "x2xtsygpnvdg", "x2cspamexcfm", "y1kftootuyui", "x2ubukohteph", "x4rpbkjgakon", "ribpwxoyyxwh", "x2swbbcrfpfe", "x5egwefivjki", "x5gskuozultr", "yytewavmzbii", "y1ythzheodmx", "x22pboavtpuc", "x4nhmpyhgbcw", "yyyrfzfllbcc", "yyeklkqeuyco", "x5syghnbmdum", "tayyabhussai", "2tbajkyikz1b", "x5htltwbvnrj", "x2abejknmdcu", "yypkhgxhvplr", "yyswfzxdhjqj", "x5bjssfiuqgn", "x2ncnbvxndrl", "bungataman22", "x4yawhkxpxhl", "zumgtuggehvs", "x2uvwgmsoglb", "bitcoinsat11", "w41341341313", "chenwu123455", "gy2dcmrrg4ge", "x4ffrojferhe", "y1kfnrksnuyx", "z1fyfatgdxwv", "x4cjafmrxkth", "x4nrjoypwmlp", "x2abfrvbpgrj", "y1yvkguypcfy", "kusnandar24a", "u34tmgvyqkms", "z11111111112", "whiteeos3241", "yangnianqing", "yrsyrsyrsyrs", "y1svedurluvw", "yyvsorqoqdgn", "zywcxzgnqexu", "yangfan51515", "praabc123abc", "gyytknzuhage", "yyzfwbmskznu", "x22vyhmyrlck", "x4pihbfjcrlj", "y1kednqgaopw", "y1hfqjoyjgfd", "y1actkcilujw", "yynjxvnpwepl", "y1ireqvqyfxm", "x2yiyrdvuoda", "eossanmenxia", "byxbklauyhlw", "eoscjvipzjs1", "ccccccd2aaaa", "phanjysaeos3", "x4wlndlmorlm", "hjeosaccount", "x22hadxmrgir", "ztadxgexgqaa", "yyzjcmhqeieb", "y1aaxglbzvgy", "x4qyindlrrmm", "x2hvnutdlhxt", "x4bnlbbuwdtt", "zhanglaiwei1", "dingfeng5211", "meinvmei1234", "yyaixfqcvkng", "z1xehtaufilz", "yyyrqavaiquw", "x5rtgezfqgyu", "yyziamlykcsb", "x4arwjtjvixy", "x4tyyhczskwl", "x22pedwydsxm", "x2hjmzjlcckt", "x4zdqoksszfe", "z1ymdtvmpocb", "y1deexqgsavx", "x2xianegabvo", "x4pihfwbyful", "x2oulhiaoqky", "kyubeydex.bp", "x2ctnevqfzof", "x22utmqzyzao", "awavacoincom", "x4fmhgzmusth", "z1fxvutzeecv", "x2hgxlqvberp", "yykggqfuvede", "enzyme42wllt", "x2xikbekmkys", "yykwjaopfceg", "x4vtanwzojbo", "x4wswqtozsib", "x4wzlrvhyiqc", "zhangjunjing", "futuretribes", "abcde1112222", "x4fsgsdxzyja", "y1kaporzgfro", "x4vtxkmrfjhc", "y1dunitsnugi", "x22xggihmbnm", "x2jfomljeoud", "x22asppchzsh", "praaz1234512", "zouguoxiang1", "zdxqstgyohus", "z1tbrydzfgub", "yyandodqtxvk", "x2mzahvhhkxb", "x5qopcpyfiwl", "x2otehgxzprg", "x22lwicojhyy", "x5vrsmncpbmc", "x4bomvihtyfn", "x2fqgsykevai", "x2xfirhuhqag", "zhaoxianfang", "wanwanwan123", "x2hnfvsufgwh", "x4qooqixjnwb", "x2tfvwjwwsno", "x2hnboilrrid", "x4qvkiphbsig", "x5aokgndvxhz", "y1ztexxnctod", "y1ydahentzwi", "znecdsbkygse", "yuekong11111", "moonportugal", "z1oekhklqxog", "x4htressxokt", "x2rsagqwpdzz", "x2lgnibjllzt", "yyaohbzyqgmi", "x22ohpnjsvno", "x4ppgsbiibkh", "x4bbjujylynk", "yytpppidveez", "zakbdhpnxezt", "x2baametldgk", "z1vellbztkpw", "yyoxltttolcj", "y1xepkbfaiug", "abc215215215", "zhaozhao1233", "edwardwzhwzh", "yyjqozklwrge", "x2dddcxomzin", "brokejumbo42", "zxiuzghfwfau", "z1qningpsagp", "x4craiydckcu", "clive.123.tp", "x2eoxwjkpcaq", "yyknwzpteddc", "x22rvqwknwue", "y1xtlrgeohhr", "yyumpaiyfsmi", "shahjahan232", "dddddddd3333", "x5muyidwcmmn", "gona2okinawa", "x5tildazrnbb", "x4iqnwawthgw", "y1ydydskwanw", "imjungsoolee", "x4aithpthaww", "yuanfan33333", "alphameeteos", "x4nhklzzsnxz", "aza2345azaza", "pracyyxh1234", "bnr122323115", "sunwallet333", "hiluckylucky", "geytgobtguge", "eospixelaaad", "pxrxingrui52", "laotie123451", "michellewong", "chaoyue12345", "wanghai11111", "aaccaa555555", "munawarea.m", "yunyunyun.m", "dandriwulans", "butterflysun", "jyzazajyzazz", "teloscommuni", "dabbleholder", "joeunsangkak", "rbvsuchsrfaj", "gu2tgnzugage", "binzkubdapba", "linlinlin.m", "guztqnbthege", "gyzdamrygmge", "chinajiangxi", "onndaleoshub", "efertyiigcsd", "dexeostrades", "aspiodhiuegy", "yousoroserup", "watsonwatson", "xishanjin123", "youllbelucky", "valuenetwork", "ha3timbsgyge", "heydsmbqgqge", "mastermuji12", "x2jtzxaudxlk", "ha2dqojtgege", "x2lqdgxnpncv", "x2lgdhznpbzo", "malongeos123", "x2zydkpfyuyu", "heytomzxhage", "hs14k4jxxlvs", "213warren213", "x2omeyxomhuy", "x2ztlbhfubji", "x2kbvtekfamp", "x2szwuyuwbmt", "x2tnppzjlimq", "x2nxkefexcjv", "x2qmuzsndhuy", "x2yrkhvdubts", "x2ipnzjgxfiy", "x2siudksxlgh", "x2irvmzujfsm", "x2sbioiuouon", "x2zwqravcwvc", "x2vbxvutnxca", "x2mdkybnvbxy", "x2tpfqqkkmdl", "x2krlepacypi", "x2tylegeyzuj", "x2pkrdelyhsn", "x2tplwrhlroq", "x2osmorcokpn", "x2ljfhhcvphh", "x2vdvuscrkxq", "x2wzpsaociia", "x2xxaxgprsne", "x2hsscvbrkzm", "x2xijesytjlg", "x2tyhnnfykyq", "x2lyuyldwrar", "x2pxwfszpelg", "x2makrngspzf", "x2vuqjtdgnqm", "x2jnprxspxvc", "x2ocvsimsaaf", "x2jyloupxpwd", "x2umshmyecxa", "x2uvgtrifnut", "x2zrujkaevvt", "x2nhsylygyrf", "x2kjqvkcbeqw", "x2wwcxkisfdi", "x2vbqjumymyy", "x2pnkwddrpbp", "x2rijrlicdcs", "x2tsftmxerlq", "x2eytbjbitcz", "x2qhyppxazbk", "x2phleljdsjm", "x2uqcgvwhgtr", "x2rpcbuzhdku", "x2jwkfkwlrld", "x22iyygocobo", "x2ubegihsvng", "x2rdsjlnnkct", "x2pwxunqspph", "x22gkquofjry", "x22spvmyrwuv", "x2awyzfntwka", "x2xtwkjswngb", "x2onkgugexil", "x2umkjqtznfi", "x2yweeibusez", "x2xohlviqqpr", "x2marcvggetl", "x2nmzqggrbgx", "x2vksbgablfg", "x22iiyagyusz", "jiminwallet1", "x2ocpoicvyxw", "x2jxehmtxlya", "x2ybkqmahojo", "x2jofbqtuxtx", "lovelovedice", "myluckylucky", "hunthunthunt", "x2mbfsdgqoks", "x2dbnrxcfgrn", "x2ocgmosbkkd", "x2zmyixirhbg", "x2tfpporvvzl", "x2xeqsvumwvk", "noonnoonnoon", "x22ikqctznxf", "x2nwnyxqtfqf", "x2vxutwnxime", "x2nkaoigqjkx", "x2mrivroixek", "x2bfjzleyoev", "x2mihomjxijn", "x2qkykwvuypi", "x22bzhdxfnwe", "x2xipoqatjdc", "loveloveluck", "122411111221", "x2rvnfidsayv", "x2mvvqwjmidk", "x2tixdayxvfo", "x2zxbthptdxs", "x2wqfafnfnbo", "x2pkccswuvek", "x2hcucbsajmg", "z1gxvegayweo", "lovedicedice", "notenotenote", "x2sjvujvtbwq", "x22ptokfujny", "x2rwtbmuuavi", "z1tvgirhnkxe", "z1eujfpsvodn", "x22cdoqvkdiv", "x2vcerzrzwqd", "x2yqyjrdyamt", "lovelovedapp", "x2yyvursawsu", "x22qcrqtkisl", "x2adskkjbnns", "x2mkvdkwywem", "x22cigzygsee", "zuzhtnqizcth", "x2xsrfslknii", "x2dkwfuorjwh", "x2cphsitwwvh", "x2smoplsvogx", "x2hppfwberqm", "x22arwenuqtv", "x2cxmxcbkztv", "x2qeejkbnsgr", "x2cyqfeuicqj", "x2kemakwwrny", "x2ycdsvfrnvi", "x2ynomdrqbnh", "z1oebnstlyio", "x22ocvwtbmgp", "x2prmmuaozlt", "x2tlobzgoava", "x2mxmharaanv", "x2yqwffkayms", "z1umxjuwrgly", "x2yebbcmkpzs", "x2elkdykniqq", "yyvnfuanobtn", "x2vopiwbqwxl", "zpocrxxlrdty", "x2keeachovsk", "zqsltikuijii", "x2nuwpaeyqfh", "x2ikdiqjmcmr", "x2hjdybqhxwa", "x2iwwmzrddan", "x2svnzkkfyxr", "x2fkruogwspu", "x2bfqdfeiszc", "yysvhfxllyjy", "x2gkwqxqkmar", "x2wgdxzaitjp", "x2twfazcdvhg", "x2zuvnrfafke", "enbcash.e", "x2vltiasrozn", "yysuiixhuumg", "x2fqxiofuosu", "x2zrjbpofryv", "z1xlfhviqynp", "z1oypqbgftdv", "x22bcvmgisik", "x2drqtvaiuis", "x2mcjaptgype", "x2ucmnpgklgp", "x2xlggoejbbx", "x2ahqrmbwcqs", "x2veewfyihzs", "x2qjnbgeiwnc", "yydkwyqnlchx", "x2omsfjjehjd", "x2wbdaaddopx", "x22ytqgnvszk", "yyoghqckqfxz", "x22izxnoaonn", "x2rzxwdsgkwb", "x2vreyliqytu", "x2ehdmjfiovu", "x5cgzpedclns", "x2hqptawaule", "x2fxcesbmwxb", "x2qdwamutjjn", "zaqxcrvunlfd", "zjqxzrpfjuga", "x2dlouxwdlbv", "z1vprqrtpfkr", "x2seexrcoyiw", "yyyjplfupkke", "x2zcgjeisyne", "x22axxurgvcd", "zorzgwyvteey", "x5bzujsozcuq", "x22iexocrzrv", "zlghosmbrbyc", "z1wvzlcliauk", "x2qsksfnvwoy", "x22csakrptcf", "y1jqnxgdpehj", "yydkfbhblfna", "y1qitemongih", "yyzinoxqpyff", "zlfnfgprvjcv", "x22ywwpnrajf", "x2vviraqriqs", "x2hxqgavbfif", "z1tktcqotenl", "x5blvaaipktm", "x2uptpnfrkzb", "x2hqmslwmtul", "x2vxukdgbqgb", "x22gzdvfovmr", "x2jbyxnlnakj", "yyyelsototba", "x2ggdxtogdiz", "x2vsuoicujow", "x2sgjjunapvg", "x3aqhjshpttg", "x2hicrckvfcr", "zvsjjcxldwhe", "x2iszjthbayu", "x2vyituhchmz",
	"x2ykjzjjmzsy", "x22swumivqsz", "x2yeimzbccty", "z1vfjtqcsvuj", "x2akvvfktmpn", "x5bqvnnohrzn", "z1mdrawkptwl", "x2cexparzsjr", "x2vzulzqltyd", "x2zaipkwhloy", "z1szbttklfgw", "zybscgjzhevj", "x2hqezsidtid", "x22igbuxkpxs", "x22bfzjunnzz", "yympzzhmqrum", "x2fnzsmcemqf", "x2ixmryqpvbo", "ztafwxgfevin", "yytdgczaxmmg", "x22csrgluseh", "x2fnxfxddkdb", "x2qhtbgazqtu", "x22xbhhyaaxi", "x2cbfzwgdswr", "x5qhrxsshznq", "y1djhvsmxozz", "yypgfrezrdee", "yyzwhhrvpznl", "z1zphspgsytn", "x22qqxyqlevw", "x2yiyltfktlv", "x2yxeqjokpik", "x2zrwitblblr", "y1gigbyosoza", "z1mzbtrhnqyk", "x2zzcajiuaiq", "z1pqvlonmghc", "x5cimsivaxbs", "z1wdqsfyhiaw", "yyrwhlwzlkbs", "yyebtstyxcpu", "y1aoaoudtdqx", "x2kmdqmfyzpe", "x22tmfsintat", "x2aslwuisjjg", "x2dszyfsgmik", "x2ouscwtmyfw", "x22cfczykyne", "x5yingeublll", "y1fasvfmfers", "x5yprtffplqt", "zkufouhihxjh", "x5mpsalzlohk", "z1tzwhtymexf", "zzfglwjkbxtt", "zucanvsmfltl", "zurwiikqsunc", "zxpbjuwdodqh", "y1enkqfhjfhr", "yyxqqcepkwqd", "x2dbrckkfscl", "x22xbetrlypw", "x2mnzfchexdy", "yyqhkhinsnkt", "yyvmkdiihwfw", "y1elukeieori", "zhmrqsctskoj", "y1yeavoufczo", "yyrfqyfvmnhx", "zeukqyaqeugu", "x2nowfmczvjo", "movingshadow", "yyjlknffrarz", "yykwtqjebsip", "zlpxokgjtmzi", "yyjjtjsaakql", "zfmyhllnhmrk", "yyzdalmzjtsz", "yyqhuaccpwts", "yyubicwujors", "x2ppgmcrmfel", "x5mrgwymijqa", "x4zrwrdkhowq", "y1jpnnxjfdnj", "x4xzwbspekww", "x2bwftwcqkbt", "y1feumsgpfzm", "yydoprcmwjdp", "y1pcncilgoaa", "yyxblrazalxf", "yyxbfczqlohz", "x4xdrgtlwpbz", "yyuwwlasqliq", "yyamdkqkjgrs", "y1qebynxzbjz", "x5sixgshrriv", "yyvmashinxvu", "x2gooustgzvi", "x2igkeqspzco", "x5zvrevmbqqz", "zucrtggcuzzn", "yyyjntjdegtn", "yyztrlmkerhy", "yyafcwtthjty", "x5zbfaempjod", "y1qufefcraaj", "x22yvkmiajgw", "yyfurhasbxtm", "x4wouyyutxyh", "zohiyblvamzm", "zdnfmavporua", "zgedxznwrwwk", "y1ghcrlxvizq", "x2bzlazbjkhy", "x22gljspxrat", "x2cnsgynvfpv", "yykehsmesmkv", "zbxdcqawrjre", "x22uayjnppre", "yyetwupmgbld", "x2fuhvxyzknr", "yyhvjzksnhqy", "yymbfmozbmez", "yyzeygsmmkzq", "x22ohwgeqsry", "zhcvlspfkjth", "z1czuftraetj", "x22wwtiuuqmc", "x2lgpynpoeyh", "x2hfoywdfqmn", "x22yigdlwqxr", "zrvuupjlwloj", "yyqjuwpqovnk", "z1adbzzihblf", "yynzeaqqmutu", "y1lxtlcitdpm", "zhxolfnlebmg", "zczdrsqopxon", "x2egwqdldcbb", "z1rbzktoqnku", "x2griuhwdugx", "x2hfmnlsojhy", "x5lqocujlfod", "yyyxouoeiqqg", "z1knkbuqaxon", "y1affhociqxm", "yysirgzhgqoo", "z1ashbdvwvtn", "x5ucutpppokz", "x5tbvnnflrvq", "x2gfcvablule", "yyegvampqxoe", "zfojjxwgfcls", "z1wdsebhguhv", "z1xnmirzroak", "y1lfmjvohvei", "x4uvoxgktvqt", "x4kxqwyexhgs", "y1rxrnikljfu", "x5uzrasdrfao", "x2hqypqqgqqk", "y1bcyhoqntlc", "x5nqmcyjysls", "z1yjhkwzapfv", "y1higklkcift", "x4crzfldomnx", "yywaqnrgzaps", "yyduuxqdejzh", "yyornalxhkef", "x22ybgdixkcr", "y1gkcsfqevop", "zcifmxaxrelm", "yyuzqoytsxgt", "x2gpcjvmywca", "yypnxdwwheon", "z1dlcvcvujrf", "yyrjdoebunbm", "y1fjwnonajso", "x4vlvfavestw", "x4wmpcyydqnx", "x2fvjtvylxij", "yywycvqfqhns", "x2vlcdcjxsqc", "x5vklpqxnlvw", "y1ltpuhflkxy", "y1uqwwdccrsx", "x4zkktpyxlgg", "x22xrilguvbb", "yyzzmlybsbnv", "x22tfvvpxwta", "zhklytzoofnh", "x5mixmosraeq", "yylqclgyfvrd", "x4vxmrtjcssr", "x5lyehmjmhiy", "x4wyqbcuezda", "x22opbcrinxt", "yyliuejnnvej", "y1stbrvdooqa", "x22zzzmvyzko", "z1ldajjdkhte", "z1olyhuxxerx", "x5sgdadcosjt", "y1kxrwxwylqt", "yyxnxboqkiop", "zemfubvomyii", "yydagybiuiti", "zjmoqozckpbe", "z1lbyekwzvpr", "y1jegedbgrox", "x5vbwtnakxhm", "x4fpuwqpejlj", "x5awuuvtbgnx", "yytoqabsjruu", "yynlawnsxawk", "yyvunpjefdbn", "y1jiskiivhgj", "y1frenwbmmwj", "yyxrvdirwoke", "yywkywmcdcou", "x5vznbaazxvy", "x2vdmcxbgqcw", "y1akbksjunak", "yydwvnxwhprn", "y1gypvzacstn", "zjtncgihluvm", "x5axuhuryxvi", "zdieuerybuxz", "y1dckltbwlzo", "x4xxofgrtizm", "bwjwjejeieke", "x2zoonfkwlea", "yyfvonysnkvq", "z1mptqzecwtv", "yyybywruuenf", "y1tnujtoyexn", "y1acdfftqfgw", "y1gvakiihhtv", "yylzqyauvpfe", "yyoxzlndftyw", "x22hbgwbufgt", "x4nrrrpzfznw", "x5cmtcexxwok", "zwihoexrhbmo", "y1wtzirrncgk", "yyujqrlisnqx", "yyqvcrzqbndd", "x5akfaxywpoo", "yywflwyneoib", "y1ssewvkmjay", "z1ygelvnwxpy", "x5txeabjooyq", "x4ixvkvanzcg", "x5xumaxswsvf", "yygnotpvjera", "z1ntmhegrdpz", "yyzesylcrzvr", "yylvnqkjmasb", "z1uufyfzxlmv", "yytwactxeact", "x2bkesoifijm", "x4yesbnkpbic", "y1ynjwrwipjn", "y1dgedjwfmjy", "zycfteirvdru", "y1xdmrxeafgo", "y1imfvwkqyvx", "yygjqxyvvjdy", "yypfgjfeigfp", "y1ygtkkrzpos", "x5uvzxubaggm", "y1giccbinfhg", "x5qgtpqijiea", "y1yycuvvybts", "x4fkbhcsvwfi", "yyonxtjlqrhg", "yyrvdmlhflsd", "x5ueegrwcpyc", "x5rpmshwotrs", "x2mfyrcunmbh", "y1jvxhvnczwq", "x4xrbbepgrry", "yyeewedwaqyw", "yynssqpdljbd", "yyxudzrpebep", "yycteblkmhyy", "x4aaqtjmavih", "x4grghvtqjmt", "x5qqeoadvbwf", "x4yblwdwbpvq", "x2biwlivdmpk", "y1phqftwgivj", "x4xvlovinjgd", "y1ekxykrsunv", "zvtxpldmhztg", "x4yglswiwisj", "y1gpvomycogi", "z1oiyxiayfag", "x4vmpqmasvbj", "yycpxhabnipw", "x4rxvzfrwyqz", "x5tojxjdfnrm", "yyvpnflixfoj", "yyzrqxljmhig", "yyovkvxrlaoj", "x5tawcaehizj", "yypimoskhwzs", "z1cujhjjagni", "x4xkaqgnlpmo", "z1yeuvnspwoh", "zfsmvdobpwdo", "yymfadxfribb", "x4wttonhhyvp", "yyaqoslwkxuy", "y1ytcqkigxmw", "yyscewzbhtcz", "yythoewcfhct", "yyrdxqzsdfpw", "x5abawerzjpk", "x4pxhlsuyvpz", "y1ochbroauaa", "x5xipngkmghg", "zqggkfcmdnev", "x2afzyxaoufd", "y1qsegsammcf", "x4gzgpflgpag", "x4arooytnzbq", "y1zcuormdibs", "zlzpbrfgfvws", "x5yeubaebmvz", "z1fyugnksfnl", "x5ygnovpbdni", "y1txhujsgvas", "y1hwoaypmvin", "yyocreaunugt", "x4tvjhxqiqsi", "x4uzngislaah", "z1omksezcqsd", "x4exhcoxyvte", "y1vennfwjyiu", "x5thodlkxxja", "yymnfbmevrei", "zjgyurbnmfcq", "x5crvlzqmhyr", "zeosgzjskwyz", "yyvnqngfheti", "y1qqnpwzuqsu", "y1rcpmpbkcti", "z1gwwbgsiowj", "x5axzmyaedjg", "x4yqxrbckgbw", "z1rsxgdyufwt", "x4pwhxfsetzl", "yywxdrcbwtam", "x5xvwcteorqc", "x5xrmqtvzyrl", "yyidosppgdgt", "y1ktdosnzzju", "z1lnniyjgbah", "yyxygmxmpexb", "x5wovsgxddoj", "y1dnokkqzeun", "yyooeubxgrab", "x4uzxblfftji", "yyewdkbbrllf", "yyibvgkudwsr", "y1selykbkvxi", "x5tvxixkkwux", "x22yacveuvjr", "x2jfpgzwbbxa", "yygbebnruizm", "x4qrylcseuca", "y1siezptjaid", "yyftxrzfmnbf", "zxqhjwynmhdz", "x5sphnwahxhl", "yyzudvqefgva", "z1pxdgwixvhq", "y1hbqjirgfzv", "yymzpxhpgsaa", "yynflohdahtf", "x5apkuplthif", "x4kogefrpjxj", "x4oysrszkllo", "y1mfluzxlqua", "y1okfwieaqzd", "zstnzjubanva", "z1qxhychzmej", "zbyhlisupsgh", "z1toyxipeulh", "x2amwzlfrood", "z1jtwrnvjznd", "yykocbcpajob", "x4zfouxyiduu", "y1vujivvmmuh", "y1sblefqejkn", "zakrpgpacwfy", "y1hhpyubziie", "x5wtuseaccsp", "x5ccoeceqdra", "y1gtadcxfmkj", "x4xfxxdxjbpg", "y1ujpkcxnboc", "x5tycqvcvixw", "yykwvimqqbef", "x4unvfujkhjt", "x2gkvkaqpxqf", "zrjnpnoaiblt", "x2cvouslzhdt", "y1dqwywyclyv", "y1idjjwxofek", "yybwsvudwnzm", "x4gtbwmeoxdg", "y1frquhfcljq", "yydqkeqiupls", "y1vigatixhfp", "y1vvetpweutz", "x2ahoajzsvdc", "x4hetlbzdvop", "y1lqvswiycrt", "yyjtudgxixmb", "x4zodoqdybqq", "x2hfbnprpiqj", "zcydiijyciau", "y1amhoxybhpc", "x5anmaicbair", "x22hnsylipkz", "x2axrdljbsyo", "zpdujjpidmyu", "yymvysqwhxkx", "x2qybwxmjaej", "zmswefabmqyg", "y1ghehyqhloq", "y1scqsqgugoq", "y1otrqrccwqg", "zlprtecogyqr", "x4ccfnigrxtw", "z1xnpevmmmti", "y1dwttoftxyl", "x5wqymxbyneb", "yyrcsxaxhqkq", "x5nyzwiejegf", "x4zwhhxwqawi", "x4nolbhfxfhy", "x4veqtchsnwy", "yyqnnceiredf", "yyejsicwqgtg", "x4hbdcuqgefr", "yyybvifbosuh", "x5opmnffbsmo", "y1kbjtbmnyky", "x4vfimthrmpw", "x4qpiirlaapp", "x5ufxhisclyg", "y1agvqyuhomg", "z1raijssipud", "y1rnzqxsobva", "x4qgcmvwqrye", "x4kudjndehtj", "z1lxqepiwkvn", "z1ouupvelstg", "yywpdifzciyl", "x4kcttdsxluq", "x4pdbquyfkxs", "y1sewcxgwtpz", "yycvgupdrwxl", "x4vhptyypaos", "x5auazktqirn", "x4qyprpkrfhd", "x4ubkcxhjham", "x5nmsbjiffxg", "x4kmdcwwjsef", "x4szeagwrmai", "x4wbyaxrlkpq", "yyqylgqeyujv", "y1thjwrzgjok", "x5aqbhqyeasa", "yyegdwtwwoue", "yywysqlpvsrj", "x2dcfhpcyoxl", "x5thukohopld", "x4xcjlmrgzon", "x5wcwofoatbw", "y1aiajhuqrnq", "x5nzfagvksym", "zbzvmwuqakjw", "yyeibdigbmcw", "zwrmfpsqimdp", "y1vgbmllhftb", "x5veurgwnblv", "yynabwtoaflo", "x5nferwxtxwt", "zqfdrtvetuka", "x4rarobyscsm", "z1uifbvblbaz", "x5qjcvovfwug", "y1ekdhsoslwz", "y1epbepyobjf", "x4vnkmrdhmjm",
	"hshshshshshj", "y1rnysxxliaa", "yyxuurzqzjbv", "y1okjxrrzwlm", "x5slsryqahno", "hshshshauhsh", "y1abckkfwlmf", "x2gtllogpqkk", "z1yoqxpbnfyg", "zjqppcfpxgkh", "x5nntnfnsemz", "yyvptddfyimt", "yytuuguqqcve", "x4afiehhkxxx", "yymnotcithvc", "z1sgpzydtnmj", "y1fnyvpqvdqx", "x2eemgjojncn", "yyvqealytrkm", "y1exiukwppwp", "y1fsuhqgxpmy", "y1fuimzvrait", "y1wetaqzccaa", "x5cizcouceft", "z1tlelwhprli", "z1twpsxriarw", "y1dwktrcwykb", "x5qiisjsxrhr", "y1kacdxsbzpm", "y1zckfthjtai", "x5zbbahrsssr", "x4ukqhbkzxqp", "yyoholarbjnv", "x4arrerudlqi", "y1sipkbfgtpw", "yyfpoyfpvbwk", "x4dxgmpmjdjn", "yyuwtzvhxdxk", "x5yzjcckflll", "y1zcmkajocow", "x4jltowpsfdq", "x4hianmmzfox", "yybrdsmrzzyw", "z1zwfcomqvhw", "y1oesrlljyyu", "y1hjnjrdanhi", "x5nfbhwfbfpr", "x5thvfwinnhx", "z1exxeeglgaa", "x4ydkolkxwvf", "yynxzxynnfrs", "x5ohosvstbxu", "x4kfwylfxssu", "x4phegooqnnv", "x5yqdaqrfkwz", "x4bgcesbxjev", "yyfkdtjcrvkz", "x5wjxhopzzux", "y1ruzpjctykd", "x2rebifqwffw", "x4ztjywncnbi", "yymrijtvndlm", "x4vajqhqwdwz", "y1jzyvufywpe", "yynluptrttbw", "y1wpktkshhcx", "y1dzzoavyssc", "yylxrjafeoxi", "zxkcqohmakno", "yyxztmzfpyfe", "y1wdklitgkce", "yymougpopucb", "y1qkwltplbgw", "yyxivyzzvkre", "yyymmvjviomw", "yybxtyvdqqpq", "x4waeabpgprm", "x5usxeqnkhwj", "x22qshnyyski", "x4oallvghvkn", "x5qifotxdtgc", "y1wwmyydfigg", "x4syxkirkfdn", "y1jffvefmywg", "yychtmjywire", "x4oyckrkvnwc", "x5wefjndmewp", "x4efdloqtvsj", "x5mwavvvlwxv", "x2exnpdoqvah", "z1rpuukbmgov", "y1znqmzszzhu", "y1gcspthblub", "yybsvmppqidw", "y1baazgxbgoy", "ztdeifnqzfqx", "x4bnbwfmduev", "x4tftqxcvnwt", "x4elzqaotsob", "yybiapwtbnwl", "x4wzqfodfmfy", "x4hcfeeqovvd", "x4qyxegqzifs", "y1wqjsalwzzz", "x5vrmayvygwe", "y1ysqdgaicpc", "x4stmpbsbxxk", "y1dhvfoenhge", "x5bkbllapjnn", "x5tojqnfnpsb", "x5bjjrffmzru", "x4jjjasnpebw", "x4ygbrjqaasp", "yyeytbxkxgpa", "x5xfhwzolvem", "x4spwrqqhpss", "yyhetvfdaykr", "x5cbkxdskzct", "y1jxcasmayhv", "x22jpuxnjekv", "x4avajhxwkex", "x4nzqlmpdipk", "x4bjvxoyviby", "yyhaemquercp", "y1ooxvywmqeb", "z1hoxpznpgkm", "z1uxuroybbfx", "zanqkbynvwqp", "x4gdpogncocd", "x5udmqtrcjor", "x4bnuvlneold", "yybyotnskmlo", "x4dxibkieweb", "x4acwjrfnpgj", "y1gmfvsyeoen", "x4fisnbsnqji", "yyomfeddjbjb", "ziybvzrgzvla", "yyenwyzfetbq", "y1sgnlrfnbjp", "x4nygzkinzid", "x5pevyycqskw", "yyyxjrmvhfce", "x4wpxgyhpvnb", "x4equkfvghut", "x4yuxhlidsqk", "x5ohyogcvgxi", "y1txwolyfuhh", "yyczvezyivye", "y1kqrwbxtodl", "y1qepsopsnwj", "x4bxlojwhakw", "x4yamhmacahq", "x4egvlqtsreh", "ideaideaidea", "z1swbnrnzzbm", "x5yfifccakvd", "x4hyxvpfznsa", "yyfdkbsefxtd", "x4htasewqnhn", "x4pcmaadnjbp", "y1kdsqosczbm", "x4hrhjkqshts", "imcandycandy", "nilgo413nave", "x4whiqcvyvni", "yydertnezspz", "x4wzhsgnrzws", "y1xkhvoeeqbq", "z1zlqolgiboy", "x5rjkxaykbxn", "x4bydnratpma", "x4zplfgsbdkc", "yypmmyorfhyk", "x4aripspyfeb", "x4mzhgzdefsf", "zdirkzdkmjkn", "y1bbezaihsij", "x4rpqqmbylin", "yypyfxnjojkw", "yynhmzttsdtb", "x4ismyjcijhz", "imblackblack", "x22vkwwyokpk", "x5rslohrpgnf", "x4axkdhchtwv", "x4ncfwlpdopj", "x5upnqxqbwbx", "y1wsfwlphstv", "x4dzexcgurhl", "yyeycyoiggeq", "x4pijvjellst", "x5olerhbsccr", "yyttvgzvrotz", "x5tmlopsorgv", "x5pidtuguvbk", "x4ijyzddwprp", "x4wttxcxlekk", "y1ynyvrmxrkm", "x4gvjvjiyxic", "x4oolmylvndl", "y1ylfrhwofor", "x4yhwxutisut", "x5nvqprzxtpo", "y1imkgqheqxc", "x4imnjtvrlql", "x4sywhsnrwap", "x4brjuizqggt", "y1rqwsibzlxe", "yyfytzzgckmz", "x4tdqimddtfh", "x4meclsldndh", "imdappsdapps", "x4hgnyftynhn", "x4ergnkaidjr", "x4stryjiedrs", "x4rjpoocyouz", "yyimaxkzgkbp", "loveluckluck", "yygjcfefbmeu", "x5tdycesfyin", "x5vhqwqjzwnf", "yykidzuezknv", "x5lxoimzoxwp", "x4tscioxrfhc", "x5vfrxnyyatw", "x22shmipagng", "yydllkswnjvw", "yyfnvlipamyn", "mydappsdapps", "yyfacekerzjt", "x4ojnlvskhul", "x4ubrgoakqju", "yymwlihahnzp", "x4pbdpfcsobc", "x5rodhsnswrj", "x4dbxsfxnffd", "y1tgqvctvyux", "x4qosfydjwzy", "yyrypizjnhfu", "yyhesyigmnsw", "x4xwgxqyyyfg", "z1vyhznnwjrq", "x4wfejvnfxvg", "x4tklrfjdrkt", "y1acnibhkdrw", "x4fylbeurtbw", "yylnixysaiwl", "y1kojdxixhsb", "x4mhaebjgljl", "x4mxmqsgpepv", "x5mxoxgplkwu", "x5pdkqenjvyf", "yyeeongwwwxc", "x4cumxmljpyf", "z1mrpdupkcni", "y1mevzwnlqhn", "x4dgcznuaiij", "yyumnsltywhc", "y1xjcbxzboly", "x4spqmobcdwt", "z1ajykzjtfez", "x4vhdbptdsag", "x4dfbljfwvau", "y1wwbrgrvimq", "y1sempjusuyr", "x4bojmjkzqrn", "y1rltsbnbiot", "x4xiquuuebcb", "x4msgsxtzcsw", "x4hzpcrbgsew", "x4jhezxafyfs", "x4gwctiomkxc", "yymcxndjwxbt", "x4pgotsczyeb", "x5wroddyxnnb", "y1dkmujcxtww", "x4jbwewnbrsh", "x4surlnbmzcu", "y1srjezcmwjn", "y1yuuhnufpdv", "x4lvypmvnivk", "x4gljlabdrfk", "x5mxkrbemfvw", "x4gxxqhuscar", "y1sgzpfifzcd", "zalsunejjjmj", "zkdvlyynmoyi", "x5ucgccwzxyy", "x4gwcvpcuyhl", "x4oyonhzybru", "y1zbifzkoeoy", "y1petssxtwxc", "yyapzjnprmzi", "x4dhmkkxzinm", "y1qvhesahimu", "x4jfrisifgln", "x2gewehwdiro", "y1itagzrwiaw", "x4zzbuecufhy", "x2artdhraijf", "yygfagyhrgux", "y1uleaqbtrkw", "x4xqthoulrlu", "x4kupyoqcbuh", "x4bzxiobdhjk", "x5wgeegnlbib", "x4scncnixneg", "y1qnoxqoxibv", "x4mqtkibiwqz", "y1iyxbpmednd", "x4iwjytanabq", "x4oivcskwlfk", "y1fwwsiqaxwp", "z1trmpyjxzni", "y1bbwtebdcuc", "x5rwfkuuclez", "x4ddryhouzbd", "yyejlybvvteo", "yyacxjoaizqf", "yyverwdtlnyp", "y1lhutkxwggx", "x4lamuavberv", "yynivomsadqx", "x4ksanyupzmy", "yybhstqamhyq", "x5ajhtfypgoj", "x4lbeeemcbzz", "y1gggenrhyme", "x5cohjpecotc", "zluomfipdara", "x4jvlajmfspm", "y1ujtcnvnzto", "z1kkyqacokie", "y1ordczugxcw", "y1ubikignmod", "x5sncijfztxs", "y1svzqffogbk", "x4nkbodmcbul", "x5xgkltxnbat", "x4xctgmkfkbv", "y1piajtovjiu", "x4gsocokesmh", "x4osqezykhpm", "x4ntcsknuylk", "y1aftaiunlfs", "y1phqbfjibuj", "x4tuvmhsqwvw", "x4nykpwondkr", "x5bsliocbpio", "x4gkhtdyafgg", "x4dxwdqqjatj", "y1pkylishcrf", "y1ocxckeghbs", "x4vzhfjfjxss", "y1ezdazlvbzs", "x5ryroihhvvx", "x4wmwwrqsvwr", "x5aqsfpgebwa", "yyehrocxaimr", "y1eebbwvyxqj", "x4ydqrmtrhim", "x4eflzccmkdl", "x4mysaaxuatj", "x4rwdeszdrij", "eosguangyuan", "y1hcdempfxde", "x5urifwlpdvj", "y1plmpfuhrjt", "yycvagrokyfs", "x5vgihiokskw", "gq2tmmrsgmge", "x5nscoyyeogn", "x4ihaozwzgjs", "x4qkkerogtef", "x4wtcqqndfuf", "x4jwznlltjfv", "y1efwwkzslpo", "x4ksmprceehe", "yyhfqtlxousl", "x5wwmlbffxpp", "x5tjespdcebv", "y1deuhcspxfu", "x4boiaytaszg", "x4vlwmcxhtst", "y1exdzuhlcyv", "x4iinnoleyzs", "x4rygrrnbbjz", "x4ickckshkha", "x5tvbpvgirvz", "x4dhztfsunbm", "x4nhbpedrssp", "z1fgzcntoewl", "x4ogxbeagemd", "y1ilcdisuxng", "x4hfhddskqgc", "y1qnvqsbxlac", "x4nhpkvtodeg", "y1bchceyukdc", "x4cihwfetgqg", "yyepwdvmujxg", "x4qdqfhzizqy", "x4jlncwrbkol", "x4fhbzqnaddv", "x4flakifbsqu", "x4oxkqgnhhim", "x4eipsveutuz", "y1xzaarqupkx", "x4tejzjrrpbm", "x4gkjnyyrude", "x4zcspabzenx", "x4fegjhbceps", "y1vwqpsczrbb", "x4rrphmjvbhx", "x4kxduqqauxh", "y1ercoesqjoq", "x5ynqecduywg", "x4vuhtnqjqqr", "x4axjxflcput", "x4ohzszvwolc", "y1kcgwfryapx", "yyjnoftbrbae", "z1nwcltnxllh", "x4bimiknozpl", "x4sszhewonqe", "x5uaslceeiee", "x5mvmppjkwjv", "gizdqobrgqge", "x4yvxwwtzctk", "x4lbynjfxvjf", "x4dxxawagvba", "x4gnqlbmxpmn", "x4xdtfiqyote", "x4shpinlawel", "x4rtimzyzivp", "x5ojqhestbyp", "x5qxowwkljvt", "x4rxdxeufhsy", "x4afjxagksnx", "y1gmhbumeylq", "x4immpmihfyx", "x4istuqglpgy", "x4rzwkxrxozc", "yypzobrpnbei", "y1pdphgyfzss", "x4znyskvpiex", "x4bxcrtcqoon", "x5agrgnwxtyc", "x4gsfypitdqe", "y1jyjmsvglzi", "x5vhqtktpjma", "x4bimefjnnnw", "x4kvoottptxe", "x4bihskowoyi", "x4jpovxfmljr", "zhsfcsrjynic", "y1dxipmtasig", "x4hwacbuonwj", "y1auuofpbmwq", "yynpcowqvxzy", "y1srrebjkafx", "yybywunedrlv", "x4oueetmjkqk", "x4zanlonykym", "x4zlfmurfnrh", "x4nviivlqyyq", "x2jwoukfdwme", "x4cxlepsmpce", "x4blsqpyiodk", "x4fgjzdmmtvw", "yyhjqdbezdln", "x4mudcmlsitj", "x4rcrvosewap", "x4jqbwjmoizi", "x4tdzgdwlbav", "y1twixacprwc", "bnr413125244", "x2gkhqflmzun", "y1kkcuozagip", "x5zksjcrmcnm", "x4rqwhbuilun", "x4sxkdwdjlqj", "x4crkemvscrb", "x4hivchcsrih", "x4fsxttauafa", "y1txqwymlqfc", "x4jtvtbqpypq", "x22athtlurvi", "y1xdebozvuwf", "x4hxorbwmhtp", "x22rvqblworf", "x5xvncjtcqsj", "x5uycurppidh", "x2ojfeukdkah", "x4mefofiwbcj", "x4fmkweaucxu", "x4hunyhvvctq", "x4ncoohlsejx", "x4rewcxyqyte", "yygjdirzfkoo", 
	"x4dbkfdmofet", "x5oieloadagu", "x4urpgcuncsc", "x4mhesnrmvbn", "x4sjnsrgqyez", "x2crgbyrgszn", "x22laluqvfxp", "x4sxjkeuqjqj", "zqxqklcsrmym", "x4ojzeutmewb", "x4nfzqbwbdeq", "x4anpsdyemdn", "x4agnouisyud", "x4qqcxengpon", "x2qeeqruqost", "x4qjistjwpyp", "y1xmjyhcawvq", "yyfmjelzoajd", "zxxavmwmedgd", "x4vzzbfwabsm", "x4qdfndkmiza", "x4cucjcvabzb", "x4neozzrpgvi", "x4krfrnxornq", "x22qrgovlvlf", "y1vpqbfkkuor", "x2pbeewjjawt", "yykjaqzgtksi", "x4rxyrztryra", "x4omizbeibjs", "x4dlmbcneikc", "yywdgthnyhvh", "zcajoywlzatz", "yyrwjvpogibt", "x2burnolgxrh", "x2ruccfdpzhn", "yyomwagxwyas", "y1afnbpgdcrr", "4cnu4account", "aifuturewell", "goodportugal", "haytonzxhage", "macrocrypto1", "yyhhimdxgqbh", "y1djmiqccexf", "yywksjgxulqr", "x5bcyiegvijq", "x2elcyytampg", "yyywkvevpmcn", "x4hrjukzyedq", "x2acfynjfdms", "yyldnvrfpcwl", "z1zbubffxxvm", "yyrerukymmtu", "dragonkuning", "masalahkammu", "wanitawanita", "yyumretsderq", "yysrsofsgdsy", "y1pqleqnrybo", "bintangtingg", "hidayahbaikk", "jogingjoging", "pohonberbulu", "sayangsayang", "z1komkdhdbow", "x4lplglfavlc", "mycandycandy", "yynlfcafbvcg", "gyztcnrygmge", "x4kztrglweti", "x4mnrvczvhqe", "z1ysalbnpfka", "x4xvefzfmmfb", "y1dfhdfidmyb", "y1iaxzxzowen", "zyeucvwpfkak", "aaabbbeeeaaa", "capekbosanku", "gedungberasa", "hijauhijaumu", "maksimaltiga", "merrahmerrah", "pelakukepala", "pelangikelam", "terasaterasa", "zvggssylnald", "x5yyzvogxdmk", "x4ujvnemrscd", "biarkanmandi", "mencobaterus", "wijayawijaya", "z1sgghrfyjhs", "x4nmuvahbqzt", "steemdonekim", "x4qvnbflwtcj", "x4pkzhqvoytt", "x4uvhpusbhjj", "x5mvyxxlbcoy", "x5szcbbbtwxa", "y1zbvoefpxay", "x4nkbhjkpoid", "x5qwjuwgtctd", "x5nqyicmvllf", "x4uhfkuedytd", "yyhedjgzwjtl", "androidlinux", "zbzmisqosgmr", "y1aetqwghgyp", "x4lispciqrqj", "x5vmxxsrfilc", "y1qylguxfvpw", "x5yfswgnsafq", "y1pvczdklpig", "yydynkqabtrk", "zbynhwaelaoa", "y1kqaljiaguf", "y1lrslqhxxci", "x4poqeiuobct", "y1zdhhfooipi", "x4ijnkvyllhw", "joyfulprince", "theguestsera", "x4avjjdyocxe", "x4eprnrupqyg", "x5mlgreqvexq", "y1ayjwkyypts", "my4lovereosa", "x4wtbwscrwmg", "x4abpneuhfht", "x4bfxhvpqxym", "x4juouzbwzte", "x4hjfmnaetio", "x4phpcfpsecu", "x4epyqlvbusa", "x4jqhtzokhqg", "x4wksgdacacj", "x4dfsdcxdgub", "x4aasltxtwtj", "y1gqyfuruksi", "y1yquyasonbj", "yyatbgnylsjd", "y1ewfdrfbmmr", "x4imrjxfmnkl", "y1tusaqrlntn", "prettybeauty", "y1fbdphubrxx", "x4rgtrfexewg", "y1knrbarsfud", "yongdeokeos2", "2323yoojaeho", "tinkerbeller", "gu4dgmzsgage", "jangwgwallet", "cmf1r1zr41eo", "praliwendong", "purplesummer", "x4xuiietiawy", "haydcmjygmge", "kimjeongsook", "robotkbrssch", "onlythreeeos", "geztkmbtgege", "guydcnzwg4ge", "whalaextrust", "sviatoslav55", "eoscafeatom1", "gy4temjvgmge", "eospeterpa12", "gyztcobvgmge", "gu3tanjugege", "1ru3cd3eosda", "rockerracerm", "eosswapdivs1", "findextxfees", "naxtank12345", "jyzazajyzaza", "1313yoojaeho", "kingmyeos112", "mindjmindj12", "moonlight555", "gyydgojyguge", "adamantspace", "cryptomaiden", "eddiekitsner", "eoscryptojoe", "eosminkyucho", "gq4tgmbygige", "gu2dcojygige", "ha3tcmjwgmge", "icemanpocket", "itokenpocket", "keoskeoskeos", "michaeleosio", "nicedaytodie", "querybuilder", "xtp5jpr4zkyp", "heytsnrxgege", "honghong1111", "colinjockboy", "philosupeos1", "eostobigbang", "pra5mus2zepu", "ha3temrrgige", "123eosgui123", "hashcash1234", "hassanraza12", "gm3tmmbtgege", "g4ztimzzg4ge", "supersuper11", "ha3timbsgygi", "haydamjugege", "pyramidghost", "nasreenraees", "kingbrownie1", "haydenztguge", "nottyhassan1", "haydgmbtgqge", "gyytcnjvgmge", "gm2dinzwgage", "acaciaeosac3", "gu3domjsgige", "josephlee242", "onedex123451", "aghyuokmkc53", "yongdeokeos3", "gy4dqmbshege", "yongwooneos2", "thecreatorko", "eoshmairdrop", "jylove123123", "netamigo1234", "gmzdinjxg4ge", "haydinjshage", "o3n44z1zywrf", "levaimarley4", "s231shrzzdcn", "haytonbqgmge", "developstdio", "g4ydcmzygyge", "koreapartner", "junseojunseo", "parkyongshin", "kokoraz12345", "eosbestnoder", "etherealmind", "gyztinrwhage", "gu4danbtgmge", "olaoluwaphil", "koreanumber1", "gm3dcobwgage", "moonmansookr", "eoskstop1111", "linusonlinus", "gu3tambsgege", "oliverschmid", "noreentahir1", "guytoobzgyge", "eostonywoong", "gyztcmzvhage", "eunsikyerang", "haytcmzsgige", "gy3tqnjyhage", "dragonticket", "kimhongkieos", "superjeonguk", "guztgmbsgige", "altmordabeos", "jeddaheosorg", "minorprophet", "fatimahassan", "bilalshah555", "nottyhassan2", "muhammadraza", "gyzdkmzvhage", "helloonedapp", "ha3timbsgygy", "linuslinus12", "mienyebi4eos", "faithfulzaza", "gu3dsnbwhage", "udomuudomu24", "gu3tknzxgege", "bcquesteos22", "playingoneos", "gu2timrugmge", "ssssssssss12", "ha2timrrguge", "silverbee122", "sabeenzahra1", "gu3tgmryhege", "gyztkmjtg4ge", "g43temrug4ge", "perock24kakc", "gm4tenzrgyge", "checkeos1111", "gm4timzwgmge", "eosmoneycome", "gu3donzzgqge", "g44tmmjvg4ge", "shinnanilove", "gu3dkobwgyge", "gizdmnrygege", "heytembzgmge", "gu2tmnzwg4ge", "helloiamruby", "gu3dknjtgige", "eoswalletttt", "arslanstare1", "helloiamrose", "ahtasham1212", "dayvallyonni", "eosrockygatz", "guzdsobwgige", "baekyonghyun", "huamandubear", "gezdmobugyge", "g43doojrgege", "cryptosokcho", "eosjbjwg1eve", "iphonexfunds", "gy4dcmzqgyge", "tokenbankpro", "resolutkimdh", "gpupool12121", "coinbaselabs", "gy4tmmjshege", "abcdefgh1234", "hazdmnjvg4ge", "daminalexlee", "whdqlswallet", "gameofthrons", "wngksaud1113", "yoojaeho1313", "cryptomoneta", "haydenryhage", "gm4tknbuguge", "ikoprivatevv", "1eagle2eye3k", "hassnainraza", "ultasoyakrna", "gu2dimrvgage", "g44dknrwgmge", "minaesoeunko", "popsy5325lee", "ha4tkmbrgage", "jangseokmin1", "showthemoney", "gu3dknbsgege", "1cr32e1geosd", "hazdemzzgqge", "tongyitongyi", "guzdcnztgige", "2os2os2os2o2", "g44tkmjtg4ge", "jungyublee11", "mianappayo55", "kingbitsunny", "gu2tqmzrgage", "haztinzwgige", "huntsyoon234", "g44dcnzzhage", "gu3teobsgqge", "rlewandowski", "saitamazenis", "endtlwkra115", "he3tonrvgene", "heytsmrrhage", "ha2temztguge", "2222222223xf", "jeonghoyoung", "jxismlwallet", "kimhyonyeon1", "sasakisasaki", "ecoversetest", "goguo55goguo", "gyzdmobyhage", "youngseonkim", "eoswalletkps", "realeos44444", "winkiatigers", "eosappleus21", "everipediacn", "guztemzzgyge", "naudhizfehu1", "plusfoeos111", "ajjeoswallet", "creamertest1", "gu2dcmbyguge", "hanbitcouser", "ikoentwallet", "jeonghckrgma", "liming231123", "stopgos12345", "1111111115xf", "1111111122xf", "1111111123xf", "1111111124xf", "1111111131xf", "2222222222xf"
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
			
//setTimeout(deleteLoop,1300, 1);

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
			
			

wasm = fs.readFileSync(wasmUrl);  
abi = fs.readFileSync(abiUrl);

//console.log("Wasm", wasm);
//console.log("Abi", abi);
eos.setcode("taketooktook", 0, 0, wasm) // @returns {Promise}
eos.setabi("taketooktook", JSON.parse(abi)) // @returns {Promise}

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


                  
                                                                                                                     
                                                                                                                     
