### 1、get方法的传参长度的误区

* http协议没有限制get/post请求的长度限制
* GET请求的传参长度是因为浏览器和web服务器限制了URL的长度
* 不同的浏览器和web服务器的传参长度不同
* 支持IE， 最大的长度是2083byte, 支持chorme，最大长度是8182byte

### 2、get/post请求的区别

GET和POST本质上都是TCP连接，本质上并无差别，但是由于HTTP的规定和浏览器和服务器的限制，导致他们在使用的过程中体现出一些不同

* GET只发送一个TCP的数据包，POST会发送两个TCP数据包(对于get请求，浏览器会将http header和data一起发送出去，服务器响应200，对于POST，浏览器先发送header，服务器响应100 continue,浏览器再发送   data，服务器响应200)

* get类似于查找的过程，用户获取数据，，可以不用每次与数据库连接，所以可以使用缓存

* post不同，一般是删除和增加操作，必须与数据库交互，所以不能使用缓存

* GET在浏览器回退时是无害的，而post需要重新提交请求

* GET产生的地址可以被标记，但是POST不可以被标记

* GET请求会被浏览器主动cache，而post不会，除非手动设置

* GET请求只能进行URL编码，而POST请求可以支持多种编码

* GET请求的参数会被保存在浏览器的操作记录中，而post的参数不会被保留

* GET请求在URL中传送的参数是有长度限制的，而POST没有

* 对于参数的数据类型，GET只支持ASCII字符，而POST没有限制

* GET参数通过URL传输，POST通过request body传输

### 3、闭包

* 闭包是能够读取其他函数内部变量的函数，或是子函数在外部调用，父函数的作用域不会被释放

* 函数A返回一个函数B，并且函数B中使用了函数A的变量，函数B称为闭包

```
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
} //输出5个5

for(var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j)
    }, 1000)
  }(i))
}

for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}

for ( var i=1; i<=5; i++) {
	setTimeout( function timer(j) {
		console.log( j );
	}, i*1000, i);
}

```
都是通过改变变量的作用域实现


### 4、类的创建和继承

* (1) 类的创建
```
  function Animation(name) {
    // 属性
    this.name = name || 'Animal'

    // 实例方法
    this.sleep = function() {
      console.log(this.name + '正在睡觉！')
    }
  }

  // 原型方法
  Animal.prototype.eat = function(food) {
    console.log('this.name' + '正在吃' + food)
  }
```

* (2) 类的继承 --- 原型链继承
```
  function Cat() {}
  Cat.prototype = new Animal()
  Cat.prototype.name = 'cat'

  var cat = new Cat()
  console.log(cat.name)
  console.log(cat.eat('fish'))
  console.log(cat.sleep())
  console.log(cat instanceof Animal) // true
  console.log(Cat instanceof Animal) // true
```
##### 特点： 基于原型链，既是父类的实例，又是子类的实例
##### 缺点： 无法实现多继承
* (3) 类的继承 --- 构造函数继承: 使用父类的构造函数来增强子类的实例，即复制父类的实例属性给子类（没有用到原型）
```
  function Cat(name) {
    this.Animal.call(this)
    this.name = name || 'Tom' 
  }

  var cat = new Cat()
  console.log(cat.name)
  console.log(cat.sleep())
  console.log(cat instanceof Animal) // false
  console.log(cat instanceof Cat) // true
```
##### 特点： 可以实现多继承
##### 缺点： 只能继承父类实例的属性和方法，不能继承原型上的属性和方法

### 5、原型式继承，寄生式继承，寄生组合式继承

* (1) 原型式继承
```
var obj = {
  name: '小明', 
  friends: ['小黑', '小白']
}

<!-- 原型链的继承, 参数o, 实质就是一个内存地址 -->
<!-- es5 中的Object.create效果一样 -->
function object(o) {
  function F() {}
  F.prototype = o 
  return new F()
}

var obj1 = object(obj)
obj1.name = '小米'
obj1.friends.push('小小')

var obj2 = object(obj)
console.log(obj2.name) // 小明
console.log(obj2.friends) // ['小黑', '小白', '小小']

```

