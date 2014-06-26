app.factory('UserFactory', function(){
	
	var _id = 0;
	var _name = "";
	var _email = "";
	var _password = "";
	var _daysToChangePass = 0;
	var _registerDate = "";
	
	var methods = {};
	
	methods.createDefault = function(){
		return {
			id:  0, 
			name : "",
			password: "",
			email:"",
			daysToChangePass: 0,
			registerDate: ""
		};
	};
	methods.create = function(id, name, password, email, daysToChangePass, registerDate){
		_id = id;
		_name = name;
		_email = email;
		_password = password;
		_daysToChangePass = daysToChangePass;
		_registerDate = registerDate;
	};
	
	methods.getUser = function(){
		return {
			id: _id, 
			name : _name,
			password:_password,
			email:_email,
			daysToChangePass: _daysToChangePass,
			registerDate: _registerDate
		};
	};
	//User getter methods
	methods.getId = function(){
		return _id;
	};
	methods.getName = function(){
		return _name;
	};
	methods.getEmail = function(){
		return _email;
	};
	methods.getDaysToChangePass = function(){
		return _daysToChangePass;
	};
	methods.getRegisterDate = function(){
		return _registerDate;
	};
	
	//User setter methods
	methods.getId = function(id){
		_id = id;
	};
	methods.setName = function(name){
		_name = name;
	};
	methods.setEmail = function(email){
		_email = email;
	};
	methods.setPassword = function(password){
		_password = password;
	};
	methods.setDaysToChangePass = function(daysToChangePass){
		_daysToChangePass = daysToChangePass;
	};
	
	methods.setRegisterDate = function(registerDate){
		_registerDate = registerDate;
	};
	
	methods.toString = function(){
		_id + " - " + _name + " - " + _email + " - " + _daysToChangePass + " - " + _registerDate;
	};
	
	return methods;
});

