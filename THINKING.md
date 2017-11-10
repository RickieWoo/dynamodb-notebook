### Q&A

1. npm的⽤用法, npm install的各个参数意义 --save / --save-dev / -g

   1. --save 是安装到该项目 
      1. 在用户使用产品的时候，所需要的依赖包，在package.json中的dependencies中。
   2. --save-dev 开发模式
      1. 在开发人员开发时所需要的工具包，用户无需安装，在package.json中的devDependencies中。
   3. -g 全局安装
      1. 安装在本地node_modules，进入该文件夹或者在cmd中加上路径可以使用 

2. JsonSchema了解

   1. 可以用于检验一个给定的JSON字符串是否符合一个给定的JSON schema。
   2. JSON 模式是一种基于 JSON 格式定义 JSON 数据结构的规范。

3. 如果你的记事本应⽤用要上线，使⽤用上⾯面提到的组件或⼯工具，思考以下问题怎么解决：

   1. 如何兼顾开发模式和⽣生产模式？
      1. 开发和生产模块相互独立，避免在生产模式中出现开发测试的代码
      2. 注意生产模式需要的依赖--save,开发模式--save-dev
      3. 测试时用善用mocha等测试框架，调试时加相应参数。
      4. 把用到的第三方库放在一个特殊的目录中。比较容易愤青哪些代码是负责测试修改的，哪些是不应该触碰的。
   2. 版本迭代后如何保持对之前所有版本的兼容性
      1. 因为代码库的更新较快，如果有依赖包的名称改动，至少需要一份说明文档，或者修改package.json
      2. 将每个版本进行保存，包括package.json和当时的环境配置，让用户可以根据不同的版本用不同的依赖
      3. 如果失败可以提示用户更新至现在所需要的版本

4. 思考一份API⽂文档应该包含哪些要素。

   至少包括:

   1. 正确的运行方法
   2. 所依赖的环境
   3. 现有的功能
   4. 之前的版本和可用的环境

### 相关思考及笔记

- modules_learning/ 保存了每个lib的简单应用

#### TDD与BDD与unit testing

TDD：test-driven-development 测试驱动开发

1. 开发者编写测试

2. 开发者跑测试并显然失败因为测试还未编写

3. 开发者实际上在代码中实现这些实测

4. 如果开发者写的代码正确，那么会通过测试

5. 然后开发者可以重构代码，添加注释并清理，如果开发者破坏某些东西，那么测试会失败

6. 回到1

   TDD 编写过程

   1. 确定想要函数的输入和输出
   2. 函数的调用方式
   3. 为能想到的输入选择可能性比较小的行为
   4. 写一个测试，使用这些输入调用函数并验证行为
   5. 实施足够的代码使测试通过

BDD：behavior-driven-development行为驱动开发

1. BDD旨在消除TDD可能造成的问题
2. 写行为和规范，驱动软件开发
3. 更关注功能

Unit-testing ：单元测试

1. 单独的测试

Conclusion

> Unit Testing gives you the what. 
>
> Test-Driven Development gives you the when. 
>
> Behavior Driven-Development gives you the how.
>
> Although you can use each individually, you should combine them for best results as they complement each other very nicely.



#### node regular modules

###### DEBUG

```javascript
DEBUG=http node app.js
```

注意DEBUG是由空格或逗号分隔参数，因此等号两旁不应有空格

###### joi

对象模式描述语言和JavaScript对象的验证器。

eg：制定输入限制并根据设定的限制进行验证

###### Request

求被设计成可能的最简单的方式来进行http调用。它支持HTTPS，并且默认遵循重定向。

###### dotenv

Dotenv是一个从`.env`文件加载环境变量的零依赖模块[`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)。将配置存储在独立于代码的环境中基于[十二因子应用程序](http://12factor.net/config)方法。

- .env文件，环境变量的文件。	

创建一个.env 并在其中写环境变量 

```json
APP = demo
HOST=127.0.0.1
```

```javascript
var config = require('dotenv').load(); //默认当前路径 
console.log(config);
```

```json
$ node dotenv.js
{ parsed:
   { APP: 'demo',
     HOST: '127.0.0.1',
     S3_BUCKET: 'YOURS3BUCKET',
     SECRET_KEY: 'YOURSECRETKEYGOESHERE' } }
```

######  winston

node.js的多传输异步日志记录库 

it can log everything



### 12 factor

软件即服务（英语：Software as a Service，縮寫為**SaaS** ）

1. 基准代码

   1. 一份基准代码多份部署

2. 依赖

   1. 显式声明依赖关系，如npm install

3. 配置

   1. 在环境中存储配置，.env

4. 后端服务

   1. 把后端服务当作附加资源
   2. 部署可以按需加载或卸载资源。例如，如果应用的数据库服务由于硬件问题出现异常，管理员可以从最近的备份中恢复一个数据库，卸载当前的数据库，然后加载新的数据库 – 整个过程都不需要修改代码。

5. 构建，发布，运行

   1. 严格分离构建和运行

6. 进程 

   1. 一个或多个无状态进程运行应用

7. 端口绑定

   1. 通过端口绑定提供服务

8. 并发

   1. 通过线程模型进行扩展

9. 易处理

   1. 快速启动和优雅终止可最大化健壮性

10. 开发环境与线上环境等价

   1. 尽可能保持开发，预发布，线上环境一致

11. 日志

    1. 把日志当作事件流

12. 管理进程

    1. 后台管理任务当作一次性进程运行

    ​