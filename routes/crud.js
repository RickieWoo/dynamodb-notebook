/*eslint no-unused-vars: 1*/
/*eslint no-undef: 1*/

const express =  require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const debug = require('debug')('debug:crud');
const logger = require('../public/qa/log');
router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/Sources', (req, res) => {
	debug('I get a req' + req);
	let table = 'Sources';
	let params = {
		TableName: table,
	};
	docClient.scan(params, (err, data) => {
		if (err) {
			logger.debug('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			logger.info('scanItem succeeded:', JSON.stringify(data.Items, null, 2));
			res.json(data.Items);
		}
	});
});
//post data
router.post('/Sources', (req, res) => {
	let table = 'Sources';
	let id = new Date().getTime().toString();
	let time = new Date().toLocaleString();
	let info = req.body.info;
	let params = {
		TableName: table,
		Item: {
			'id': id,
			'time': time,
			'modifytime': time,
			'info': info,
		}
	};

	logger.info('Adding a new item...');
	docClient.put(params, (err, data) => {
		if (err) {
			logger.debug('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			logger.info('Added item:', JSON.stringify(data, null, 2));
			res.json(data);
		}
	});

});
//delete data 
router.delete('/Sources/:id', (req, res) => {
	let table = 'Sources';
	let id = req.params.id;
	debug(id + req.body.id);
	let params = {
		TableName: table,
		Key: {
			'id': id,
		}
	};
	logger.info('Attempting a conditional delete...');
	docClient.delete(params, (err, data) => {
		if (err) {
			logger.debug('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			logger.info('DeleteItem succeeded:', JSON.stringify(data, null, 2));
		}
	});
});

//update data
router.put('/Sources/:id', (req, res) => {

	let table = 'Sources';
	let id = req.params.id;
	let time = new Date().toLocaleString();

	let params = {
		TableName: table,
		Key: {
			'id': id,
		},
		UpdateExpression: 'set info = :i,modifytime=:t',
		ExpressionAttributeValues: {
			':i': req.body.info,
			':t': time,
		},
		ReturnValues: 'UPDATED_NEW'
	};

	logger.info('Updating the item...');
	docClient.update(params, (err, data) => {
		if (err) {
			logger.debug('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			logger.info('UpdateItem succeeded:', JSON.stringify(data, null, 2));
			res.json(data);
		}
	});
});
//choose
router.get('/Sources/:id', (req, res) => {
	let params = {
		TableName: 'Sources',
		KeyConditionExpression: '#yr = :yyyy',
		ExpressionAttributeNames: {
			'#yr': 'id',
		},
		ExpressionAttributeValues: {
			':yyyy': (req.params.id),
		}
	};

	docClient.query(params, (err, data) => {
		if (err) {
			logger.debug('Unable to query. Error:', JSON.stringify(err, null, 2));
		} else {
			logger.info('Query succeeded.');
			data.Items.forEach((item) => {
				res.json(item);
			});
		}
	});
});

module.exports = router;