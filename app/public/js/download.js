function download(entrada) {
    $.confirm({
        title: 'Entre com o nome do arquivo',
        content: '' +
        '<form action="" class="formName">' +
            '<div class="form-group">' +
                '<label>Enter something here</label>' +
                '<input type="text" placeholder="Nome do arquivo" class="name form-control" required />' +
            '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Confirmar',
                btnClass: 'btn-blue',
                action: function () {
                    var filename = this.$content.find('.name').val();
                    if(!filename){
                        Mensagem('entre com um nome válido','atencao');
                        return false;
                    }
                    var a = document.createElement('a');
                    var blob = new Blob([entrada], {'type':"csv"});
                    a.href = window.URL.createObjectURL(blob);
                    a.download = filename+".csv";
                    a.click();
                    Mensagem('Download efetuado com sucesso','sucesso');
                }
            },
            cancel: function () {
                //fechar
            },
        },
        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click');
            });
        }
    });
}

window.onload = function () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('cAutomatico');
        fileSelected.addEventListener('change', function (e) {
            var fivarobeRead = fileSelected.files[0];
             var fileExtension = fivarobeRead.name.split(".");
             fileExtension=fileExtension.pop();
             
            if (fileExtension=="txt" || fileExtension=="csv") {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var conteudo= fileReader.result
                    carregar(conteudo);
                }
                fileReader.readAsText(fivarobeRead);
            }
            else {
                Mensagem("Por favor selecione arquivo texto","erro");
            }
  
        }, false);
    }
    else {
        Mensagem("Arquivo(s) não suportado(s)","erro");
    }
  }