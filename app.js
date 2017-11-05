'use strict'
var express = require('express');
var AWS = require("aws-sdk");
var bodyParser = require('body-parser');
var uuid = require('uuid');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var app = express();
var docClient = new AWS.DynamoDB.DocumentClient();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) //将表单数据格式化

app.get('/Sources', function(req, res) {
    console.log('I get a req');
    var table = "Sources";
    var params = {
        TableName: table,
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("scanItem succeeded:", JSON.stringify(data.Items, null, 2));
            res.json(data.Items);
        }
    });
});
//post data
app.post('/Sources', function(req, res) {
    var table = "Sources";
    var id = new Date().getTime().toString();
    var time = new Date().toLocaleString();
    var info = req.body.info;
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "time": time,
            "modifytime": time,
            "info": info
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });

});
//delete data 
app.delete('/Sources/:id', function(req, res) {
    var table = "Sources";
    var id = req.params.id;
    console.log(id + req.body.id);
    var params = {
        TableName: table,
        Key: {
            "id": id,
        }
    };
    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
});

//update data
app.put('/Sources/:id', function(req, res) {

    var table = "Sources";
    var id = req.params.id;
    var time = new Date().toLocaleString();

    var params = {
        TableName: table,
        Key: {
            "id": id,
        },

        UpdateExpression: "set info = :i,modifytime=:t",
        ExpressionAttributeValues: {
            ":i": req.body.info,
            ":t": time,
        },
        ReturnValues: "UPDATED_NEW"

    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });
});
//todo
app.get('/Sources/:id', function(req, res) {
    var params = {
        TableName: "Sources",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            "#yr": "id"
        },
        ExpressionAttributeValues: {
            ":yyyy": (req.params.id)
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                res.json(item);
            });
        }
    });
});
app.listen(3003);
console.log("app runs at port:3003 :)");