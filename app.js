/*eslint no-unused-vars: 1*/
/*eslint no-undef: 1*/
const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const debug = require('debug')('http');

AWS.config.update({
	region: 'us-west-2',
	endpoint: 'http://localhost:8080'
});

const app = express();
const noteCRUD = require('./routes/crud');
const logger = require('./public/qa/log');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //将表单数据格式化

const handlebars = require('express3-handlebars').create({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const createTable = require('./lib/create');

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use('/', noteCRUD);

app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});
app.use(function(err, req, res, next) {
	logger.debug(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(3002);

debug('app runs at port:3003 :)');