* (2) 寄生式继承

```
var obj = {
  name: '小明',
  friends: ['小黑', '小白']
}

function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function createObject(o) {
  var newObj = object(o)
  newObj.sayname = function() {
    console.log(this.name)
  }

  return newObj
}

var obj1 = new createObject(obj)
obj1.sayname() // 小明
```

* (3)寄生式组合继承

```
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

<!-- 父层， 超级层 -->
function Father(name) {
  this.name = name
  this.friends = ['小花', '小草']
}

Father.prototype.sayname = function() {
  console.log(this.name)
}

function Child(name, age) {
  father.call(this, name)
  this.age = age
}

<!-- 继承父类的prototype -->
function inheritPrototype(child, father) {
  var prototype = object(father.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

inheritPrototype(Child, Father)
Child.prototype.sayage = function() {
  console.log(this.age)
}

var c1 = new Child('小白', 20)

```

### 6、如何解决回调地狱

promise、async/await、generator

### 7、generator生成器(????)

```
<!-- 可以使用return和yield返回多次 -->
function* foo() {
  yield x + 1
  yield x + 2
  return x + 3
}
```

```
<!-- 斐波那契数列 -->
function fib(num) {
  var a = 0, b = 1, arr = [0, 1]
  while(arr.length < num) {
    [a, b] = [b, b + a]
    arr.push(b)
  }
  return arr
}
```

```
<!-- 使用generator生成器,使用next函数 -->
'use strict'
function* fib(max) {
  var a = 0, b = 1, n = 0
  while(n < max) {
    yield a
    [a, b] = [b, a + b]
    n++
  }
  return;
}

for(var x of fib(10)) {
  console.log(x)
}

```


### 8、前端中的事件流

##### 事件流描述的是从页面接收事件的顺序，DOM2级事件流包括（IE只支持事件冒泡）

* 事件捕获阶段
* 处于目标阶段
* 事件冒泡阶段

##### addEventListen(事件名， 事件处理函数， Boolean || obj) 
* true表示在事件的捕获阶段调用处理函数 
* false表示在事件冒泡阶段调用处理函数

对象参数可以有以下几个属性： 
* capture: 布尔值，与useCapture的作用一样
* once: 布尔值，值为true表示该回调只会执行一次，调用之后移除监听
* passive: 布尔值，表示永远不会调用preventDeafult


### 9、如何让事件先冒泡后捕获

### 10、一道题浅说JavaScript的事件循环
##### js是单线程语言，一个时间只能做一件事情

* 事件循环:

  为了协调事件，用户交互，脚本、UI渲染和网络处理等行为，防止主进程的阻塞，事件循环的方案应运而生。 Event Loop包含两类： 一类是基于Browing Context 一类是基于Worker。 两者的运行是独立的，一个JavaScript运行的线程环境都是一个独立的event loop, 每一个Web Worker也有一个独立的Event Loop


* 任务队列:

  事件循环是通过任务队列机制进行协调的，一个事件循环中可能存在一个或是多个任务队列,一个任务队列就是一系列有序任务的集合，每个任务都有一个任务源，源于同一个任务源的task必须放在同一个任务队列中，不同源的任务被放在不同的任务队列中。

#### 在事件循环中，每一个循环操作称为一个tick，每一个tick的任务处理模型的关键步骤：

  （1）在此次tick中选择最先进入队列的任务，如果有就执行一次
  
  （2）检查是否存在微任务，如果存在就不停地执行，直至清空微任务队列

  （3）更新render

  （4）主线程重复上次操作

#### 异步任务包括： task和microTask

  * Task(McroTask): 宏任务 
      script(整体代码)、 setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js)
  
  * MicroTask: 微任务
      Promise.then、MutationObserver、process.nextTick

