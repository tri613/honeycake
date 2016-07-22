(function(){

	angular.module('TriAdmin',['HoneyServices','masonry','ngResource'])
		.controller('OrderController', ['$scope', '$http', 'CartFactory','ApiHandler',function($scope, $http, CartFactory,ApiHandler){
			$scope.orders = ApiHandler.orders.query(()=>{
				$scope.total = $scope.orders.reduce(sum).total; 
			});
			function sum (pre,cur){
				return {total: pre.total + cur.total};
			}
			$scope.byFormatter = function(_key){
				var result = CartFactory.channels.find(c=>{
					return c.value == _key;
				});
				return (result == undefined) ? result.name : _key;
			};
			$scope.updateOrder = function(_id,_status){
				ApiHandler.orders.update({orderId:_id,status:_status},function(data){
					$scope.orders.find((i)=>{return i.id == _id;}).updateTime = data.updateTime;
				});
			};
		}])
		.service('ApiHandler', ['$resource', function($resource){
			this.orders = $resource('/api/orders/:orderId',{orderId:'@orderId'},{update:{method:'PUT'}});
		}])
	;

}());