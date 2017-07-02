const settings = require('electron-settings');
const sha256 = require('sha256');
const {remote} = require('electron');

module.exports = {
    isPasswordCorrect:function (pass) {
        var ps=settings.get('user.pass');
        if(ps===null || !ps || !ps.length){
            return false;
        }
        var hashedPs=hash(pass);
        if(ps!=hashedPs)
        {
            return false;
        }
        return true;
    },
    savePassword:function (pass) {
        var ps=pass;
        settings.set('user', {
            pass: hash(ps)
        });
        settings.set('firstAccess', {
            value: 1
        });
    },
    firstTimeAccess:function () {
      if(settings.has('firstAccess.value') && settings.get('firstAccess.value')==1 )
      {
          return false;
      }
      return true;
    },
    resetThePass:function () {
        remote.getGlobal("clearCache")();
        settings.set('firstAccess', {
            value: 0
        });

    }
}

function hash(val) {
    return sha256(val);
}