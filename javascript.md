### 1、get方法的传参长度的误区

* http协议没有限制get/post请求的长度限制
* GET请求的传参长度是因为浏览器和web服务器限制了URL的长度
* 不同的浏览器和web服务器的传参长度不同
* 支持IE， 最大的长度是2083byte, 支持chorme，最大长度是8182byte

### 2、get/post请求的区别

* get类似于查找的过程，用户获取数据，，可以不用每次与数据库连接，所以可以使用缓存
* post不同，一般是删除和增加操作，必须与数据库交互，所以不能使用缓存

### 3、闭包

* 闭包是能够读取其他函数内部变量的函数，或是子函数在外部调用，父函数的作用域不会被释放

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

##### addEventListen(事件名， 事件处理函数， Boolean) 
* true表示在事件的捕获阶段调用处理函数 
* false表示在事件冒泡阶段调用处理函数


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


### 12、Promise的执行过程

#### promise存在3种状态： pending(进行中) fulfilled(已成功) rejected(已失败)