在node环境中，会优先清空next tick queue,即通过process.nextTick注册的函数，再清空other queue, 常见的Promise,此外，timers(setTimeout/setInterval)会优先于setImmediate执行，因为前者在timer阶段执行，后者在check阶段执行

```
  console.log('script start')

  setTimeout(() => {
    console.log('timeout 1')
  }, 10)

  new Promise(resolve => {
    console.log('promise 1')
    resolve()
    setTimeout(() => console.log('timeout 2'), 10)
  }).then(() => {
    console.log('then1')
  })

  console.log('script end')
```

```
  microtask会在每个阶段独立完成之后立即执行

  script start
  promise 1
  script end
  then 1
  timeout 1
  timeout 2
```

```
  new Promise(resolve => {
    resolve()
   
    Promise.resolve().then(() => {
      console.log(2)
    })
    console.log(4)
  }).then(() => {
    console.log(1)
  })

  console.log(3)
```
```
4321

```

```
console.log('script start');

setTimeout(function() {
  console.log('timeout1');
  new Promise(resolve => {
        console.log('promise2');
        resolve();
    }).then(function() {
        console.log('then2')
    })
}, 10);

new Promise(resolve => {
    console.log('promise1');
    setTimeout(() => console.log('timeout2'), 10);
    resolve();
}).then(function() {
    console.log('then1')
})

console.log('script end');
```
```
script start
promise 1
script end
then 1
timeout 1
promise 2
then 2
timeout 2
```

### 11、 JavaScript运行机制

#### JavaScript是单线程，为了利用多核cpu的计算能力，Web Worker允许JavaScript脚本创建多个线程，但是子线程完全受控于主线程，且不能操作DOM

* 同步任务：

  在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行下一个任务

* 异步任务：
  
  不进入主线程，而进入‘任务队列’的任务, 只有任务队列通知主线程，某个异步任务就可以执行了，该任务才会进入主进程去执行

#### 异步任务的运行机制

* 所有的同步任务都在主线程上执行，形成一个执行栈

* 主线程之外，还存在一个任务队列，只有异步任务有了运行结果，就在任务队列中放置一个事件

* 一旦'执行栈'中所有的同步任务执行完毕，系统就会读取'任务队列', 异步任务，结束等待状态，进入执行栈，开始执行

* 主线程不断重复上面的第三步

### 12、深析原型中的各个难点

![原型链](./prototype.png)

#### prototype

prototype是一个显式原型属性，只有函数拥有这个属性，基本上所有的函数都拥有这个属性，但是有一个例外

```
  let fun = Function.prototype.bind()
```

##### prototype是如何产生的： 声明一个函数的时候，这个属性就会自动被创建
```
function Foo() {}

Foo.prototype的值也是一个对象(也就是原型),只有一个属性constructor
constructor是对应的构造函数，也就是Foo
```

#### constructor

constructor是一个共有的但是不可枚举的属性，一旦改变了函数的prototype，那么新对象中就没有这个属性(当然可以通过原型链取到constructor)
```
function Foo() {}
Foo.prototyoe = {a: 1}
console.log(Foo.prototype)
{
  a: 1
}
```


#### __proto__

每个对象都有的隐式原型属性，执行创建该对象的构造函数的原型，其实这个属性指向[[prototype]],但是[[prototype]]是内部属性，我们不能访问，只能通过__proto__进行访问

##### 实例对象的__proto__是如何产生： 当我们使用new操作符的时候，生成的实例对象就拥有__proto__属性

##### new的过程

* 新生成一个对象

* 链接到原型链

* 绑定this

* 返回新对象

