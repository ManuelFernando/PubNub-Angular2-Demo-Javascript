'use strict';

(function (app) {

    app.main_module = ng.core.NgModule({

        imports: [ng.platformBrowser.BrowserModule, ng.forms.FormsModule],
        declarations: [app.main_component],
        providers: [PubNubAngular],
        bootstrap: [app.main_component]

    }).Class({

        constructor: function(){}

    });

    document.addEventListener('DOMContentLoaded', function(){

        ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(app.main_module);
    });

})(window.app || (window.app = {}));
