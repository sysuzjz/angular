# 项目概览

* 技术组合：`angular` + `stylus` + `jade`
* 构建：`gulp` + `webpack`构建
* 向下兼容：`nib`自动添加样式前缀，`babel`使得ES6甚至ES7特性的代码可以运行在低端浏览器
* 代码风格：使用`eslint`进行严格的代码风格审查，保持编码风格一致。使用`pre-commit`在向git提交代码时强行检查，并在检测到错误时中止代码提交
* 模式划分：`开发者模式` 与 `生产模式`
* 性能优化：构建时合并文件，对小图片进行base64编码，生产模式下对代码进行压缩与混淆

# 构建帮助
进入项目文件夹，先执行`npm install`下载相关包。接着执行以下指令之一：
* `npm run dev`：开发者模式，不会对代码进行压缩，会持续监听文件变化并自动构建出新的目标文件
* `npm run compile`：生产模式，对代码进行压缩，并对js文件进行哈希命名处理
* `npm run test`：代码风格检查

# 目录结构

root  
  |  
  |----- build 构建好的目录  
  |  
  |----- src   
  |　　　|   
  |　　　|----- common 通用组件   
  |　　　|  
  |　　　|----- component 存放各种组件，即directive，每个directive为一个文件夹，包含js和css文件  
  |　　　|  
  |　　　|----- page 各个页面，即html  
  |　　　|  
  |　　　|----- app.js 入口文件  
  |  
  |----- gulpfile.js gulp构建配置  
  |  
  |----- webpack.config.js webpack配置  
  |  
  |----- package.json  


# 参考
`https://segmentfault.com/a/1190000003915443`  
`https://segmentfault.com/a/1190000004468428`