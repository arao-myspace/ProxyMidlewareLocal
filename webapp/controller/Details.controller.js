sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function(Controller, formatter) {
    'use strict';

    return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
			this.getView().byId("tableDetails").bindElement("rows", {
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").Path) + "SpfliToSbookNav"
			});
		},

        onBackToHome: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("home");
        }
    })
    });