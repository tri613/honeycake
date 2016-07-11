(function(){
	angular.module('HoneyRouter',['ngRoute'])
		.config(function($routeProvider){
			$routeProvider
			.when('/',{
				templateUrl: 'pages/welcome.html',
			})
			.when('/cart',{
				templateUrl: 'pages/cart.html',
			})
			.when('/confirm',{
				templateUrl: 'pages/confirm.html',
				controller: 'ConfirmController'
			})
			.when('/finish',{
				templateUrl: 'pages/finish.html',
				controller: 'FinishController'
			})
			.otherwise('/');
		})
	;
}());