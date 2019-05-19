$(document).ready(function () {
    ConfiguraToaststr();
    $('#example').DataTable({
        "language": {
            "url": "js/dataTables.Portuguese.lang.json"
        }
    });
});

function ConfiguraToaststr() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
};

$(document).on('click', '.excluirProdutoJs', function (e) {
    var nomeProduto = $(this).attr('data-name'),
        idProduto = $(this).attr('data-id');

    $.confirm({
        title: 'Deseja realmente excluir o produto: ' + nomeProduto + '?',
        content: 'Essa operação será cancelada em 10 segundos se você não responder',
        autoClose: 'naoAction|10000',
        buttons: {
            simAction: {
                text: 'sim',
                action: function () {
                    $.ajax({
                        url: '/product/' + idProduto,
                        type: 'DELETE',
                        success: function (result) {
                            toastr["success"]("Produto excluido com sucesso");
                            location.href = '/';
                        },
                        error: function (result) {
                            toastr["warning"]("Ops ocorreu um erro ao excluir o produto :-(");
                        }
                    });
                }
            },
            naoAction: {
                text: 'não',
                action: function () {
                    toastr["warning"]("Operação cancelada :-)");
                }
            }
        }
    });
});

$(document).on('click', '.editarProdutoJs', function (e) {
    location.href = '/product/' + $(this).attr('data-id');
});

$(document).on('click', '.adicionarProdutoJs', function (e) {

    $.confirm({
        title: 'Adicionar novo Produto!',
        type: 'blue',
        content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            '<label>Nome:</label>' +
            '<input type="text" placeholder="Nome" class="name form-control" required />' +
            '<label>Descrição:</label>' +
            '<input type="text" placeholder="Descrição" class="descricao form-control" required />' +
            '<label>Preço:</label>' +
            '<input type="money" placeholder="Preço" class="preco form-control"  required />' +
            '</div>' +
            '</form>',
        buttons: {
            formSubmit: {
                text: 'Adicionar',
                btnClass: 'btn-blue',
                action: function () {
                    var name = this.$content.find('.name').val(),
                    descricao = this.$content.find('.descricao').val(),
                    preco = this.$content.find('.preco').val();

                    if (!name) {
                        $.alert('Informe o nome válido!');
                        return false;
                    }

                    if (!descricao) {
                        $.alert('Informe uma descrição válida!');
                        return false;
                    }

                    if (!preco) {
                        $.alert('Informe o preço válido!');
                        return false;
                    }

                    var produtoAdd = { 
                       name: name, 
                       description: descricao, 
                       price: preco
                    };

                    console.log("Produto Adicionar: " + JSON.stringify(produtoAdd));

                    $.ajax({
                        url: '/product/',
                        type: 'post',
                        data: {dataJson: JSON.stringify(produtoAdd)},
                        dataType: 'json',
                        async: false,
                        success: function (result) {
                            toastr["success"]("Produto adicionado com sucesso");
                            
                        },
                        error: function (result) {
                        }
                    });
                    
                    location.href = '/';                    
                }
            },
            cancel: {
                text: 'Cancelar',
                btnClass: 'btn-danger',
                action: function(){

                }
            }
        },
        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click');
            });
        }
    });

});

function listarComentario(){
    $('.listaComentario').empty();

    $.ajax({
        url: '/comment/',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (result) {
            toastr["success"]("Produto adicionado com sucesso");
            
        },
        error: function (result) {
        }
    });
}


$(document).on('click', '.updateProdutoJs', function (e) {
    var idProduto = $(this).attr('data-id'),
    nameP=$("input[name=name]").val(),
    descriptionP=$("input[name=description]").val(),
    priceP=$("input[name=price]").val();

    var produtoAdd = { 
        id: idProduto,
        name: nameP, 
        description: descriptionP, 
        price: priceP
     };

     console.log("Produto Adicionar: " + JSON.stringify(produtoAdd));

     $.ajax({
         url: '/product',
         type: 'PUT',
         data: {dataJson: JSON.stringify(produtoAdd)},
         dataType: 'json',
         async: false,
         success: function (result) {
             toastr["success"]("Produto adicionado com sucesso");
             location.href = 'http://localhost:3000/';
             
         },
         error: function (result) {
            location.href = 'http://localhost:3000/';
         }
     });

     
});