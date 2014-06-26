/**
 * The DateService provides only a method that given a string converts to a Date
 */

app.service('DateService', function (){
	this.stringToDate = function(strDate){
		var tokens = strDate.split('/');
		var year = parseInt(tokens[2]);
		var month = parseInt(tokens[1]);
		var day = parseInt(tokens[0]);
		return new Date(year, month - 1, day);
	};
});

/*
 * The NotificationFactory provides a mechanism for reporting an user.
 */
app.service('NotificationService', function(){
	
	this._messages = [];
	this._errors = [];
	this.addMessage = function(msg){
		if(angular.isString(msg) || angular.isNumber(msg)){
			this._messages.push(msg);
		}else{
			throw Error("the message is not a String");
		}
	};
	
	this.hasMessages = function(){
		return this._messages.length > 0;
	};
	this.addErrorMessage = function(msg){
		if(angular.isString(msg) || angular.isNumber(msg)){
			this._errors.push(msg);
		}else{
			throw Error("the message is not a String");
		}
	};
	
	this.hasErrorMessages = function(){
		return this._errors.length > 0;
	};
	
	this.getMessages = function(){
		return this._messages;
	};
	
	this.getErrorMessages = function(){
		return this._errors;
	};
	
	this.clearMessages = function(){
		this._messages.clear();
	};
	
	this.clearErrors = function(){
		this._errors.clear();
	};
	this.clearAll =  function(){
		this.clearMessages();
		this.clearErrors ();
	};
});
/*
 *	The UserService provides methods to create, update or remove an user as well as list users
 */

app.service('UserService', function($http){
	//Call server to create user...
	this.create = function(user){
		console.log("Creating user ...");
		//fOUND IN:http://jsfiddle.net/ziaxdk/JsXv7/ wHY IT wORKS?!!
		
		 //Keep in mind that $http returns a Promise object which has callback functions such as success() or error()
		 //This object will be used in a controller so as to pass data to the scope.
		return $http.post('/mymanager/users.do', "json=" + encodeURIComponent(angular.toJson(user)),
				{
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					params:{
						'op':'i'
					},
					transformRequest: function (data, headerGetter) {
		                return data;
		            }
				}
		);
	};
	
	//Call server to update selected user...
	this.update = function(user){
		console.log("Updating user ...");
		return $http.post('/mymanager/users.do', "json="  + encodeURIComponent(angular.toJson(user)),
				{
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					params:{
						'op':'u'
					},
					transformRequest: function (data, headerGetter) {
		                return data;
		            }
				}
		);
	};
	//Call server to remove selected user...
	this.remove = function(id){
		console.log("Removing user ...");
		return $http.post('/mymanager/users.do', "id=" + id,
				{
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					params:{
						'op':'d'
					},
					transformRequest: function (data, headerGetter) {
		                return data;
		            }
				}
		);
	};
	
	this.list = function(){
		return data.users;
	};
	//Update JSON users data...
	this.addUserList = function(user){
		data.users.push(user);
	};
	
	this.updateUserList = function(user){
		for(var i = 0; i < data.users.length ; i++){
			var u = data.users[i];
			if(u.id == user.id){
				data.users[i] = user;
				console.log("Updating user " + u.id);
				break;
			}
		}
		return user;
	};
	
	this.removeUserList = function(id){
		//var user = _.find(data.users, function(user){ return user.id == id;});
		for(var i = 0; i < data.users.length ; i++){
			var u = data.users[i];
			if(u.id == id){
				data.users.splice(i, 1);
				console.log("Removing user " + u.id);
				break;
			}
		}
		
	};
	///////////////
});

