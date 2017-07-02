const passwordManager=require('./passwordManager');
const fs=require('fs');
const authenticator=require('./authenticator');
var password;
var secFile=__dirname+'/sec/sec.txt';
var websiteAddress="https://web.whatsapp.com";
if(accessingFirstTimeAccess())
{
    //he is the new user
    //accessing first time the app
    //let's ask password and encrypt the secret file using the pass
    //later we will verify his password by decrypting this file
    passwordManager.askNewPassword();
    passwordManager.eventHandler.on('passwordReady', function (pass) {
        password=pass;
        //password found lets try to encrypt the file using this password
        authenticator.savePassword(pass);
        $("#webview").attr('src',websiteAddress);

    });
}else{
    console.log('later use :: please ask password and confirm it if correct open whatsapp');
    passwordManager.askPassword();
    passwordManager.eventHandler.on('passwordReady',function (pass) {
        console.log(authenticator.isPasswordCorrect(pass));
        if(!authenticator.isPasswordCorrect(pass))
        {
            window.location.reload();
        }
        $("#webview").attr('src',websiteAddress);

    });
}

function accessingFirstTimeAccess() {
    return authenticator.firstTimeAccess();
}