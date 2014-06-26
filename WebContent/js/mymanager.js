
var app = angular.module("mymanager", ['ngRoute', 'ngLocale', 'ngAnimate']);

app.constant('MM_CONSTANTS', {
	'DATE_FORMAT' : 'dd/mm/yy',
	'DATETIME_FORMAT' : 'dd/mm/yy hh:MM'
});

//Assign logger to the rootscope
app.run(function($rootScope, $log){
  $rootScope.$log = $log;
});

//Setup angular Logger
app.config(function($logProvider){
	$logProvider.debugEnabled(true);
});


app.config(['$httpProvider', '$routeProvider', '$locationProvider', 'MM_CONSTANTS', 
	function($httpProvider, $routeProvider, $locationProvider, MM_CONSTANTS){
	/*
		$httpProvider.defaults.transformRequest.push(function (data, headerGetter) {
	        console.log("transform Request");
	        return data;
	    });
	    $httpProvider.defaults.transformResponse.push(function (data, headerGetter) {
	        console.log("transform Response");
	        return data;
	    });*/
		
		// use the HTML5 History API.
		//This avoids reloading (re-render) the page everytime the location path changes
		$locationProvider.html5Mode(true);
		
		$routeProvider.when('/createUser', {
			templateUrl: 'mymanager/templates/newuser.html',
			controller: 'userController',
			reloadOnSearch: false
			/*resolve: {
			      // I will cause a 1 second delay
			      delay: function($q, $timeout) {
			        var delay = $q.defer();
			        $timeout(delay.resolve, 2200);
			        return delay.promise;
			      }
			    }*/
		})
		.when('/manageUsers', {
				templateUrl: 'mymanager/templates/manage-users.html',
				controller: 'userController',
				reloadOnSearch: false
		})
		.when('/about',{
				templateUrl: 'mymanager/templates/about.html',
				controller: 'mainController',
				reloadOnSearch: false
				
		});
		//.when('/editUser/:id', {controller:"userController", templateUrl:""});
		configurations.datePicker.dateFormat = MM_CONSTANTS.DATE_FORMAT;
		$.datepicker.setDefaults(configurations.datePicker);
		
	}
]);

Array.prototype.clear = function(){
	while(this.length > 0){
		this.pop();
	}
};

var configurations = { 
	datePicker : {
		  showOn: "both",
		  buttonImageOnly: true,
		  buttonImage: "mymanager/css/images/calendar_24x24.png",
		  buttonText: "Calendar",
		  //dateFormat: MM_CONSTANTS.DATE_FORMAT,
		  firstDay: 1,
		  changeYear: true
	},
	dialogs :{
		edit:{
			height:350,
			width:500,
			autoOpen : false,
			modal:true,
			show:{
				effect:"fade",
				duration:800
			},
			hide:{
				effect:"fade",
				duration:800
			}
		},
		confirm:{
			height:150,
			width:400,
			modal:true,
			show:{
				effect:"fade",
				duration:500
			},
			hide:{
				effect:"drop",
				duration:500
			}
		}
	}
};

var messages = {
	confirmDelete: "Are you sure you want to remove this user?",
	greeting:"Hello!!!!",
	bye:"for testing purposes..."
};
