var express = require('express');
var router = express.Router();
var orderHandler = require('./order_handler');

//orders
router.route('/orders')
	.get(function(req,res){
		var result = orderHandler.getOrders();
		res.json(result);
	})
	.post(function(req,res){
		var e = orderHandler.createOrder(req.body);
		if(e === false){
			res.sendStatus(500);
		}else{
			res.status(e.code).send(e.msg);
		}
	})
;
router.route('/orders/:orderId')
	.get(function(req,res){ //get order(s) detail
		var result = orderHandler.getOrder(req.params.orderId);
		if(!result){
			res.status(404).send('No matching record found.');
		}else{
			res.json(result);
		}
	})
	.put(function(req,res){ //update order status
		var result = orderHandler.updateOrder(req.params.orderId,req.body.status);
		if(result === false){
			res.sendStatus(500);
		}else{
			var s = orderHandler.getOrder(req.params.orderId);
			res.status(result.code).send(s);
		}
	}) 
;

//users (放棄使用REST，哈哈)
router.route('/login')
	.post(function(req,res){
		var sess = req.session,
			account = req.body.account,
			secret = req.body.secret;

		if(account == 'tri' && secret == 'chu'){
			sess.access = {account: account, token: 'kinginthenorth'};
			res.sendStatus(200);
		}else{
			res.sendStatus(403);
		}
	})
;

module.exports = router;