```
  function create() {
    <!-- 创建一个新的对象 -->
    let obj = new Object()
    <!-- 获取构造函数 -->
    let Con = [].shift.call(arguments)
    <!-- 链接到原型 -->
    obj.__proto__ = Con.prototype
    <!-- 绑定this, 执行构造函数 -->
    let result = Con.apply(obj, arguments)
    <!-- 确保new出来的是一个对象 -->
    return typeof result === 'object' ? result : obj
  }
```
对于实例对象，都是通过new产生的，无论是function Func() {} 或是 let obj = {a: 1},但是对于创建一个对象而言，更推荐使用字面量的方式，因为使用new Object()方式创建的对象，需要通过作用域一层一层才能找到Object

#### Function.proto === Function.prototype

Object.prototype不是由Object创建的，而是引擎自己创建了这个对象，**所有实例都是对象， 但是不是所有的对象都是实例**

引擎先是创建了Object.prototype再创建了Function.prototype,然后通过__proto__将两者联系起来,因为Function.prototype是引擎创建的，所以没有prototype属性,

```
  var fun = Function.prototype.bind()

  fun没有prototype属性
```

**现在可以来解释 Function.__proto__ === Function.prototype 这个问题了。因为先有的 Function.prototype 以后才有的 function Function() ，所以也就不存在鸡生蛋蛋生鸡的悖论问题了。对于为什么 Function.__proto__ 会等于 Function.prototype ，个人的理解是：其他所有的构造函数都可以通过原型链找到 Function.prototype ，并且 function Function() 本质也是一个函数，为了不产生混乱就将 function Function() 的 __proto__ 联系到了 Function.prototype 上。**

* Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
* Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
* Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
* 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
* 函数的 prototype 是一个对象，也就是原型
* 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链

```
function Foo() {
  return this
}

Foo.getName = function() {
  console.log('1')
}

Foo.prototype.getName = function() {
  console.log('2')
}

new Foo.getName() // 1
new Foo().getName() // 2
```
从上图可以看出，new Foo()的优先级高于new Foo

```
new (Foo.getName())
(new Foo()).getName()
```

### 13、this指向问题

```
  function foo() {
    console.log(this.a)
  }

  var a = 1
  foo() //this = window  undefined

  var obj = {
    a: 2,
    foo: foo
  }

  obj.foo() // 2

  <!-- 以上两者情况的this只依赖调用当前的对象，优先级是第二种情况大于第一种情况 -->

  <!-- 以下情况的优先级最高， this只绑定在c上，不会被任何方式修改this的指向 -->

  var c = new foo()
  c.a = 3
  console.log(c.a) // 3

  <!-- 还有利用call/apply/bind改变this，这个优先级仅次于new -->
  
```

```
  function a() {
    return () => {
      return () => {
        console.log(this)
      }
    }
  }

  console.log(a()()())  // window
```
**箭头函数是没有this，这个函数的this只取决于他外面的第一个不是箭头函数的this，所以上面的例子的this指向window，并且this一旦绑定了上下文，就不会被任何代码修改，箭头函数也没有arguments属性**

### 14、 执行上下文

* 全局执行上下文

* 函数执行上下文

* eval执行上下文

**每个执行上下文都有三个重要的属性**

* 变量对象(VO)： 包括变量、函数声明、函数的形参，该属性只在全局上下文中访问

* 作用域链

* this

```
b() // call b

console.log(a) // undefined

var a = 'hello world'

function b() {
  console.log('call b')
}
```
在生成执行上下文时，会有两个阶段：

* 创建的阶段（创建VO）,js会找到需要提升的变量和函数，并且给他们提前开辟好空间，函数会将整个存入内存中，变量只声明并且复制为undefined（在变量提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升）

* 代码执行阶段，可以直接提前使用

**let提升声明但没有赋值，因为临时区的存在不能在声明前使用**

### 15、跨域问题

* JSONP: 利用script标签没有跨域限制，通过script标签指向一个需要访问的地址并提供一个回调函数来接收数据，**jsonp的方式只局限于get请求**

