(function(){
	angular.module('HoneyServices',['ngResource'])
		.factory('CartFactory', function(){
			var cartFac = {};
			var itemMenu = [
				{
					key: 't500',
					name: '餐券 / 買500送100',
					category:'ticket',
					price: 500,
					num:0
				},
				{
					key: 't1000',
					name: '餐券 / 買1000送200',
					category:'ticket',
					price: 1000,
					num:0
				},
				{
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

			cartFac.getItem = function(_key){
				var i = this.items.filter(item=>{
					return item.key == _key;
				});
				return (i.length > 0) ? i[0] : false;
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
		.service('ApiHandler', ['$resource', function($resource){
			this.orders = $resource('/api/orders/:orderId',{orderId:'@orderId'},{update:{method:'PUT'}});
		}])
	;
	
}());
