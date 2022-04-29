```
{
  /*
    包含需要编译的文件
    ** 任意目录
    * 任意文件
  */
//  "include": [
//    "./src/**/*"
//  ],
  /*
    不需要编译的文件，一般不需要配置
    "exclude": [],
  */
  /*
    继承与其他的json文件
    "extends": ""
  */
  /*
    针对多个单个文件,一般不用
    "files": [
      "index.ts",
    ]
  */
  "compilerOptions": {
    /*
    指定ts需要编译成的es版本
    取值有：
    'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017',
    'es2018', 'es2019', 'es2020', 'es2021', 'esnext'
    */
    "target": "es2015",
    /*
    取值有：指定要使用的模块化规范
    'none', 'commonjs', 'amd', 'system', 'umd',
    'es6', 'es2015', 'es2020', 'esnext'
    */
    "module": "es2015",
    /*
    用来指定项目中要使用的库
      "lib": ["dom"]
    */
    //用来指定编译之后的文件输出目录
    "outDir": "./dist"
    /*
      将代码合拼为一个文件，所有全局作用域的代码会合拼到一个文件里面,module需要设置为：amd 或者 system
      "outFile": "./dist/test.js"
   */
    //是否对js文件进行编译，默认为false
//    "allowJs": false,
    //检查js文件是否符合规范,默认为false,开启之后需要把：allowJs:true
//    "checkJs": false,
    //是否移除注释，默认为false
//    "removeComments": true,
    //是否不生成编译后的文件，默认为false,
//    "noEmit": false,
    // 所有严格检查的总开关,这个设置为true，下去四个属性默认全为TRUE，反之亦然
//    "strict": true,
    //用来设置编译后的文件是否进入严格模式 use strict
//    "alwaysStrict": true,
    // 是否允许隐式的any类型 ，默认false
//    "noImplicitAny": false,
    // 是否允许不明确的this类型 默认为false
//    "noImplicitThis": false,
    // 严格的检查空值
//    "strictNullChecks": false
  },
  "include": ["./src/**/*"]
}
```