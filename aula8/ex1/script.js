//Variaveis globais
var nome = document.getElementById("name");
var morada = document.getElementById("address");
var mail = document.getElementById("mail");
var alerta_nome = document.getElementById("alert_name");
var alerta_morada = document.getElementById("alert_morada");
var alerta_mail = document.getElementById("alert_mail");
var alerta_local = document.getElementById("alert_local");
var preco = document.getElementById("price");
//Variaveis que vao buscar os divs de input e os div das "alert box"

preco.value = ""; //Meter o ecra do  preco sem nada
var valor = 0;
clearCheckBox();//Limpar todos os inputs das checkbox sempre que a pagina é recarregada
function submeter() {//funçao chamada ao clicar no botao de sumbeter
    var sub = true;
    //---------------------------------------------
    alerta_nome.style.display = "none"
    alerta_morada.style.display = "none"
    alerta_mail.style.display = "none"
    alerta_local.style.display = "none"
    //Esconder  todos os alert box
    if (nome.value.length < 10 || nome.value.length > 100) {
        //se os input nao cumprirem as regras do cabeçalho,sera mostrada uma mensagem de erro
        alerta_nome.style.display = "inline-block"
        sub = false;
    }
    if (morada.value.length < 20 || morada.value.length > 200) {
        alerta_morada.style.display = "inline-block"
        sub = false;
    }

    if (mail.value.length < 10 || mail.value.length > 100 || mail.value.indexOf("@") == -1 || mail.value.indexOf("@") > mail.value.lastIndexOf(".")  ) {
        alerta_mail.style.display = "inline-block"
        sub = false;
    }
    var count_checked = 0;
    for (var i = 1; i <= 4; i++) { //contabilizar o nr de checkbox ativas
        var checkbox = document.getElementById("num" + i);
        if (checkbox.checked)
            count_checked++;
    }
    if (count_checked < 2) {//verificar se pelo menos 2 checkbox estao ativas
        alerta_local.style.display = "inline-block"
        sub = false;
    }

    return sub;
    //se retornar falso, a açao de sumbit n sera realizada, se retornar verdade a açao sera realizada
}

function updatePrice(checkbox) {//funcao chamada sempre que se clica numa checkbox
    //Update price do div que da display do preco total,atraves da escolha das checkbox
    if (checkbox.checked)
        valor += parseInt(checkbox.value);
    else if(valor!="")
        valor -= parseInt(checkbox.value);
    preco.value = valor;
}

function clearCheckBox(){
    //Funçao responsavel de limpar o on input das checkboxs
    for (var i = 1; i < 4; i++) {
        var checkbox = document.getElementById("num" + i);
        checkbox.checked=false;
    }
}