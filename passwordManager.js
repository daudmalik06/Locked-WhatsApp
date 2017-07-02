var password;
const ee = require('event-emitter');
const authenticator=require('./authenticator');
var MyClass = function () { /* .. */ };
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface
var emitter = new MyClass(), listener;
emitter.on('passwordReady', function (pass) {
    //do whatever
});
function askPassword(msg,bodyText) {
    var text;
    if(typeof msg === 'undefined')
    {
        text="Please Enter The Password";
    }else {
        text = msg;
    }
    if(typeof bodyText=== 'undefined')
    {
        message="";
    }else {
        message= bodyText;
    }
    console.log(bodyText);
    var answer;
    bootbox.prompt({
        size: "small",
        title: text,
        message:bodyText,
        buttons: {
            confirm: {
                label: 'Okay',
                className: 'btn-success'
            },
            cancel: {
                label: 'Reset',
                className: 'btn-danger'
            }
        },
        callback: function(result){
            if(result==null)
            {
                authenticator.resetThePass();
                window.location.reload();
            }
            else if(!result.length)
            {
                askPassword(text);
            }else {
                password=result;
                emitter.emit('passwordReady',result);
            }
        }
    });


}
module.exports={
    askPassword : function returnPassword() {
        askPassword("Please Enter The Password","Forget The Password");
    },
    pass : password,
    eventHandler:emitter,
    askNewPassword: function(){
        askPassword("Please Enter Your Desired Password To Lock The Software");
    }
};