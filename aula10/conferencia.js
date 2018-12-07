$(document).ready(function() {
    /*
        Para podermos apresentar os cursos
    */
    function courseModel(courseData){
        var self = this;
        self.id = ko.observable(courseData.id);
        self.name = ko.observable(courseData.name);
    }
    /*
    Nosso modelo de dados, com os campos que queremos apresentar
    */
    function participantModel(participantData){
        var self = this;
        self.name = ko.observable(participantData.name);
        self.email = ko.observable(participantData.email);
        self.address = ko.observable(participantData.address);
        self.birthDate = ko.observable(participantData.birthDate);
        self.sex = ko.observable(participantData.sex);
        self.course = new courseModel(participantData.course);
    }

    function ViewModel(){
        // o ViewModel() em si
        var self = this;
        // variável auxiliar para resetarmos o valor de formParticipant
        var empty_participant = new participantModel({ "name":"", "email":"", "address":"", "birthDate":"","sex":"", "course" : {"id":"", "name":""}});

        // Variável para controlar os dados a serem apresentados no modal
        /* 
            Quando queremos adicionar um novo participante, os dados devem estar em branco
            e por isso inicializamos com um participante vazio
            Quando queremos editar, então o formParticipant vai ser uma cópia do participante que estava na lista
        */
        self.formParticipant = ko.observable(empty_participant);
        /* 
            Caso queiramos guardar as alterações, precisamos de saber qual os dados a substituir
            Como tal, guardarmos o indice do modelo antigo, para sabermos onde substituirmos
        */
        self.previous_index = -1
        // Variável de controlo para sabermos quando editarmos/substituir o participante
        self.editingEntry = false;
        // Lista de participantes
        self.participants = ko.observableArray();
        // Título para o modal
        self.addOrEditTitle = ko.observable();

        // função para inicializarmos os participantes
        self.readParticipants = function(){
            // simular ir buscar dados à API
            var data_from_somewhere = [ {'name': 'Noé Elisabete Ferreiro', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : 'Male', 'course' : {'id' : '', 'name' : ''}},
            {'name': 'Marta Matias Lucas', 'email' : 'marta.lucas@teste.com', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
            { 'name': 'Ezequiel Augusto Melo', 'email': '', 'address': 'Rua de Cima, n.º 8\nAveiro\nPORTUGAL', 'birthDate': '1998/11/17', 'sex': 'Male', 'course': { 'id': '', 'name': '' } },
            {'name': 'Albino Nico Armando', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
            {'name': 'Alexandra Eufêmia Torres', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} }];
            // lista com os modelos
            var new_participants = [];
            // simples inserção
            data_from_somewhere.forEach(element => {
                new_participants.push(new participantModel(element));
            });
            // E substituimos o que estava na lista
            self.participants(new_participants);
        }
        
        // Reset à lista
        self.clearParticipants = function(){
            self.participants([]);
        }
         /* 
            Adicionar um novo participante.
            Como queremos adicionar um novo, então resetamos o valor do formParticipant para apresentarmos o form em branco.
            Mudamos o título para indicar que estamosa criar
            E mudamos o valor da variável para falso, porque estamos a criar.
            NOTA: Como queremos utilizar o datepicker, temos que "ativar" o datepicker sempre que abrimos o modal
            
        */
        self.addNewParticipant = function () {
            
            // como estamos a criar um novo participante, então fazemos reset
            self.formParticipant(empty_participant);
            /* Para ativarmos o datepicker
            NOTE: Deve ser depois de atualizarmos o observável! Se não o Knockout vai substituir e não vai funcionar!!!!
            Side-note: não é necessariamente a maneira mais elegante/eficiente, mas é uma maneira que funciona em 1 linha invés de 20-30
            */
            $("#birthdate").datepicker();
            // O nosso título para o modal
            self.addOrEditTitle = "Create Participant";
            // e não estamos a editar
            self.editingEntry = false;
            // Nota: não é necessário, só conceptual. Se não estamos a editar, entã não existe indice do antigo
            self.previous_index = -1;
        }
        /*
            Editar um participante já existente.
            O argumento é o elemento atual (ver HTML)
            Como queremos guardar as mudanças apenas quando premirmos o botão de guardar
            Então sempre que vamos editar um participante, temos que guardar uma cópia
            e o índice onde estava o antigo.
            Caso contrário, se o observável tivesse o próprio elemento, se fizessemos uma alteração no campo
            era logo refletido! que é o oposto do pretendido.
        */
        self.editParticipant = function (participant) {
            // indice antigo
            self.previous_index = self.participants.indexOf(participant);
            // copiamos o elemento já existente
            var old_participant = new participantModel(ko.toJS(participant));
            // e atualizamos o observável com a cópia
            self.formParticipant(old_participant);
            /* Para ativarmos o datepicker
            NOTE: Deve ser depois de atualizarmos o observável! Se não o Knockout vai substituir e não vai funcionar!!!!
            Side-note: não é necessariamente a maneira mais elegante/eficiente, mas é uma maneira que funciona em 1 linha invés de 20-30
            */
            $("#birthdate").datepicker();
            // Titulo para o Modal
            self.addOrEditTitle = "Edit Participant";
            // Estamos a editar
            self.editingEntry = true;
        }
        /*
            Apagar o participante é tão simples quanto remove-lo da lista.
        */
        self.deleteParticipant = function (participant) { 
            self.participants.remove(participant);
            
        }
        /*
            Antes de guardarmos o participante, temos que saber se estamos a editar ou não
            Se estivermos, então temos que substituir a entrada anterior (ver editParticipant)
            Como guardamos o indice antigo, é só uma questão de o remover e colocar lá o novo
        */
        self.saveParticipant = function(participant){
            // se estivermos a editar, substituimos
            if (self.editingEntry){
                self.participants.splice(self.previous_index, 1,participant);
                // Nota: não é necessário, só conceptual (para ajudar a leitura)
                // se já editamos, então já não vai indice antigo
                self.previous_index =-1;
                // e já não estaremos a editar.
                self.editingEntry = false;
            }
            else{
                // Só adicionamos à lista se tivermos elementos repetidos
                // Para o serem, alguém teria que inserir os dados 100% iguais
                if(self.participants.indexOf(participant) === -1){
                    self.participants.push(participant);
                }
            }
        }
    }
    ko.applyBindings(new ViewModel());
});