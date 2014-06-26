app.controller("mainController", ['$scope','$rootScope','$route', 'NotificationService',
function($scope, $rootScope, $route, NotificationService){
	
	$scope.clickCounter = 0;
	
	$scope.option = {
		selected : ''
	};
	
	$scope.generateMessage = function(){
		$scope.clickCounter++;
		var rnd = Math.random();
		if(rnd > 0.4){
			NotificationService.addMessage(""+$scope.clickCounter);
			$rootScope.messages = NotificationService.getMessages();
			$rootScope.hasMessages = NotificationService.hasMessages();
		}else{
			NotificationService.addErrorMessage(""+$scope.clickCounter);
			$rootScope.errorMessages = NotificationService.getErrorMessages();
			$rootScope.hasErrorMessages = NotificationService.hasErrorMessages();
		}
	};
	$scope.clearMessages = function(){
		NotificationService.clearAll();
		$rootScope.messages = NotificationService.getMessages();
		$rootScope.hasMessages = NotificationService.hasMessages();
		$rootScope.errorMessages = NotificationService.getErrorMessages();
		$rootScope.hasErrorMessages = NotificationService.hasErrorMessages();
	};
	
	$scope.updateClickCounter = function(step){
		$scope.clickCounter += step;
	};
	
	$scope.setSelected = function(optionSelected){
		$scope.option.selected = optionSelected;
	};
	
//	 var lastRoute = $route.current;
//	    $scope.$on('$locationChangeSuccess', function(event) {
//	        $route.current = lastRoute;
//	    });
	
//	$scope.$on('$locationChangeStart', function(ev) {
//		  ev.preventDefault();
//		});

	
	$rootScope.$on('$routeChangeSuccess',function(){
	    //this only affects the template reloading if it changes
			$scope.$log.debug("$routeChangeSuccess OK!");
			$scope.template = $route.current.templateUrl;
		});     
	$rootScope.$on("$routeChangeSuccess", 
	    function (event, current, previous, rejection) {
			$scope.$log.debug("$routeChangeSuccess OK!");
			//event.preventDefault();
	});
}]);

app.controller("notificationController",  ['$rootScope', 'NotificationService', 
function($rootScope, NotificationService){
	$rootScope.messages = NotificationService.getMessages();
	$rootScope.hasMessages = NotificationService.hasMessages();
	$rootScope.errorMessages = NotificationService.getErrorMessages();
	$rootScope.hasErrorMessages = NotificationService.hasErrorMessages();
	
	$rootScope.notifyMessage = function(msg){
		NotificationService.addMessage(msg);
		$rootScope.messages = NotificationService.getMessages();
		$rootScope.hasMessages = NotificationService.hasMessages();
	};
	$rootScope.notifyError = function(errMsg){
		NotificationService.addErrorMessage(errMsg);
		$rootScope.errorMessages = NotificationService.getErrorMessages();
		$rootScope.hasErrorMessages = NotificationService.hasErrorMessages.length > 0;
	};
	
	$rootScope.clearNotifications = function(){
		NotificationService.clearAll();
		$rootScope.messages = NotificationService.getMessages();
		$rootScope.hasMessages = NotificationService.hasMessages();
		$rootScope.errorMessages = NotificationService.getErrorMessages();
		$rootScope.hasErrorMessages = NotificationService.hasErrorMessages();
	};
}]);

/**
 * This controller will be used for creating, updating or removing an user
 */
