sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function(Controller, formatter) {
    'use strict';

    return Controller.extend("sap.ui.demo.basicTemplate.controller.Details", {

		formatter: formatter,

		onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").Path);
            var oTable = this.getView().byId("tableDetails");
            //   var oBindingInfo = oTable.getBindingInfo("items");
            //   var oTemplate = 
              oTable.bindAggregation("items", {
                 path: "/" + sPath + "/SpfliToSbookNav",
                 template: this.byId("colListItemTempl"),
                 templateSherable: false
                 });
            var oCalendar = this.byId("calendar1");
            oCalendar.bindAggregation("specialDates", {
                path: "/" + sPath + "/SpfliToSbookNav",
                template: this.byId("specialDate"),
                templateSherable: false
            });
		},
        onBackToHome: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("home");
            this.getView().byId("tableDetails").unbindItems();
        },
        onDetailPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("edit", {
				Path: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1))
			});

        }
    })
    });