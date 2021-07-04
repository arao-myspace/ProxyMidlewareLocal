sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, formatter, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			var oView = this.getView();
			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: this.getView().getId(),
					name: "sap.ui.demo.basicTemplate.view.Popover",
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					return oPopover;
				});
			}
		},

		onItemPress: function (oEvent) {
			var oListItem = oEvent.getParameter("listItem");
			this.byId("myPopover").openBy(oListItem);			
			// build filter array
			this.aFilter = [];
			var sPath = oListItem.getBindingContextPath();

			var sQuery = sPath.split("('").pop().split("')")[0]; //getting the key value from gridlist item
			if (sQuery) {
				this.aFilter.push(new Filter("Carrid", FilterOperator.EQ, sQuery));
			}
		},
		onPopoverClose: function () {
			this.byId("myPopover").close();
		},
		onUpdateFinished: function () 
		{	
			var oList = this.byId("FlightConnections");
			// filter binding
			var oBinding = oList.getBinding("items");
			oBinding.filter(this.aFilter);
		},
		onObjectListItemPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("details", {
				Path: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1))
			});
		}
	});
});