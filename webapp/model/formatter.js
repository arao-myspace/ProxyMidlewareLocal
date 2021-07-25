sap.ui.define([], function () {
	"use strict";
	return {
		smokerStatus: function (sStatus) {
			if (sStatus == 'X') {
				return true;
			} else {
				return false;
			}
		},
		getCalendarItemType: function (sClass) {

			switch (sClass) {
				case 'C':
					return "Type09";
					break;
				case 'F':
					return "Type08";
					break;
				case 'Y':
					return "Type07";
					break;
			}
		},
		getCalendarItemColor: function (sClass) {
			switch (sClass) {
				case 'C':
					return "#ccff33";
					break;
				case 'F':
					return "#0066ff";
					break;
				case 'Y':
					return "#ff6600";
					break;
			}
		},

	};
});