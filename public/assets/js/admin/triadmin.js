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