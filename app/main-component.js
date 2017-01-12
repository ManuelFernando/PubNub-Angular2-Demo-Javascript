(function (app) {

    app.main_component = ng.core.Component({

        selector: 'main-component',
        templateUrl: 'app/template.html'

    }).Class({

        constructor: [PubNubAngular, function(pubnubService){

            var self = this;

            self.newMessage = '';
            self.channelName = 'PubNub.Angular2-TestDemo';
            self.status = 'connecting';
            self.userId   = "User " + Math.round(Math.random() * 1000);
            self.usersConnected = 0;
            self.occupants = [];

            self.pubnubService = pubnubService;

            pubnubService.init({
                publishKey: 'demo',
                subscribeKey: 'demo',
                uuid: this.userId
            });

            self.messages = pubnubService.getMessage(this.channelName, () => {});

            pubnubService.getPresence(self.channelName, (presence) => {
                self.usersConnected = presence.occupancy;
            });

            pubnubService.getStatus(self.channelName, (status) => {
                self.status = status.category;
            });

            pubnubService.subscribe({channels: [self.channelName], triggerEvents: true, withPresence: true});

            pubnubService.hereNow({
                channels: [self.channelName],
                includeUUIDs: true,
                includeState: true
            }).then(function (response) {
                self.occupants = response.channels[self.channelName].occupants;
                self.occupants.push({uuid: self.userId + ' - You'})
            }).catch((error) => {});

        }],
        publish: function(){
            this.pubnubService.publish({message: '[' + this.userId + '] ' + this.newMessage, channel: this.channelName});
            this.newMessage = '';
        }
        
    });

})(window.app || (window.app = {}));
