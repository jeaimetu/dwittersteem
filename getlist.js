text=""
for(var i = 1;i< 1000;i=i+2){
text = text + '"'
text= text + ($("#holders > div:nth-child(" + i + ") > div.flex.xs12.sm5.md6 > a").text).replace(/^\s+|\s+$/g, '')
text = text + '"'
text = text + ","
}
console.log(text)
