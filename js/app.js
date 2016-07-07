'use strict';

(function(){

	angular.module('HoneyCake',['ngRoute'])

		.config(function($routeProvider){
			$routeProvider
				.when('/',{
					templateUrl: 'main.html',
				})
				.when('/step1',{
					templateUrl: 'step1.html',
					controller: 'ItemController'
				})
				.when('/step2',{
					templateUrl: 'step2.html',
					controller: 'DeliveryController'
				})
				.when('/confirm',{
					templateUrl: 'confirm.html',
					controller: 'ConfirmController'
				})
				.when('/finish',{
					templateUrl: 'finish.html',
					controller: 'FinishController'
				})
				.otherwise('/step1');
		})
		
		.controller('ItemController',['$scope','$location','CartFactory',function($scope,$location,CartFactory){
			$scope.items = CartFactory.items;

			$scope.checkValid = function(){
				var total = CartFactory.getItemTotal();
				if(total <= 0){
					angular.element(document.querySelector('.alert')).removeClass('hidden-xs-up');
					return false;
				}

				$location.url('/step2');
			}
			
		}])

		.controller('DeliveryController',['$scope','$location','CartFactory',function($scope,$location,CartFactory){
			$scope.items = CartFactory.items;
			$scope.user = {};

			//if no item chosen, redirect to index
			var total = CartFactory.getItemTotal();
			if(total <= 0){
				$location.url('/');
			}

			$scope.submitForm = function(){
				CartFactory.setUser($scope.user);
				// $location.url('/confirm');
			}
			// $scope.CalDilvery = function(){
			// 	return ($scope.user.by == 'shipping') ? 150 : 0 ;
			// }

			// $scope.CalTotal = function(){
			// 	var sum = CartFactory.getTotal();
			// 	sum += $scope.CalDilvery();

			// 	return sum;
			// };

			// $scope.total = CartFactory.getTotal();

		}])

		.factory('CartFactory', function(){
			var cartFac = {};

			cartFac.user = {};
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
			cartFac.setUser = function(info){
				// if(info.by == 'facetoface'){
				// 	info.ship = {};
				// }
				this.user = info;
			}
			cartFac.getItemTotal = function(){
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

		.directive("dynamicName",function($compile){
		    return {
		        restrict:"A",
		        terminal:true,
		        priority:1000,
		        link:function(scope,element,attrs){
		            element.attr('name', scope.$eval(attrs.dynamicName));
		            element.removeAttr("dynamic-name");
		            $compile(element)(scope);
		        }
		    };
		})

		.directive('navBar',function(){
			return {
				restrict:"E",
				templateUrl: 'nav.html'
			};
		})

	;

}());