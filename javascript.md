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
