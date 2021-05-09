sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/core/routing/History"
], function(Controller, formatter, History) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.EditItem", {

        formatter: formatter,

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("edit").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").Path);
            var oSimpleform = this.getView().byId("SimpleFormToolbar");
            oSimpleform.bindElement("/" + sPath);
       },
       _BackToDetails: function (oEvent) {
        var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("details", {}, true);
			}
    },
    onNavBackToDetails: function () {
        this._BackToDetails();
    },
    onSave: function () {
        var oSimpleform = this.getView().byId("SimpleFormToolbar");
        var sPath = oSimpleform.getBindingPath();
        var oPayload = {};

        var oModel = this.getView().getModel();
        // oModel.update(
    }

	});
});