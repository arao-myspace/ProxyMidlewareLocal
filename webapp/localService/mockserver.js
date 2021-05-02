sap.ui.define([
    'sap/ui/core/util/MockServer',
    'sap/base/util/UriParameters'
], function(MockServer, UriParameters) {
    'use strict';
    
    return { 
        init: function () {
            //create mockserver
            var oMockServer = new MockServer({
                rootUri: "http://vhcalnplci:8000/sap/opu/odata/sap/ZDEMO_BINDING_SRV/"
            });

            var oUriParameters = new UriParameters(window.location.href);

            //configure mockserver with a delay

            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 500
            });

            //simulate
            var sPath = "../localService";
            oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

            //start 

            oMockServer.start();
        }
    }
});