```
  function jsonp(url, jsonpCallback, success) {
    let script = document.createEelment('script')
    script.src = url
    script.async = true
    script.type = 'text/javascript'
    window[jsonpCallback] = function(data) {
      success && success(data)
    }
    document.body.appendChild(script)
  }

  jsonp('http://xxx', 'callback', function(value) {
    console.log('value')
  })
```

* CORS: CORS需要浏览器和后端同时支持，浏览器会主动进行CORS通信，实现CORS通信主要是后端，服务端设置'Access-Control-Allow-Origin'可以开启cors,该属性表示哪些域名可以访问资源

* document.domain: 该方式用于二级域名相同的情况之下，比如'a.test.com'和'b.test.com'， 只要在页面上添加document.domain = 'test.com'即可

* postMessage: 这种方式主要 用于获取嵌入页面的第三方数据，一个页面发送数据，另一个页面判断来源并且接受数据

```
<!-- 发送数据端 -->
widnow.parent.postMessage('message', 'http://test.com')
<!-- 接收消息端 -->
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if(origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```

### 16、浏览器的缓存策略

* 强缓存：

  实现强缓存可以通过两个响应头实现: Expires和Cache-Control。强缓存表示 **在缓存期间不需要请求，status code为200**

* 协商缓存：

  如果缓存过期，我们可以使用协商缓存来解决问题，协商缓存需要请求，如果缓存有效，返回304，协商缓存需要客户端和服务器端共同实现

##### 缓存策略

* 对于不需要缓存的资源，使用Cache-Control: no-store表示资源不需要缓存

* 对于频繁变动的资源，可以使用Cache-Control: no-cache并配合ETag使用，表示资源已经缓存，但是每次发送请求都会询问资源是否更新

* 对于代码文件来说，通常使用Cache-Control:max-ag = 31536000并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名改动就立即下载新的文件

### 17、如何渲染几万条数据而页面不会卡住

这道题考察了如何在不卡住页面的情况下渲染数据，也就是说不能一次性将几万条都渲染出来，而应该一次渲染部分 DOM，那么就可以通过 requestAnimationFrame 来每 16 ms 刷新一次。

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      控件
    </ul>
    <script>
      setTimeout(() => {
        // 插入十万条数据
        const total = 100000
        // 一次插入 20 条，如果觉得性能不好就减少
        const once = 20
        // 渲染数据总共需要几次
        const loopCount = total / once
        let countOfRender = 0
        let ul = document.querySelector('ul')
        function add() {
          // 优化性能，插入不会造成回流
          const fragment = document.createDocumentFragment()
          for (let i = 0; i < once; i++) {
            const li = document.createElement('li')
            li.innerText = Math.floor(Math.random() * total)
            fragment.appendChild(li)
          }
          ul.appendChild(fragment)
          countOfRender += 1
          loop()
        }
        function loop() {
          if (countOfRender < loopCount) {
            window.requestAnimationFrame(add)
          }
        }
        loop()
      }, 0)
    </script>
  </body>
</html>
```

### 18、事件委托

事件委托就是事件代理，利用事件冒泡，只指定一个事件处理程序，就可以管理一类型的数据
  
* 为什么使用事件代理: 在js中，添加到页面的事件处理程序的数量直接影响到页面的运行性能，因为需要不断地和DOM节点发生交互，访问DOM的次数越多，引起重绘重排的次数越来越多，就会延长页面的交互就绪时间，使用事件委托 **就会将所有的操作都放到js程序中，与DOM的操作只需要交互一次，这样就能大大减少DOM的操作**

* 事件委托的原理： 事件委托是使用事件冒泡的原理来实现的，就是从事件最深的节点开始，然后逐层向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

```
window.onload = function(){
　var oUl = document.getElementById("ul1");
　oUl.onclick = function(ev){
　　var ev = ev || window.event;
　　var target = ev.target || ev.srcElement;
  　if(target.nodeName.toLowerCase() == 'li'){
　 　　alert(123);
　　　　alert(target.innerHTML);
　　}
　}
}
```

### 19、扁平化数组

* 递归
```
var arr = [1, [2,3], [4,5,7]]

