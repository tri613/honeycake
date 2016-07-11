var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var orderHandler = require('./order_handler');

//logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

//mount asset files
app.use(express.static( path.join( __dirname, '../public') ));

//setting for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//index page
app.get('/', function(req, res){
  res.sendFile( path.join( __dirname, '../web/index.html' ) );
});

app.get('/admin',function(req,res){
  res.sendFile( path.join( __dirname, '../web/admin.html' ) );
});

//api
app.route('/api/orders')
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
app.route('/api/orders/:orderId')
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


app.listen(3000, function () {
  console.log('Honeycake listening on port 3000!');
});