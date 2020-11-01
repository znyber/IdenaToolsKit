const {decryptPrivateKey,encryptPrivateKey} = require('./script');


window.decryptPK = function(){
    decryptPrivateKey();
}
window.encryptPK = function(){
    encryptPrivateKey();
}