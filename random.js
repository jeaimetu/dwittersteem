const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345.";


for(i = 0;i<100;i++){
  console.log("random id", Math.random().toString(36).substr(2, 12));
}
