var express = require('express');
var app = express();
var path = require('path');

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(express.static( path.join( __dirname, '../assets') ));
app.use(express.static( path.join( __dirname, '../public') ));

app.get('/', function(req, res){
  res.sendFile( path.join( __dirname, '../index.html' ) );
});

app.route('/orders/:orderId?')
	.get(function(req,res){
		if(req.params.orderId){
			res.json({'getting specific order':req.params});
		}else{
			res.json({'getting all orders':req.params});
		}
	});

app.listen(3000, function () {
  console.log('Honeycake listening on port 3000!');
});