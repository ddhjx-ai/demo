  // 导入处理路径的模块
  var path = require('path');
  var htmlWebpackPlugin = require('html-webpack-plugin')

  // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
  module.exports = {
    //配置打包模式为开发模式
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'), // 项目入口文件
    output: { // 配置输出选项
      path: path.resolve(__dirname, 'dist'), // 配置输出的路径
      filename: 'main.js' // 配置输出的文件名
    },

    /* 
      由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，
        同时还需要修改index.html中script标签的src属性，
        使用`html-webpack-plugin`插件配置启动页面，也就是 .html 文件.
    */
    plugins:[ //添加plugins节点配置插件
      new htmlWebpackPlugin({
        template:path.join(__dirname,'src/index.html'), // 模板路径
        filename:'index.html' // 自定生成的HTML文件的名称
      })
    ],

    /* 
      注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；
      1.运行`npm i style-loader css-loader -D` 配置 css 文件
      2.运行`npm i less-loader less -D` 配置 less 文件
      3.运行`npm i sass-loader node-sass -D` 配置 sass 文件
      4.运行`npm i url-loader file-loader -D` 处理 css 中图片路径
    */
    module:{  // 用来配置第三方 loader 模块
      rules:[ // 文件的配置的规则
        {test:/\.css$/,use:['style-loader','css-loader']}, // 配置所有 .css 后缀名的文件
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']},  // 配置 .less 后缀名的文件
        {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},  // 配置 .scss 后缀名的文件

        // css 中的图片文件都会被转换为 base64 格式
        // 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
        // {test:/\.(jpg|png|gif|jpeg|svg)$/,use:['url-loader']},    // 配置 css 中图片路径
        {test:/\.(jpg|png|gif|jpeg|svg)$/,use:['url-loader?limit=1800&name=[hash:8][name].[ext]']},
        //base64编码的图片: ①针对简单的图片, ② 减少一次http的请求(小图才进行base64编码，大图不进行编码)
        //参数① limit=图片大小的字节 :若超过此字节-->就不会转成base64编码格式了
        //hash值: 32位 看成是身份证 解决名字的唯一
        //参数② name=[name].[ext] 显示自己的图片名字
        //解决图片名不重复, 配置hash值  name=[hash:8][name].[ext]

        // 配置字体图标库 如何使用bootstrap中的图标库
        {test:/\.(ttf|woff2|woff|eot)$/,use:'url-loader'},

        // 使用babel处理高级JS语法
        // 1. 运行`npm i babel-core babel-loader@7 babel-plugin-transform-runtime --save-dev`安装babel转换器的相关loader包
        // 2. 运行`npm i babel-preset-env babel-preset-stage-0 --save-dev`安装babel转换的语法
        // 3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
        {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
        // 4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
        // {"presets":["env", "stage-0"],"plugins":["transform-runtime"]}

        // 使用 html-withimg-loader 配置html中的图片路径
        // {test:/\.html$/,use:'html-withimg-loader'},
        // {test:/\.(jpg|png|gif|jpeg|svg)$/,use:['url-loader']}, 由于上面配置css 中的图片路径已经引用该配置项，这里可以不用引用了

        // 配置后缀名为 .vue 的文件
        {test:/\.vue$/,use:'vue-loader'}
      ]
    },

    resolve:{
      alias:{
        'vue$':'vue/dist/vue.js'
      }
    }
  }

  /* 
    `html-webpack-plugin`插件把index.html也托管到内存中
      1. 自动在内存中根据配置项生成的一个指定的页面
      2. 自动把打包到内存中的main.js导入到页面中
  */