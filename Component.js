sap.ui.define([
               "sap/ui/core/UIComponent",    //using define instead of jQuery.sap.require and adding controls here
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel",
               ], function (UIComponent, JSONModel, ResourceModel) {
	"use strict";
	return UIComponent.extend("com.kloudData.Component", {
		metadata : {
                 manifest: "json"  // manifest.json to implement the routing and service
		},
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
		
			   
			   // set invoice model - local
			   var oConfig = this.getMetadata().getConfig();
			   var sNamespace = this.getMetadata().getManifestEntry("sap.app").id;
			   var oInvoiceModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.invoiceLocal));
			   this.setModel(oInvoiceModel, "invoice");
			   
			   // set i18n model on view
			   var i18nModel = new ResourceModel({
				   bundleName: "com.kloudData.i18n.messageBundle"
			   });
			   this.setModel(i18nModel, "i18n"); 
			   //Router
			// create the views based on the url/hash
				this.getRouter().initialize();	
		}
	});
});