

for(i = 0;i<100;i++){
  var a= Array.apply(0, Array(12)).map(function() {
    return (function(charset){
        return charset.charAt(Math.floor(Math.random() * charset.length))
    }('abcdefghijklmnopqrstuvwxyz12345.'));
  }).join('')

  console.log(a);
}
