sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/core/Fragment"
], function (Controller, formatter, Fragment) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {

		},

		onItemPress: function (oEvent) {
			var oSource = oEvent.getParameter("listItem");
			var oView = this.getView();

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "sap.ui.demo.basicTemplate.view.Popover",
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					// oPopover.bindElement("/ProductCollection/0");
					return oPopover;
				});
			}
			this._pPopover.then(function (oPopover) {
				oPopover.openBy(oSource);
			});
		},
		onPopoverClose: function () {
			this.byId("myPopover").close();
		}
	});
});