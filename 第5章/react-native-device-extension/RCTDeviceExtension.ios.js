'use strict'

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var ExtensionModule = require('NativeModules').DeviceExtension;

var __deviceSubscriptions = {};

var DeviceExtension = {
	events : {
		DEVICE_ORIENTATION_EVENT: ExtensionModule.EVENT_ORIENTATION
	},
	getCurrentDimensions: function(handler: Function) {
		ExtensionModule.getCurrentDimensions(handler);
	},
	addLisener: function(event: String, handler: Function) {
		
		__deviceSubscriptions[handler] = RCTDeviceEventEmitter.addListener(event, handler);
	},
	removeLisener: function(event: String, handler: Function) {
		if (!__deviceSubscriptions[handler]) {
			return;
		}
		__deviceSubscriptions[handler].remove();
		__deviceSubscriptions[handler] = null;
	}
}

module.exports = DeviceExtension;
