/*
    Nota: Talvez pudessemos ainda colocar mais knockout, 
    mas para além de tornar o código menos legível à primeira vista, e por consequinte mais díficil de perceber,
    seria desnecessário
*/
$(document).ready(function () {
    // nosso modelo para as cidades
    function CityWeatherDetailModel(cityData){
        self.cityName = ko.observable();
        self.coordinates = ko.observable();
        self.weather = ko.observable();
        self.temp = ko.observable();
        self.pressure = ko.observable();
        self.allData = ko.observable();
        /*
            Apesar de já termos verificado no caso do pedido aJax
            verificamos outra vez só por causa da inicialização
        */
        if(cityData.name){
            self.cityName(cityData.name + " / " + cityData.sys.country);
            self.coordinates(" Lon (º): " + cityData.coord.lon + " / Lat(º): " + cityData.coord.lat);
            self.weather(cityData.weather[0].description);
            self.temp(cityData.main.temp.toString() + " ºK / " + (cityData.main.temp - 273.15).toString() + "ºC");
            self.pressure(cityData.main.pressure);
            self.allData(JSON.stringify(cityData));
        }
    }
    // nosso modelo para página
    function CityWeatherModel(){
        var self = this;
        // opções disponíveis
        self.cities = [
            {code : "Aveiro , PT", name: "Aveiro",},
            {code : "Porto, PT", name: "Porto",},
            {code : "Paris, FR", name: "Paris",},
            {code : "London, UK", name: "Londres",},
            {code : "New York, USA", name: "Nova Iorque",},
            {code : "Xpto, PT", name:"Cidade que não existe e vai mostrar o erro da API"},
        ];
        // cidade escolhida
        self.chosenCity = ko.observable();
        // Inicialização do observável, com dados vazios
        self.cityDetail = ko.observable(new CityWeatherDetailModel({}));
        // função para fazer o pedido aJax
        self.getCityDetail = function (selectedCity){
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: {
                    /* 
                    Versão 1
                    // podemos aproveitar o facto do knockout nos passar o nosso modelo
                    q: selectedCity.chosenCity().code,
                    */

                    /* 
                    Versão 2
                    //  ou podemos usar diretamente a cidade selecionada,
                    */
                    q: self.chosenCity().code,

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
                        self.cityDetail(new CityWeatherDetailModel(data));
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
                        console.log(res.responseJSON.message);
                        alert("Erro !");
                    }
                }
            });
        }
    }
    ko.applyBindings(new CityWeatherModel());
});