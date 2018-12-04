$(document).ready(function() {

    function participantModel(participantData){
        var self = this;
        self.name = ko.observable(participantData.name);
        self.email = ko.observable(participantData.email);
        self.address = ko.observable(participantData.address);
        self.birthDate = ko.observable(participantData.birthDate);
        self.sex = ko.observable(participantData.sex);
        self.course = "potato";
    }

    function ViewModel(){
        var self = this;
        var empty_participant = { "name":"", "email":"", "address":"", "birthDate":"","sex":"", "course" : {"id":"", "name":""}};
        self.participants = ko.observableArray();
        self.addOrEditTitle = ko.observable();
        self.tempPart = ko.observable(new participantModel(empty_participant));
        self.readParticipants = function(){
            self.participants([
                {'name': 'Noé Elisabete Ferreiro', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : 'Male', 'course' : {'id' : '', 'name' : ''}},
                {'name': 'Marta Matias Lucas', 'email' : 'marta.lucas@teste.com', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
                { 'name': 'Ezequiel Augusto Melo', 'email': '', 'address': 'Rua de Cima, n.º 8\nAveiro\nPORTUGAL', 'birthDate': '1998/11/17', 'sex': 'Male', 'course': { 'id': '', 'name': '' } },
                {'name': 'Albino Nico Armando', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
                {'name': 'Alexandra Eufêmia Torres', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} }
            ]);
        }
        
        self.clearParticipants = function(){
            self.participants([]);
        }
        
        self.addNewParticipant = function(){
            self.tempPart(empty_participant);
            self.addOrEditTitle = "Create Participant";
        }
        self.saveParticipant = function(participant){
            console.log("Save participant");
            console.log(participant);
        }
        self.deleteParticipant = function (participant) { 
            self.participants.remove(participant);
            self.tempPart(participant);
        }
        
        self.editParticipant = function (participant) {
            self.addOrEditTitle = "Edit Participant";
            self.tempPart(participant);
        }
    }
    ko.applyBindings(new ViewModel());
});