function flatten(arr) {
  var result = []
  for(let i = 0 ; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
```

* toString
```
var arr = [1, [2,3], [4,5,7]]

function flatten(arr) {
  return arr.toString().split(',').map(item => {
    return +item
  })
}
```

* reduce
```
var arr = [1, [2,3], [4,5,7]]

function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

console.log(flatten(arr))
```

* ...扩展运算符
```
var arr = [1, [2,3], [4,5,7, [1,6,7]]]

function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr
}

console.log(flatten(arr))
```

### 20、var、let、const的区别

- 1、var、let、const的主要区别是

* 块级作用域

* 不存在变量提升

* 暂时性的死区

* 不可重复声明

* let、const生命的全局变量不会挂在顶层对象上

- 2、const命令两个注意点：

* const声明之后必须马上赋值，否则就会立即报错

* const简单类型一旦声明就不能再更改，复杂类型（数组，对象等）指针指向的地址不能再改，内部数据可以改

### 21、CommonJS和ES6模块循环加载处理的区别

* commonJS模块规范使用require语句导入模块，module.exports导出模块，输出的是值的拷贝，模块导入的也是值的拷贝，也就是说一旦输出这个值，这个值在模块内部的变化是监听不到的

* ES6模块规范使用的是import语句导入模块，export语句导出模块，输出的是值的引用。ES6模块的运行机制和commonJS不同，遇到加载指令的时候不去执行这个模块，只会生成一个动态的值的引用，等到真正用到这个值的时候，再到模块中去取值，也就是谁原始值变了，那输入值也会发生改变


- 1、CommonJs模块的加载原理

CommonJS模块是一个脚本文件，require命令第一次加载该脚本的时候就会执行整个脚本，然后在内存中生成该模块的一个说明对象

```
{
  id: '', //模块名，唯一
  exports: { // 模块输出的各个接口

  },
  loaded: true, //模块的执行脚本是否已经结束
}
```

以后用到这个模块的时候，就到对象的exports属性中去取值，即使再次执行require命令，也不会再次执行该模块，而是到缓存中去取值

CommonJS模块是加载时执行，即脚本代码在require的时候就全部执行，一旦出现了某个模块的代码被“循环加载”，则只会输出已经执行的部分，没有执行的部分不会

- 2、ES6模块的循环加载

ES6模块和CommonJS有本质的区别，ES6模块对导出变量，方法，对象是动态的引用，遇到模块加载命令import时不会去执行模块，只是生成一个指向被加载模块的引用，需要开发者保证真正取值时才能取到值，只要引用是存在的，代码才能执行。

#### 总结

* (1)CommonJS模块是加载时执行，一旦出现某个模块被‘循环执行’，就只输出已经执行的部分，没有执行的部分不会输出

* (2)ES6模块对导出模块，变量，对象是动态的引用，遇到模块加载指令import时不会去执行模块，只是生成一个指向一个被加载模块的引用

### 22、防抖

所谓防抖，是指在触发事件n秒内函数只能执行一次，如果在n秒内又触发了事件，则会重新计算函数的执行时间，防抖函数分为非立即执行版和立即执行版

* 非立即执行版：触发事件之后不会立即执行，而是在n秒之后执行，如果在n秒之内又触发了事件，就会重新计算函数执行时间

```
function debounce(func, wait) {
  var timeout

  return function() {
    var context = this
    var args = arguments

    if(timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
```
* 立即执行版： 触发事件后函数立即执行，然后n秒之内不触发函数才会继续执行

```
function debounce(func, wait) {
  var timeout

  return function() {
    var context = this
    var args = arguments

    if(timeout) clearTimeout(timeout)

    var callNow = !timeout

    timeout = setTimeout(() => {
      timeout = null
    }, wait)

    if(callNow) {
      func.apply(context, args)
    }
  }
}
```

**立即执行和非立即执行的防抖函数**

* 例如在搜索引擎搜索问题的时候，我们希望用户在输入完最后一个字的时候再调用查询接口，这个时候适合 **延迟执行**的防抖函数，它是在一连串(间隔小于wait的)函数触发之后调用

* 例如是用户的点赞行为，我们希望用户点击第一下的时候就去调用接口并且成功之后才改变star按钮的样子，用户就可以立马得到反馈是否star成功，这种情况下适合 **立即执行**的防抖函数，它总是在第一次调用，并且第二次调用必须与第一次的间隔大于wait才会触发

```
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表示立即执行， false 表示非立即执行
 */
function debounce(func, wait, immediate) {
  var timeout

  return function() {
    var context = this
    var args = arguments

    if(timeout) clearTimeout(timeout)
    if(immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait);
      if(callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}
```

```
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于wait，func才会执行
 *
 * @param {function} func 回调函数
 * @param {function} wait 表示窗口的间隔
 * @param {function} immediate 设置为true时，表示立即执行函数
 * @return {function} 返回客户端调用函数
 */

function debounce(func, wait = 50, immediate = true) {
  let timer, context, args

  const laster = () => setTimeout(() => {
    timer = null

    if(!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...params) {
    if(!timer) {
      timer = laster()

      if(immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = laster()
    }
  }
}

```

### 23、节流

所谓节流，连续触发事件，但是在n秒内只执行一次，节流会稀释函数的执行效率,每隔n秒只会执行一次

* 时间戳版: 在持续触发事件的过程中，函数会立即执行，并且每1s执行一次

```
function throttle(func, wait) {
  var previous = 0 
  return function() {
    var now = Date.now()
    var context = this
    var args = arguments

    if(now - previuos > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}
```

* 定时器版：在持续触发事件的过程中，函数不会立即执行，并且每1s执行一次，在停止触发事件后，函数还会执行一次

```
function throttle(func, wait) {
  var timeout

  return function() {
    var context = this
    var args = arguments
    if(!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

```

**双剑合璧版**

```
function throttle(func, wait, type) {
  if(type == 1) {
    var previous = 0
  } else if(type == 2) {
    var timeout
  }
  return function () {
    var context = this
    var args = arguments

    if(type == 1) {
      var now = Date.now()

      if(now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if(type == 2) {
      if(!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }

}
 
```
**防抖和节流的区别**

防抖和节流的作用都是防止函数的多次调用，区别在于，假设一个用户一直在触发函数，且每次触发函数的间隔小于wait，防抖函数只会调用一次，而节流函数会每隔一段时间执行函数


### 24、this的指向问题

```
 var name = 'windowName'
 function a() {
   var name = 'cherry'
   console.log(this.name)
   console.log('inner:' + this)
 }

 a()
 console.log('outer：', this)

// windowName
// window对象
// window对象
```

```
var name = 'windowName'
var a = {
  name: 'cherry',
  fn: function() {
    console.log(this.name)
  }
}

a.fn() //cherry
window.a.fn() // cherry
```

```
var name = 'windowName'
var a = {
  name: cherry,
  fn: function() {
    console.log(this.name)
  }
}

var f = a.fn
f() // windowName
```

```
var name = 'windowName'

function fn() {
  var name = 'cherry'
  innerFunction()
  function innerFunction() {
    console.log(this.name)
  }
}

fn() // windowName
```

### 25、一行代码实现数据去重

[...new Set([2,3,4,1,5,2,5])]

### 26、数组去重的方法：

- 1、双层循环

```
var arr = [1, 1, '1', '1']

function unique(arr) {
  let res = []

  for(var i = 0, len = arr.length; i < len; i++) {
    for(var j = 0, resLen = res.length; j < resLen; j++) {
      if(arr[i] === res[j]) {
        break
      }
    }

    if(j === res.length) {
      res.push(arr[i])
    }
  }
  return res
}

unique(arr)
```
嵌套循环的方式，外层循环arr，内层循环res，如果arr[i]的值跟res[j]的值相等，则跳出循环，如果不相等，说明值是唯一的，这是的j会等于res的长度，根据这个判断条件将值添加到res

- 2、indexOf

```
var arr = [1, 1, '1', '1']

function unique(arr) {
  var res = []

  for(var i = 0, len = arr.length; i < len; i++) {
    var current = arr[i]
    if(res.indexOf(current) == -1) {
      res.push(current)
    }
  }
  return res
}

unique(arr)
```

- 3、排序后去重

```
var arr = [1, 1, '1', '1']

function unique(arr) {
  var res = []
  var sortArr = arr.concat().sort()
  var seen

  for(var i = 0, len = arr.length; i < len; i++) {
    if(!i || seen !== sortArr[i]) {
      res.push(sortArr[i])
    }
    seen = sortArr[i]
  }
  return res
}
unique(arr)
```

- 4、unique API
```
var arr1 = [1, 2, '1', 2, 1]
var arr2 = [1, 1, 2, '1', 2]

function unique(arr, isSort) {
  var res = []
  var seen = []

  for(var i = 0, len = arr.length; i < len; i++) {
    var value = arr [i]
    if(isSort) {
      if(!i || seen != value) {
        res.push(value)
      }
      seen = value
    } else if (res.indexOf(value) == -1) {
      res.push(arr[i])
    }
  }
  return res
}
```

- 5、优化：不区分大小写去重

```
var arr3 = [1, 1, 'a', 'A', 2, 2]

function unique(arr, isSorted, iteratee) {
  var res = []
  var seen = []

  for(var i = 0, len = arr.length; i < len; i++) {
    var value = arr[i]
    var computed = iteratee ? iteratee(value, i, arr) : value

    if(isSorted) {
      if(!i || seen !== value) {
        res.push(value)
      }
      seen = value
    } else if(iteratee) {
      if(seen.indexOf(computed) == -1) {
        seen.push(computed)
        res.push(value)
      }
    } else if(res.indexOf(value) == -1){
      res.push(value)
    } 
  }

  return res
}

console.log(unique(arr3, false, function(item){
  return typeof item == 'string' ? item.toLowerCase() : item
})); 
```

- 6、filter

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  var res = arr.filter((item, index, arr) => {
    return arr.indexOf(item) == index
  })

  return res
}

console.log(unique(arr))
```

**filter实现排序去重**

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  return arr.concat().sort().filter((item, index, arr) => {
    return !index || item !== arr[index - 1]
  })
}
console.log(unique(arr))
```

- 7、Object键值对

该方法可以使用一个空的Object对象，将数组的value作为object的key值， obj[value] = true

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  var obj = {}

  return arr.filter((item, key, arr) => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}
console.log(unique(arr)) // [1, 2]

```

这个时候1和'1'是不同的，但是会被判断为同一个值,这是因为**对象的属性只能是字符串**,使用typeof item + item作为key值

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  var obj = {}

  return arr.filter((item, key, arr) => {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}

console.log(unique(arr)) // [1, 2, '1']
```

- 8、ES6的Set和Map数据类型

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  return Array.from(new Set(arr))
}

console.log(unique(arr))
```

```
function unique(arr) {
  return [...new Set(arr)]
}
```

```
var unique = (a) => [...new Set(a)]
```

使用Map数据类型

```
var arr = [1, 1, 2, 1, '1']

function unique(arr) {
  const seen = new Map()
  return arr.filter(a => !seen.has(a) && seen.set(a, 1))
}

console.log(unique(arr))
```

**注意**

```
var arr = [1, 2, NaN]
arr.indexOf(NaN) // -1

这是因为indexOf的底层就是 === ，NaN === NaN为false，所以indexOf是找不到NaN的
```

**js中的特殊类型判断**

```
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
```

### 27、