sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "../model/formatter"
], function(Controller, formatter) {
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
            //  oTable.bindAggregation("items", {
            //     path: "/" + sPath + "/SpfliToSbookNav",
            //     template: this.byId("colListItemTempl"),
            //     templateSherable: false
            //     });
       }

	});
});