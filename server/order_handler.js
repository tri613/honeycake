var fs = require('fs');
var filePath =  __dirname + '/orders.json';

var handler = {};
var _orders, _order;

try{
	_orders = JSON.parse(fs.readFileSync(filePath,'utf8'));
}catch(e) {
	// statements
	console.log(e);
}

handler.getOrders = function(){
	return _orders;
};
handler.getOrder = function(_id){
	_order = _orders.find(order => {
		return order.id == _id;
	});
	return _order;
};

handler.createOrder = function(_data){
	try{
		var new_order = _data;
		if(new_order == undefined || new_order.total == undefined){
			// throw new Error('Invalid input',400);
			return {
				'code': 400,
				'msg': 'Invalid input'
			};
		}

		new_order.createTime = new Date().getTime();
		new_order.updateTime = new Date().getTime();
		new_order.id = _orders.length; //use index as order id?
		new_order.status = 'UNPAID'; 

		//push new order into it
		_orders.push(new_order);

		//write the whole new content into order file
		var contents = JSON.stringify(_orders);
		fs.writeFileSync(filePath,contents);

		return {
			'code': 200,
			'msg': 'Success'
		};

	} catch(e) {
		console.log(e);
		return false;
	}
};

handler.updateOrder = function(_id,_status){
	try{
	
		if(!_id || _id === undefined){
			// throw new Error(400,'Invalid input');
			return {
				'code': 400,
				'msg': 'Invalid input'
			};
		}

		if(this.getOrder(_id) === false){
			return {
				'code': 404,
				'msg': 'No matching record found'
			};
			// throw new Error(404,'No matching record found');
		}
		_order.status = _status;
		_order.updateTime = new Date().getTime();
		var contents = JSON.stringify(_orders);
		fs.writeFileSync(filePath,contents);

		return {
			'code': 200,
			'msg': 'Success'
		};

	}catch(e){
		console.log(e);
		return false;
	}
};

module.exports = handler;