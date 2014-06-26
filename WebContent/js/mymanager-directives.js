/**
 * Loads jQuery datepicker if node contains datepicker attribute
 */

app.directive('datepicker', ['$rootScope', 'MM_CONSTANTS', function($rootScope,MM_CONSTANTS) {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat: MM_CONSTANTS.DATE_FORMAT,
                    onSelect:function (date, inst) {
                    	scope.$root.$log.debug(">:Selected " + date + " on id: " + inst.id);
                        ngModelCtrl.$setViewValue(date);
                        //Depending on the control whose value is changed we'll reflect it on 
                        //the respective ng-model
                        switch(inst.id){
                        	case "registerDateFrom":
                        		scope.user_registerDateFrom = date;
                        	break;
                        	case "registerDateTo":
                        		scope.user_registerDateTo = date;
                        	break;
                        	default:
                        		scope.$root.$log.warn("datepicker id:" + inst.id);
                        	break;
                        }
                        //Dispara el evento de cambio del valor del modelo ng-model="user_registerDateFrom"
                        scope.$apply();
                    }
                });
            });
        }
    };
}]);

/**
 * User Widget
 */
app.directive('userWidget', function(){
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'mymanager/widgets/user.html',
		link: function(scope, element, attrs){
			if(angular.isUndefined(attrs.uwId)){
				throw Error("You must define an ID for the user widget");
			}
			scope.title= attrs.uwTitle;
			scope.newMode = attrs.uwMode == "new";
			scope.editMode = attrs.uwMode == "edit";
			scope.uwId = attrs.uwId;

			switch(attrs.uwMode){
				case 'new':
					scope.textButton = "Create";
					break;
				case 'edit':
					scope.textButton = "Save";
					break;
				default:
					throw Error("user mode Not expected " + attrs.uwMode);
					break;
			}
			
		}
	};
});

/*
 * The editUser directive shows a modal dialog the client can update the selected user in.
 */
app.directive('editUser', function(){
	return{
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel){
			
			var openDialog = attrs.openDialog === "true";
			
			element.on("click", function(){
				var id = attrs.userId;
				var editDialogId = attrs.editDialogId;
				
				if(openDialog){
					var usrContainer = $("#" + editDialogId);
					//angular.copy lets us to clone an object.
					var options = angular.copy(configurations.dialogs.edit);
					options.title= "Change user data";
				
					usrContainer.dialog(options);
					
					usrContainer.dialog('open');
				}
				
				var u =_.find(data.users, function(user){return user.id == id;});
				//NEVER EVER EVER mix angularJS with jQuery!!!!
//				$("#name").val(u.name);
				if(u !== "undefined"){
					scope.user.id = u.id;
					scope.user.name= u.name;
					scope.user.pass = u.password;
					scope.user.email = u.email;
					scope.user.daysToChangePass = u.daysToChangePass;
					scope.user.registerDate = u.registerDate;
				
					scope.$log.debug("CLICK on user.id=" + id + "-" + u);
					//Sync changes to update the view
					scope.$apply();
				}else{
					throw Error("The user whose ID is " + id + " has not been found");
				}
			});
		}
	};
});

/*
 * The removeUser directive shows a confirm dialog that allows client to decide 
 * whether to remove the selected user or cancel the process
 */
app.directive('removeUser', function(){
	return{
		restrict: 'A',
		link: function(scope, element, attrs){
			
			element.on("click", function(){
				console.log("User " + attrs.userId + " is about to be deleted");
				var options = angular.copy(configurations.dialogs.confirm);
				options.title="Remove ";
				options.buttons={
						"Ok": function(){
							console.log("Bye!");
							scope.remove(attrs.userId);
							$("#" + attrs.confirmDialogId).dialog('close');
						},
						"Cancel":function(){
							console.log("Removing Cancelled");
							$("#" + attrs.confirmDialogId).dialog('close');
						}
				};
				//Try to not to remember an specific id. Avoid dependencies. We'll fix it later. DONE
				$("#" + attrs.confirmDialogId).show().dialog(options).dialog('open');
			});
		}
		
	};
});

/*
 * This directive allows us to customize a confirm dialog.  
 */
app.directive('confirmDialog', function(){
	return{
		restrict: 'AE',
		compile: function(element, attrs){
			
			if(attrs.cdId !== "undefined"){
				var id = attrs.cdId;
				var message = attrs.cdMessage;
				
				var htmlText = '<div id="' + id + '" class="confirmMsgDialog"><p>' + message + '</p></div>';
				element.replaceWith(htmlText);
			}else{
				throw Error("Confirm dialog :ID is mandatory");
			}
		}
	};
});

app.directive('notificationWidget', function(){
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/mymanager/widgets/notifications.html',
		link: function(scope, element, attrs, ngModel){
			scope.notificationWidget = {};
			scope.notificationWidget.nwId = attrs.nwId;
		}
	};
});
