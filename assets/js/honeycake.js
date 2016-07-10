'use strict';

(function(){

	angular.module('HoneyCake',['ngRoute'])

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

		.controller('FormController', ['$scope','$location','CartFactory', function($scope,$location,CartFactory){
			$scope.items = CartFactory.items;
			$scope.user = CartFactory.user;
			$scope.channels = CartFactory.channels;
			$scope.checkTotal = function(){
				return CartFactory.getItemTotal() > 0 ;
			};
			$scope.submitForm = function(){
				CartFactory.setUser($scope.user);
				$location.url('/confirm');
			};
			
		}])
		
		.controller('ConfirmController',['$scope','CartFactory','$location','$http',function($scope,CartFactory,$location,$http){

			if(CartFactory.getItemTotal() == 0){
				$location.url('/');
			}	

			$scope.items = CartFactory.items;
			$scope.user = CartFactory.user;
			
			$scope.CalDilvery = function(){
				var channel = CartFactory.channels.filter(item=>{
					return item.value == $scope.user.by;
				});
				if(channel.length<=0 || channel[0].shipment == 0){
					return 0;
				}
				return (CartFactory.getItem(2).num > 0) ? channel[0].shipment.cake : channel[0].shipment.ticket;
			}

			$scope.CalTotal = function(){
				var sum = CartFactory.getItemTotal();
				sum += $scope.CalDilvery();

				return sum;
			};

			$scope.getByName = function(_by){
				var channel = CartFactory.channels.filter(item =>{
					return item.value == _by;
				});

				return (channel.length>0) ? channel[0].name : '';
			};

			$scope.greaterThanZero = function(item){
				return item.num > 0;
			};

			$scope.sendCart = function(){
				var cart = {
					'items': $scope.items,
					'buyer': $scope.user,
					'total': $scope.CalTotal()
				};
			};

		}])

		.factory('CartFactory', function(){
			var cartFac = {};
			var itemMenu = [
				{
					_id:0,
					key: 't500',
					name: '餐券 / 買500送100',
					category:'ticket',
					price: 500,
					num:0
				},
				{
					_id:1,
					key: 't1000',
					name: '餐券 / 買1000送200',
					category:'ticket',
					price: 1000,
					num:0
				},
				{
					_id:2,
					key: 'honeycake',
					name: '蜂蜜蛋糕',
					category:'cake',
					price: 180,
					num:0
				}
			];

			cartFac.channels = [
				{
					name:'由工作人員交付',
					value: 'staff',
					shipment: 0
				},
				{
					name:'義賣活動當天領取',
					value: 'event',
					shipment: 0
				},
				{
					name:'郵寄',
					value: 'shipping',
					shipment: {
						cake: 150,
						ticket: 25
					}
				}
			];

			// cartFac.user = {};
			// cartFac.items = angular.copy(itemMenu);
			// cartFac.total = 0;
			cartFac.getItem = function(_id){
				return this.items[_id];
			};
			cartFac.setUser = function(info){
				this.user = info;
			};
			cartFac.getItemTotal = function(){
				var sum = 0;

				this.items.forEach(item => {
					var num = (item.num == undefined) ? 0 : parseFloat(item.num);
					sum += item.price * num;
				});

				this.total = sum;
				return sum;
			};

			cartFac.reset = function(){
				this.items = angular.copy(itemMenu);
				this.user = {};
				this.total = 0;
			};

			cartFac.reset();

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