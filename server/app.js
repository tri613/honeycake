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
app.use(express.static( path.join( __dirname, '../assets') ));
app.use(express.static( path.join( __dirname, '../public') ));

//setting for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//index page
app.get('/', function(req, res){
  res.sendFile( path.join( __dirname, '../index.html' ) );
});

//api
app.route('/api/orders/:orderId?')
	.get(function(req,res){ //get order(s) detail
		// var orders = getOrders();
		// var result = (req.params.orderId === undefined) ? getOrders() : getOrder(req.params.orderId);
		// if(!result){
		// 	res.status(404).send('No matching record found.');
		// }else{
		// 	res.json(result);
		// }
	})
	.post(function(req,res){ //create new order
		// var orders = getOrders();
		// var new_order = req.body;

		// if(new_order == undefined || new_order.total == undefined){
		// 	res.status(400).send('Invalid input.');
		// 	return false;
		// }

		// new_order.createTime = new Date().getTime();
		// new_order.updateTime = new Date().getTime();
		// new_order.id = orders.length; //use index as order id?
		// new_order.status = 'UNPAID'; 


		// //push new order into it
		// orders.push(new_order);

		// //write the whole new content into order file
		// var contents = JSON.stringify(orders);
		// fs.writeFileSync(filePath,contents);
		// res.sendStatus(201);
	})
	.put(function(req,res){ //update order status
		// var orders = getOrders();
		// var id = req.params.orderId;
		
		// if(orders[id] === undefined){
		// 	res.status(404).send('No matching record found.');
		// }else if(req.body.status === undefined){
		// 	res.status(400).send('Invalid input.');
		// }else{
		// 	orders[id].status = req.body.status;
		// 	orders[id].updateTime = new Date().getTime();
		// 	var contents = JSON.stringify(orders);
		// 	fs.writeFileSync(filePath,contents);
		// 	res.sendStatus(200);
		// }

	}) 
;

app.post('/test',function(req,res){
	res.send(req.body);
});

app.listen(3000, function () {
  console.log('Honeycake listening on port 3000!');
});