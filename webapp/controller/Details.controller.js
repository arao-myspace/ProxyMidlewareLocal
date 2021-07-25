sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/core/mvc/Controller",
    "../model/formatter"
], function (Fragment, Controller, formatter) {
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

        },
        handleCalendarSelect: function (oEvt) {
            var oAnchor = oEvt.getSource();
            var sPath = this.byId("calendar1").getBinding("specialDates").getPath();
            if (!this._oPopover) {
                Fragment.load( {
                    id: "popoverCal",
                    name: "sap.ui.demo.basicTemplate.view.CalendarPopover",
                    controller: this
                }).then(function(oPopover) {
                    this._oPopover = oPopover;
					this.getView().addDependent(this._oPopover);
                    this._oPopover.bindElement(sPath);
                    //Jeszcze trzeba podpiąć items do naszej listy
                   // this.byId("listPop").bindItems(sPath);

					this._oPopover.openBy(oAnchor);
                }.bind(this));
            } else {
                if (this._oPopover.isOpen()) {
                    this._oPopover.close();
                }
                this._oPopover.openBy(oAnchor);
                this._oPopover.bindElement(sPath);
                 //Jeszcze trzeba podpiąć items do naszej listy
               // this.byId("listPop").bindItems(sPath);
            }
        }
    })
});