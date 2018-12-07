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
                success: function (data) {
                    if (data.name) {
                        $("table").removeClass("hidden");
                        self.cityDetail(new CityWeatherDetailModel(data));
                    } else {
                        $("table").addClass("hidden");
                        alert(data.message);
                    }
                },
                error: function () {
                    $("table").addClass("hidden");
                    alert("Erro !");
                }
            }1);
        }
    }
    ko.applyBindings(new CityWeatherModel());
});