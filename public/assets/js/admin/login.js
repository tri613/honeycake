(function(){

	angular.module('TriAdmin',['HoneyServices'])
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
	;

}());

