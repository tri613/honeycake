(function(){
	angular.module('HoneyRouter',['ngRoute'])
		.config(function($routeProvider){
			$routeProvider
				.when('/',{
					templateUrl: 'welcome.html',
				})
				.when('/cart',{
					templateUrl: 'cart.html',
				})
				.when('/confirm',{
					templateUrl: 'confirm.html',
					controller: 'ConfirmController'
				})
				.when('/finish',{
					templateUrl: 'finish.html',
					controller: 'FinishController'
				})
				.otherwise('/');
		})
	;
}());