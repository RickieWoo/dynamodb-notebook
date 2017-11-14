/*eslint no-unused-vars: 1*/
/*eslint no-undef: 1*/
const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-west-2',
	endpoint: 'http://localhost:8000'
});

let dynamodb = new AWS.DynamoDB();

let params = {
	TableName: 'Sources',
	KeySchema: [
		{ AttributeName: 'id', KeyType: 'HASH' }, //Partition key
	],
	AttributeDefinitions: [
		{ AttributeName: 'id', AttributeType: 'S' },
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

const create = dynamodb.createTable(params, function(err, data) {
	if (err) {
		console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
	} else {
		console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
	}
});

export default create;