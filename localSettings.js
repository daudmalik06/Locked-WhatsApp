$(document).ready(function () {
    setTimeout(function (args) {

        $('body > div.bootbox.modal.fade.bootbox-prompt.in > div > div > div.modal-body > div > form > input').keydown(function (event) {
            if(event.key=='Enter')
            {
                $('body > div.bootbox.modal.fade.bootbox-prompt.in > div > div > div.modal-footer > button.btn.btn-success').click();

            }
        });
    },1000);

});