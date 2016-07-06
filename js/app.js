'use strict';

(function(){

	angular.module('HoneyCake',['ngRoute'])

		// .config(function($routeProvider){
		// 	$routeProvider
		// 		.when('/',{
		// 			templateUrl: 'main.html',
		// 		})
		// 		.when('/step1',{
		// 			templateUrl: 'step1.html',
		// 			controller: 'ItemController'
		// 		})
		// 		.when('/step2',{
		// 			templateUrl: 'step2.html',
		// 			controller: 'DeliveryController'
		// 		})
		// 		.when('/finish',{
		// 			templateUrl: 'finish.html',
		// 			controller: 'FinishController'
		// 		})
		// 		.otherwise('/');
		// })
		
		.controller('MainController',function(){
			
		})

		.controller('ItemController',['$scope','CartFactory',function($scope,CartFactory){
			$scope.items = CartFactory.items;
			
		}])

		.controller('ConfirmController',['$scope','CartFactory',function($scope,CartFactory){
			$scope.items = CartFactory.items;

			$scope.CalTotal = function(){
				return CartFactory.getTotal();
			};

			$scope.total = CartFactory.getTotal();

		}])

		.factory('CartFactory', function(){
			var cartFac = {};

			cartFac.items = [
				{
					_id:0,
					key: 't500',
					name: '買500送100',
					category:'餐券',
					price: 500,
					num:0
				},
				{
					_id:1,
					key: 't1000',
					name: '買1000送200',
					category:'餐券',
					price: 1000,
					num:0
				},
				{
					_id:2,
					key: 'honeycake',
					name: '蜂蜜蛋糕',
					category:'蛋糕',
					price: 180,
					num:0
				}
			];
				
			cartFac.total = 0;
			cartFac.getItem = function(_id){
				return this.items[_id];
			}

			cartFac.getTotal = function(){
				var sum = 0;

				this.items.forEach(item => {
					var num = (item.num == undefined) ? 0 : parseFloat(item.num);
					sum += item.price * num;
				});

				this.total = sum;
				return sum;
			}

			return cartFac;
		})


	;

}());