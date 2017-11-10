var request = require('request');
var fs = require('fs');
request('http://www.baidu.com/', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //  console.log('body:', body); // Print the HTML for the Google homepage.
});
//写入
fs.createReadStream('file.json').pipe(request.put('http://www.baidu.com/'));
//身份验证
request.get('http://www.baidu.com/').auth('username', 'password', false);
// or
request.get('http://www.baidu.com/', {
    'auth': {
        'user': 'username',
        'pass': 'password',
        'sendImmediately': false
    }
});
// or
request.get('http://www.baidu.com/').auth(null, null, true, 'bearerToken');
// or
request.get('http://www.baidu.com/', {
    'auth': {
        'bearer': 'bearerToken'
    }
});