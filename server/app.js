var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var api = require('./api.js');

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
//session
app.use(session({
	secret  : 'Triiiiiii',
    key     : 'trihc',
    resave: true,
    saveUninitialized: true
}));

//index page
app.get('/', function(req, res){
	res.sendFile( path.join( __dirname, '../web/index.html' ) );
});

//admin
app.get('/admin/login',function(req,res){
	if(req.session.access){
		res.redirect('/admin');
		return false;
	}
	res.sendFile( path.join( __dirname, '../web/login.html' ) );
});

app.get('/admin',function(req,res){
	if(!req.session.access){
		res.redirect('/admin/login');
		return false;
	}
	res.sendFile( path.join( __dirname, '../web/admin.html' ) );
});

//api
app.use('/api',api);


app.listen(3000, function () {
  console.log('Honeycake listening on port 3000!');
});