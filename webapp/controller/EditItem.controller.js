sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/m/MessageBox",
    "sap/ui/core/message/Message",
    "sap/ui/core/routing/History",
    "sap/ui/core/library",
    "sap/ui/core/Fragment"
], function (Controller, formatter, MessageBox, Message, History, library, Fragment) {
    "use strict";

    var MessageType = library.MessageType;
    var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();

    return Controller.extend("sap.ui.demo.basicTemplate.controller.EditItem", {

        formatter: formatter,

        onInit: function () {
            var oView = this.getView();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("edit").attachPatternMatched(this._onObjectMatched, this);
            var oMessageManager = sap.ui.getCore().getMessageManager();
            oView.setModel(oMessageManager.getMessageModel(), "message");

            // or just do it for the whole view
            oMessageManager.registerObject(oView, true);
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
            var sPath = oSimpleform.getBindingContext().sPath;
            var Carrid = this.getView().byId("Carrid").getValue();
            var Connid = this.getView().byId("Connid").getValue();
            var Bookid = this.getView().byId("Bookid").getValue();
            var Passname = this.getView().byId("Passname");
            var sPassname = Passname.getValue();

            if (!sPassname) {
                this.getView().getModel().submitChanges();
                var oMessage = new Message({
                    message: "My generated error message",
                    type: MessageType.Error,
                    target: "Passname/value",
                    processor: oMessageProcessor
                });
                sap.ui.getCore().getMessageManager().addMessages(oMessage);
                Passname.setValueState("Error");
                Passname.setValueStateText("To pole jest wymagane");
                return undefined;
            } else {
                Passname.setValueState("None");
                Passname.setValueStateText("");
            }


            var bSmoker = this.getView().byId("Smoker").getSelected();
            var sSmoker;
            if (bSmoker) {
                sSmoker = "X";
            } else {
                sSmoker = "";
            }
            var oPayload = {
                Smoker: sSmoker,
                Passname: sPassname
            };

            var oModel = this.getView().getModel();
            oModel.update(sPath, oPayload, {
                success: function (odata, Response) {
                    if (odata !== "" || odata !== undefined) {
                        MessageBox.success("Updated successfully.");
                    } else {
                        MessageBox.error("Not updated.");
                    }
                },
                error: function (cc, vv) {}
            })
        },

        onMessagePopoverPress: function (oEvent) {
            var oSourceControl = oEvent.getSource();
            this._getMessagePopover().then(function (oMessagePopover) {
                oMessagePopover.openBy(oSourceControl);
            });
        },
        _getMessagePopover: function () {
            var oView = this.getView();

            // create popover lazily (singleton)
            if (!this._pMessagePopover) {
                this._pMessagePopover = Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.basicTemplate.view.MessagePopover"
                }).then(function (oMessagePopover) {
                    oView.addDependent(oMessagePopover);
                    return oMessagePopover;
                });
            }
            return this._pMessagePopover;
        }

    });
});