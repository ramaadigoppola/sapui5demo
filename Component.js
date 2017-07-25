sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel",
               "BasicFiori-Routing/controller/HelloDialog"
               ], function (UIComponent, JSONModel, ResourceModel, HelloDialog) {
	"use strict";
	return UIComponent.extend("BasicFiori-Routing.Component", {
		metadata : {
//			rootView: "BasicFiori-Routing.view.App",
			manifest: "json"
		},
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			// set data model on view
			   var oData = {
					   recipient : {
						   name : "Worldly ppl"
					   }
			   };
			   var oModel = new JSONModel(oData);
			   this.setModel(oModel);
			   
			   // set invoice model - local
			   var oConfig = this.getMetadata().getConfig();
			   var sNamespace = this.getMetadata().getManifestEntry("sap.app").id;
			   var oInvoiceModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.invoiceLocal));
			   this.setModel(oInvoiceModel, "invoice");
			   
			   // set i18n model on view
			   var i18nModel = new ResourceModel({
				   bundleName: "BasicFiori-Routing.i18n.messageBundle"
			   });
			   this.setModel(i18nModel, "i18n");
			// set dialog	
			   this.helloDialog = new HelloDialog();
			   
			   //Router
			// create the views based on the url/hash
				this.getRouter().initialize();
				
				//First time when no category is selected, default welcome page should be displayed
				//navigate to initial page for !phone
				if (!sap.ui.Device.system.phone) {
					this.getRouter().getTargets().display("welcome");
				}
			   
			
		}
	});
});