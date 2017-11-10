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

