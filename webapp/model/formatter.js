sap.ui.define([], function () {
	"use strict";
	return {
		smokerStatus: function (sStatus) {
			if (sStatus=='X') {
				return true;
			} else {
				return false;
			}
		},
		getCalendarItemType: function (sClass) {
			return "Type09";
		},
		getCalendarItemColor: function (sClass) {
			return "#333333";
		},
		
	};
});