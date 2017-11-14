

####dynamodb-notebook

use cmd , cd into the dynamoDB dir

 **port 8080**

```powershell
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8080 -sharedDb
```

then use another cmd to run:

```powershell
$ node app.js
```

- <-http://localhost:3003/> is the notebook app including CRUD

*if add a parameter test=1 it will run the test of mocha*

for example:

​	http://localhost:3003/about?test=1

### for test

at the root of this project dir:

```powershell
$ npm test
```

通过了linkchecker测试

```powershell
$ linkchecker http://localhost:3003/about
```

通过了jshint去毛测试

```powershell
$ jshint app.js
```

通过了eslint标准测试

```powershell
$ eslint app.js
```

debug

```powershell
$ DEBUG=HTTP node app.js
```



#### API

- 项目结构

  ./moudules_learning  **node的一些模块的实例**

./public

│  index.html  		 **主页**
│
├─controllers
│      controller.js         **angular的scope,对于http的CRUD操作**
│
├─qa				**质量保证**
│      test-about.js 	**简单测试about页面**
│      tests-global.js	**全局页面测试，每个html都需要有title**
│
├─static 		
│      index.css		**index的样式表**
│
└─vendor	**保存chai和mocha需要的js和css以便生成测试页面**

./routes

|  create.js    	**创建table的函数。**
|  crud.js        **CRUD操作**

./test

| 	test.js 	**测试文件**

./app.js    	**项目入口及程序启动文件**

- 数据结构

```json
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
```

- 示例数据

```json
{
  'time': '2017-07-07', //无需手动生成，创建文档时自动添加
  'info': 'emmmmmmmm',
  'modifytime': '2017-07-07',//无需手动生成，修改文档时自动添加
  'title': 'title',
  'id': '123'，//无需手动生成，根据创建文档的时间戳生成
}
```

- index 实际传入数据

```json
{
  'title': 'title',
  'info': 'emmmmmmmm',
}
```
- CRUD操作

```javascript
//get all
.request('http://localhost:8080')
  .get('/Sources')
//get one
.request('http://localhost:8080')
  .get('/Sources/'+ res.body.id)
//add
.request('http://localhost:8080')
  .get('/Sources')
  .send({ $message });
//update
request('http: //localhost:8080')
  .put('/Sources/' + res.body.id)
  .send({ $message})
//delete
request('http: //localhost:8080')
  .delete('/Sources/' + res.body.id)
```