### 1、ECMAScript和JavaScript的区别

ECMAScript和JavaScript的区别是： 前者是后者的规范，后者是前者的一种实现

### 2、babel转码器

babel是一种广泛使用的转码器，可以将ES6转换成ES5，从而在现有的环境下运行

#### 配置.babelrc

```
{
  "presets": [
    'lastest',
    'react',
    'stage-3'
  ], 
  "plugins": []
}
```

preset字段设定转码的规则，官方给出了以下的规则集

```
<!-- 最新转码规则 -->
npm install --save-dev babel-preset-lastest

<!-- react的转码规则 -->
npm install --save-dev babel-preset-react

<!-- 不同阶段语法提案的转码规则 -->
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3
```

### 3、let和const指令

* 1、let声明的变量只在他所在的代码块有效(**块级作用域**)

```
for(let i = 0; i < 10; i++) {
  
}

console.log(i) // RefrenceError: i is not defined
```
下面的代码中，i是var命令声明的，在全局范围内有限，所以全局只有一个i,每一次循环中，i都会被改变，而循环内赋值给数组a的console.log(i)中的i就是全局的i，**也就是所有数组中的i都指向全局变量i，运行时输出最后一轮的i，也就是10**

```
var a = []
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}

a[6]() // 10
```

如果使用let声明的，声明的变量仅在块级作用域中有效，最后输出6，下面的代码中的i是通过let声明的，当前的i只在本轮的循环中有效，**所以每一次循环中的i其实都是一个新的变量，所以最后会输出6**JavaScript引擎内部会记住上一次循环的值，初始化本轮循环的变量i时，会在上一轮循环的基础上进行计算
```
var a = []
for(let i = 0; i < 10; i++ ) {
  a[i] = function() {
    console.log(i)
  }
}

a[6]() // 6
```

**for循环还有一个特别的地方，设置循环变量的那一部分是一个父级作用域，而循环体的内部是一个单独的子作用域**

```
for(let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}

// abc
// abc
// abc
```

* 2、不存在变量提升

var命令会产生“变量提升”现象，即变量可以在声明之前使用，值为 **undefined**，变量使用let声明，不会发生变量提升，这表示在声明他之前，变量时不存在的，这个时候使用变量就会报错

```
<!-- var的情况 -->
console.log(foo) // undefined
var foo = 2

<!-- let的情况 -->
console.log(bar) //ReferenceError报错
let bar = 2
```

* 3 、暂时性的死区

只要在块级作用域内存在let命令，它声明的变量‘绑定’这个区域，不再受外部区域的影响

```
var tmp = 123

if(true) {
  tmp = 12
  let tmp // ReferenceError:在let声明之前赋值就会报错
}
```

**如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成封闭的作用域，凡是在声明之前使用这些变量，就会报错,这个在语法上就称为‘暂时性死区TDZ’**

```
if(true) {
  <!-- TDZ开始 -->
  tmp = 'abc' // ReferenceError
  console.log(tmp) //ReferenceError

  let tmp //TDZ结束
  console.log(tmp) //undefined

  tmp = 123
  console.log(tmp) // 123
}

typeof undeclared_variable // 'undefined'
```

调用bar之所以会报错是因为参数的默认值是另一个参数y，而这时的y还没有被声明，属于‘死区’
```
function bar(x = y, y = 2) {
  return [x, y]
}

bar() //报错
```

```
function bar(x = 2, x = y) {
  return [x, y]
}

bar() [2, 2]
```

* 4、不允许重复声明

let不允许在相同的作用域内，重复声明同一个变量

```
function func() {
  let a = 10 // 报错
  var a = 6 // 报错
}

function func() {
  let a = 10 // 报错
  let a = 9 // 报错
}
```

```
function func(arg) {
  let arg  // 报错
}

function func(arg) {
  {
    let arg //不报错
  }
}
```

### 4、块级作用域

#### 为什么需要使用块级作用域？

- 1、内层变量可以回覆盖外层的变量

```
var tmp = 'hello world'

function f() {
  console.log(tmp)
  if(false) {
    var tmp = '233'
  }
}

f() //undefined  因为变量声明提升
```

- 2、用来计数的变量外泄

```
var s = 'hello'
for(var i = 0; i < s.length; i++) {
  console.log(s[i])
}
console.log(i) // 5
```