'use strict';

(function(){

	angular.module('HoneyCake',['ngRoute','HoneyServices','HoneyRouter'])

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
				var channel = CartFactory.channels.find(item=>{
					return item.value == $scope.user.by;
				});
				if(channel == undefined || channel.shipment == 0){
					return 0;
				}
				return (CartFactory.getItem('honeycake').num > 0) ? channel.shipment.cake : channel.shipment.ticket;
			}

			$scope.CalTotal = function(){
				var sum = CartFactory.getItemTotal();
				sum += $scope.CalDilvery();

				return sum;
			};

			$scope.getByName = function(_by){
				var channel = CartFactory.channels.find(item =>{
					return item.value == _by;
				});

				return (channel == undefined) ? channel.name : '';
			};

			$scope.greaterThanZero = function(item){
				return item.num > 0;
			};

			$scope.sendCart = function(){
				var items = [];
				$scope.items.forEach(item =>{
					if(item.num > 0){
						items.push({
							"key": item.key,
							"num": item.num,
							"name": item.name
						});
					}
				});

				var cart = {
					'items': items,
					'buyer': $scope.user,
					'total': $scope.CalTotal()
				};

				$http.post('/api/orders',cart)
				.success(function(){
					CartFactory.reset();
					alert('訂單已送出！謝謝尼～');
					$location.url('/');
				})
				.error(function(){
					alert('伺服器忙碌中，請稍候再次嘗試，謝謝。');
				});
			};

		}])

		// .directive("dynamicName",function($compile){
		//     return {
		//         restrict:"A",
		//         terminal:true,
		//         priority:1000,
		//         link:function(scope,element,attrs){
		//             element.attr('name', scope.$eval(attrs.dynamicName));
		//             element.removeAttr("dynamic-name");
		//             $compile(element)(scope);
		//         }
		//     };
		// })

	;

}());