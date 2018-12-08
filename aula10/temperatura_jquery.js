$(document).ready(function () {
    $("#citySelector").change(function () {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                q: $("#citySelector").val(),
                APPID: "b2b1df463182c3cca5276e9d3267cc95"
            },
            success: function (data, status, res) {
                /*
                  Nota: o res é a resposta ao pedido
                  Por questões de conveniencia, 
                  o jQuery passa-nos como primeiro argumento o data.
                  o data é o mesmo JSON da resposta ao pedido ( res.responseJSON)
                */
                console.log(status);
                if (data.name) {
                    $("table").removeClass("invisible");
                    $("#cityName").html(data.name + " / " + data.sys.country);
                    $("#coordinates").html(" Lon (º): " + data.coord.lon + " / Lat(º): " + data.coord.lat);
                    $("#weather").html(data.weather[0].description);
                    $("#temp").html(data.main.temp.toString() + " ºK / " + (data.main.temp - 273.15).toString() + "ºC");
                    $("#pressure").html(data.main.pressure);
                    $("#allData").html(JSON.stringify(data));
                } 
                /*
                    Nota: Normalmente, este else nunca é chamado porque estamos a assumir que,
                    quando o pedido é bem feito, que a API devolve um ficheiro JSON com um .name (e etc)
                    Mas se por alguma eventualidade a API devolver valores que não estamos à espera
                    Podemos perceber o que se passa de errado (eles poderiam estar a mudar o JSON da resposta)
                */
                else {
                    $("table").addClass("invisible");
                    console.log(data);
                    alert("Something else went wrong? API returned success but no data was found");
                }
            },
            error: function (res, status, err) {
                console.log(status,err);
                if(res.responseJSON.message){
                    $("table").addClass("invisible");
                    alert(res.responseJSON.message);
                }
                /*
                    Nota: Similar ao de cima.
                    Normalmente, este else nunca é chamado porque estamos a assumir que a API devolve
                    uma mensagem de erro.
                    Mas se por alguma eventualidade a API devolver valores que não estamos à espera
                    Podemos perceber o que se passa de errado (eles poderiam estar a mudar o JSON da resposta)
                */
                else{
                    $("table").addClass("invisible");
                    console.log(res.responseJSON);
                    alert("Erro !");
                }
            }
        });
    });
});