### 1.^ ~  package.json里面代表什么意思？
比如这个 “autoprefixer”: " ^ 7.1.2" 就表示安装 autoprefixer 不低于 7.1.2的最新模块，但是一定要记住不能改变大版本号，如"autoprefixer": " ^ 8.0.0" 这个是行不通的。原因就是因为版本的相互兼容性，小版本可能改变的很小，至少都能够相互兼容，如果大版本号改变了，很有可能引起模块的不兼容问题

“content-type”: “~1.0.4” 这个波浪号就是说 尽量安装1.0.4 及其以上的最新版本，但是不能改变次版本号，也就是1.1.0行不通的。只能安装1.0.x，且大于等于1.0.4 的版本。
### 2.__dirname和__filename 的区别 
__dirname：用来动态获取当前文件模块所属 目录 的绝对路径
__filename：用来动态获取 当前文件 的绝对路径
  __dirname打印结果比后者少一级

###  3，webpack 打包原理
1. 初始化一个配置文件，配置文件中指明入口文件和输出文件
2. 读取配置文件，分析入口文件，找到入口文件的依赖文件
3. 分析依赖文件，找到依赖文件的依赖文件，递归遍历，直到所有依赖文件分析完毕
4. 分析依赖文件，打包编译打包，生成一个或多个bundle文件

### 4 webpack 构建过程
1. 初始化参数
2. 开始编译
3. 确定入口
4. 编译模块
5. 输出资源

