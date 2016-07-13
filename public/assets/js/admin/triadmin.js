(function(){

	angular.module('TriAdmin',['HoneyServices'])
		.controller('OrderController', ['$scope', '$http', 'CartFactory',function($scope, $http, CartFactory){
			$scope.orders = [];
			$scope.total = 0;
			
			$http.get('/api/orders').then(function(res){
				$scope.orders = res.data;
				res.data.forEach(order => {
					$scope.total += order.total;
				});
			});

			$scope.byFormatter = function(_key){
				var result = CartFactory.channels.find(c=>{
					return c.value == _key;
				});
				return (result == undefined) ? result[0]['name'] : _key;
			};

			$scope.updateOrder = function(_id,_status){
				$http.put('/api/orders/'+_id,{status:_status})
				.success(function(res){
					// alert('更新成功！');
					$scope.orders.find(i=>{
						return i.id == _id;
					}).updateTime = res.updateTime;
				})
				.error(function(err){
					alert('伺服器忙碌中，請稍後再次嘗試。');
					console.log(err);
				});
			};
		}])

		.controller('LoginController',['$scope','$http','$window',function($scope, $http,$window){

			$scope.doLogin = function(){
				var account = $scope.account,
					secret = $scope.secret;

				$http.post('/api/login',{account:account,secret:secret})
				.success(function(res){
					$window.location.reload();
				})
				.error(function(body,status){
					console.log(body,status);
					if(status === 403){
						alert('帳號密碼錯誤。');
					}else{
						alert('伺服器忙碌中，請稍後再次嘗試。');
					}
				});
			};


		}])

		// .service('ApiHandler', ['$http', function($http){
		// 	this.getOrders = function(){
		// 		var total = 0, orders = [];
		// 		$http.get('/api/orders')
		// 		.success(function(res){
		// 			orders = res;
		// 			res.forEach(order => {
		// 				total += order.total;
		// 			});
		// 		})
		// 		.error(function(err){
		// 			alert('伺服器忙碌中，請稍後再次嘗試。');
		// 			console.log(err);
		// 		});

		// 		return {orders: orders, total:total};
		// 	}
		// }])

	;

}());

//第三責任險