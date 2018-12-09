$(document).ready(function () {
    $('form').submit(function (event) {

        //limpar todos os erros que possam ter sido desplotados anteriormente
        $('#modal').children().remove();


        /*
         *  começa-se por ter em conta que está tudo ok; caso haja um erro, 
         *  este valor é alterado para false, de forma a que o formulário
         *  não possa ser submetido e sejam apresentadas as devidas mensagens
         *  de erro
        */
        var valid = true;
        var error_messages = [];


        /**************************************************************
         *   Análise de cada um dos dados inseridos pelo utilizador   *
         **************************************************************/
        /*
        *   no caso de um dos dados estiver incorreto, a mensagem de erro é inserida
        *   no modal através do método append() do jquery -> adiciona elementos html
        *   no final do elemento passado como parâmetro
        * 
        *   Nota:
        *   "&emsp;" é a representação do TAB em html
        */

        var name_size = $.trim($('#name').val()).length;
        var address_size = $.trim($('#address').val()).length;
        var email_size = $.trim($('#mail').val()).length;
        //o "@" aparece sempre antes do "." num endereço email
        var valid_email = $('#mail').val().indexOf('@') > $('#mail').val().lastIndexOf('.');
        //número de locais selecionado
        for (var places_num = 0; places_num < $('input[name=place]:checked').length; places_num++);

        //verificar se o nome tem entre 10 e 100 letras
        if (name_size < 10 || name_size > 100) {
            valid = false;
            error_messages.push('Nome inválido!<br>&emsp;O nome deve conter entre 10 e 100 caracteres');
        }

        //verificar se a morada tem entre 20 e 200 letras
        if (address_size < 20 || address_size > 200) {
            valid = false;
            error_messages.push('Morada inválida!<br>&emsp;A morada deve conter entre 20 e 200 caracteres');
        } 
        
        //verificar se o mail tem menos que 10 letras
        if (email_size < 10) {
            valid = false;
            error_messages.push('E-mail inválido!<br>&emsp;O e-mail deve conter pelo menos 10 caracteres');
        }   

        //verificar se o "@" aparece antes do "." no mail
        if(valid_email){
            valid = false;
            error_messages.push('Formato de e-mail inválido!');
        }

        //verificar se pelo menos dois locais foram selecionados
        if (places_num < 2){
            valid = false;
            error_messages.push('Local inválido!<br>&emsp;Deve selecionar pelo menos 2 locais');
        }

        //apresentar todas as mensagens que foram verificadas
        for(var num = 0; num < error_messages.length; num++){
            $('#modal').append('<p>' +
                                    '<span class="fa fa-exclamation-triangle"></span>' +
                                    error_messages[num] + 
                                '</p>');
        }

        if (valid)
            $('#all_modal').children().remove();

        //return true se não houver erros e para o formulário poder ser submetido
        return valid;   
    });

    //colocar o preço no devido campo
    $('#places').click(function () {
        var price = 0;
        $('input[name=place]:checked').each(
            function () {
                if (parseInt($(this).val()) > price)
                    price = parseInt($(this).val());
            }
        );
        $('#price').val(price +' €');
    });
});