app.controller("userController", ['$scope', '$rootScope', '$timeout', 'UserService', 'UserFactory', 'NotificationService',
function($scope, $rootScope, $timeout, UserService, UserFactory, NotificationService){
	/*
	$scope.user = {
		id:'0', name : '',password:'',daysToChangePass: 30,email:'',registerDate: ''
	};*/
	//Doing the same with a factory
	$scope.user = UserFactory.createDefault();
	$scope.defaultUser = angular.copy($scope.user);
	$scope.status = {};
	$scope.status.disabled = false;
	//Resets the form
	$scope.clear = function(){
		$scope.user = $scope.defaultUser;
		$scope.usersForm.$setPristine();
	};
	
	$scope.cancelEdit = function(){
		$("#" + $scope.uwId).dialog('close');
	};
	
	$scope.create = function(user){
		$scope.$log.debug("User " + user.name + " is about to be created");
		//user.daysToChangePass = parseInt(user.daysToChangePass);
		var httpPromise = UserService.create(user);
		
		httpPromise.success(function(data, status, headers, config){
			var userCreated = angular.fromJson(data, true);
			UserService.addUserList(data);
			$rootScope.notifyMessage("User " + userCreated.name + " was successfully created");
			$scope.clear();
			$timeout(function(){
				$rootScope.clearNotifications();
//				$("#" + $scope.notificationWidget.nwId).fadeOut(
//					{	"duration":800,
//						"done":function(){
//						$rootScope.clearNotifications();
//						$scope.clear();
//					}
//				});
			}, 3000);
			
		}).error(function(data, status, headers, config){
			$scope.$log.debug("Status : " + status);
			$rootScope.notifyErrorMessage("Sorry, an unexpected error has ocurred :-(");
		});
	};
	
	$scope.update = function(user){
		$scope.$log.debug("User " + user.name + " is about to be updated");
		var httpPromise = UserService.update(user);
		//user.daysToChangePass = parseInt(user.daysToChangePass);
		$scope.status.disabled = true;
		httpPromise.success(function(data, status, headers, config){
			$scope.$log.debug("Status : " + status);
			UserService.updateUserList(data);
			$rootScope.notifyMessage("User " + user.name + " was successfully updated");
			$scope.status.disabled = true;
			
			$("#" + $scope.uwId).dialog('close');
			
			$timeout(function(){
				$scope.status.disabled = false;
				$rootScope.clearNotifications();
//				$("#" + $scope.notificationWidget.nwId).fadeOut(
//					{"duration":800,
//						"done":function(){
//							$rootScope.clearNotifications();
//							$scope.clear();
//						}
//					});
				}, 3000);
			
		}).error(function(data, status, headers, config){
			$scope.$log.debug("Status : " + status);
			$rootScope.notifyErrorMessage("Sorry, an unexpected error has ocurred :-(");
		});
	};
	
	$scope.remove = function(userID){
		$scope.$log.debug("ID User " + userID + " is about to be removed");
		var httpPromise = UserService.remove(userID);
		httpPromise.success(function(data, status, headers, config){
			$scope.$log.debug("Status : " + status + " Data: " + data + "headers : " + headers);
			UserService.removeUserList(userID);
			$rootScope.notifyMessage("User has been successfully removed");
			
			$timeout(function(){
				$rootScope.clearNotifications();
//				$("#" + $scope.notificationWidget.nwId).fadeOut(
//					{"duration":800,
//					 "done":function(){
//							$rootScope.clearNotifications();
//					 	}
//					});
			}, 3000).then(function(){
				//$("#" + $scope.notificationWidget.nwId).show();
			});;
			
		}).error(function(data, status, headers, config){
			$scope.$log.debug("Status : " + status + " Data: " + data + "headers : " + headers);
			$rootScope.notifyErrorMessage("Sorry, an unexpected error has ocurred :-(");
		});
	};
	
}]);

/* 
 * This controller is used for searching users and removing or editing them given a selected row.
 * We perform injection services to the controller : DateService and UserService*/
app.controller('userSearchController', 
		['$scope', 'DateService', 'UserService', function($scope, DateService, UserService){
	/*
	 * userSearchController ng-models 
	 */
	$scope.userSearch = 
		{
			name : '',
			daysToChangePassFrom : '',
			daysToChangePassTo : '',
			email : '',
			registerDateFrom : '01/02/2014',
			registerDateTo : '15/04/2014'
		};
	/* end ng-models*/
	$scope.data = {};
	$scope.data.userList = UserService.list();
	
	$scope.dateFilter = function(user){
		if(typeof user !== 'undefined'){
			var emptyFrom =  angular.isUndefined($scope.userSearch.registerDateFrom) 
								|| $scope.userSearch.registerDateFrom == '';
			var emptyTo =  angular.isUndefined($scope.userSearch.registerDateTo) 
								|| $scope.userSearch.registerDateTo == '';
			
			var dFrom = DateService.stringToDate($scope.userSearch.registerDateFrom);
			var dTo = DateService.stringToDate($scope.userSearch.registerDateTo);
			var dUsrReg = DateService.stringToDate(user.registerDate);
			if(!emptyFrom && !emptyTo){
				return dUsrReg >= dFrom && dUsrReg <= dTo;
			}else if(emptyFrom && !emptyTo){
				return dUsrReg <= dTo;
			}else if(!emptyFrom && emptyTo){
				return dUsrReg >= dFrom;
			}else{
				return true;
			}
		}
	};
	
	$scope.daysFilter = function(user){
		
		if(typeof user !== 'undefined'){
			var emptyFrom =  angular.isUndefined($scope.userSearch.daysToChangePassFrom) 
								|| $scope.userSearch.daysToChangePassFrom == '';
			var emptyTo =  angular.isUndefined($scope.userSearch.daysToChangePassTo) 
								|| $scope.userSearch.daysToChangePassTo == '';
	
			if(!emptyFrom && !emptyTo){
				var dFrom = $scope.userSearch.daysToChangePassFrom;
				var dTo = $scope.userSearch.daysToChangePassTo;
				return  user.daysToChangePass >= dFrom && user.daysToChangePass <= dTo;
			}else if(emptyFrom && !emptyTo ){
				
				var dTo = $scope.userSearch.daysToChangePassTo;
				return user.daysToChangePass <= dTo;
				
			}else if(!emptyFrom && emptyTo){
				var dFrom = $scope.userSearch.daysToChangePassFrom;
				return user.daysToChangePass >= dFrom;
			}else{
				return true;
			}
		}
	};
	
}]);
