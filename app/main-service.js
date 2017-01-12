(function (app) {

    let _defaultInstance = undefined;

    app.pubnubService = ng.core.Class({

        constructor: function () {

        },
        init: function (config) {

            _defaultInstance = new PubNub(config);

            Object.keys(_defaultInstance).forEach((key) => this[key] = _defaultInstance[key]);
        }
    });

})(window.app || (window.app = {}));
