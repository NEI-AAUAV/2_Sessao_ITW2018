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
            var data_from_somewhere = [ {'name': 'Noé Elisabete Ferreiro', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : 'Male', 'course' : {'id' : '', 'name' : ''}},
            {'name': 'Marta Matias Lucas', 'email' : 'marta.lucas@teste.com', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
            { 'name': 'Ezequiel Augusto Melo', 'email': '', 'address': 'Rua de Cima, n.º 8\nAveiro\nPORTUGAL', 'birthDate': '1998/11/17', 'sex': 'Male', 'course': { 'id': '', 'name': '' } },
            {'name': 'Albino Nico Armando', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} },
            {'name': 'Alexandra Eufêmia Torres', 'email' : '', 'address' : '', 'birthDate' : '', 'sex' : '', 'course' : {'id' : '', 'name' : ''} }];
            var new_participants = [];
            data_from_somewhere.forEach(element => {
                new_participants.push(new participantModel(element));
            });
            self.participants(new_participants);
        }
        
        self.clearParticipants = function(){
            self.participants([]);
        }
        
        self.addNewParticipant = function(){
            self.tempPart(empty_participant);
            self.addOrEditTitle = "Create Participant";
        }
        self.saveParticipant = function(participant){
            var new_part = new participantModel(participant);
            if(participants.indexOf(new_part) !== -1){
                self.participants.push(new_part);
            }
        }
        self.deleteParticipant = function (participant) { 
            self.participants.remove(participant);
            self.tempPart(empty_participant);
        }
        
        self.editParticipant = function (participant) {
            self.addOrEditTitle = "Edit Participant";
            self.tempPart(participant);
        }
    }
    ko.applyBindings(new ViewModel());
});