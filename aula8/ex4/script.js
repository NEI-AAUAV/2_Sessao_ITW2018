$(document).ready(function () {
    $('#bot').click(function () {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                q: $('#name').val(),
                APPID: 'b2b1df463182c3cca5276e9d3267cc95'
            },
            success: function (data) {
                if (data.name) {
                    update(data);
                }
            },
            error: function () {
                alert('Erro');
                $('table').hide("slide", 1000); //esconder a tabela sempre que houver erros
            }
        });

    });

    $('#citySelector').change(function () {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                q: $(this).val(),
                APPID: 'b2b1df463182c3cca5276e9d3267cc95'
            },
            success: function (data) {
                if (data.name) {
                    update(data);
                }
            },
            error: function () {
                alert('Erro');
                $('table').hide("slide", 1000); //esconder a tabela sempre que houver erros
            }
        });
    });
});
//não é preciso dar muita importância ao código acima (apenas  
//dar uma vista de olhos e perceber o geral deverá chegar para 
//aplicar no projeto)

function update(data) {
    $('#cityName').text(data.name + '/' + data.sys.country);
    $('#coordinates').text('Lon(º): ' + data.coord.lon + ' / Lat(º): ' + data.coord.lat);
    $('#weather').text(data.weather[0].description);
    $('#temp').text(data.main.temp_max + 'K / ' + String((parseFloat(data.main.temp_max) - 272.15)) + 'ºC');
    $('#pressure').text(data.main.pressure);
    //transformar dados "normais" em dados JSON
    $('#allData').text(JSON.stringify(data));

    $("table").show("drop", 1000); //mostrar a tabela em sucesso
}