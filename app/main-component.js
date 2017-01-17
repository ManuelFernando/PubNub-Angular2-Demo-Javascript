(function (app) {

    app.main_component = ng.core.Component({

        selector: 'main-component',
        templateUrl: 'app/template.html'

    }).Class({

        constructor: [PubNubAngular, function(pubnubService){

            var self = this;

            self.userId   = 'User ' + Math.round(Math.random() * 1000);
            self.newMessage = '';
            self.channelName = 'PubNub-Angular2-TestDemoJS';
            self.status = 'connecting';
            self.usersConnected = 0;
            self.occupants = [];

            self.pubnubService = pubnubService;

            pubnubService.init({
                publishKey: 'demo',
                subscribeKey: 'demo',
                uuid: this.userId
            });

            pubnubService.subscribe({channels: [self.channelName], triggerEvents: true, withPresence: true, autoload: 50});

            self.messages = pubnubService.getMessage(this.channelName);

            pubnubService.getPresence(self.channelName, (presence) => {
                self.usersConnected = presence.occupancy;

                self.pubnubService.hereNow({
                    channels: [self.channelName],
                    includeUUIDs: true,
                    includeState: true
                }).then(function (response) {
                    self.occupants = response.channels[self.channelName].occupants;
                }).catch((error) => {});
            });

            pubnubService.getStatus(self.channelName, (status) => {
                self.status = status.category;
            });


        }],
        publish: function(){
            if (this.newMessage !== '') {
                this.pubnubService.publish({message: '[' + this.userId + '] ' + this.newMessage, channel: this.channelName});
                this.newMessage = '';
            }
        }
    });

})(window.app || (window.app = {}));
