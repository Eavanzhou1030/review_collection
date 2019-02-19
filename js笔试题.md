### 1、数组去重

- 1、双层循环

  * 实现1
  ```
  Array.prototype.unique = function() {
    let newArray = []
    let isRepeat = false
    for(let i = 0; i < this.length; i++) {
      isRepeat = false
      for(let j = 0; j < newArray.length; j++) {
        if(this[i] == newArray[j]) {
          isRepeat = true
          break
        }
      }
      if(!isRepeat) {
        newArray.push(this[i])
      }
    }
    return newArray
  }

  ```
  * 实现2
  ```
  Array.prototype.unique = function() {
    const newArray = []
    let isRepeat
    for(let i = 0; i < this.length; i++) {
      isRepeat = false
      for(let j = i + 1; j < this.length; j++) {
        if(this[i] === this[j]) {
          isRepeat = true
          break
        }
      }
      if(!isRepeat) {
        newArray.push(this[i])
      }
    }
    return newArray
  }
  ```
  * 实现3
  ```
  Array.prototype.unique2 = function() {
    const newArray = []
    for(let i = 0; i < this.length; i++) {
      for(let j = i + 1; j < this.length; j++) {
        if(this[i] === this[j]) {
          j = ++i
        }
      }
      newArray.push(this[i])
    }
    return newArray
  }
  ```
- 2、Array.prototype.indexOf()

基本思路：如果索引不是第一个索引，说明重复值

  * 实现1：只将数组元素中第一次出现的返回

  ```
  Array.prototype.unique = function() {
    return this.filter((item, index) => {
      return this.indexOf(item) === index
    })
  }
  ```

  * 实现2

  ```
  Array.prototype.unique = function() {
    const newArray = []
    this.forEach(item => {
      if(newArray.indexOf(item) === -1) {
        newArray.push(item)
      }
    })
    return newArray
  }
  ```
  
- 3、Array.prototype.sort()

基本思路：先对原数组进行排序，然后在进行元素比较

  * 实现1
  ```
  Array.prototype.unique = function() {
    const newArray = []
    this.sort()
    for(let i = 0; i < this.length; i++) {
      if(this[i] !== this[i + 1]) {
        newArray.push(this[i])
      }
    }
    return newArray
  } 
  ```

  * 实现2
  ```
  Array.prototype.unique = function() {
    const newArray = []
    this.sort()
    for(let i = 0; i < this.length; i++) {
      if(this[i] !== newArray[newArray.length - 1]) {
        newArray.push(this[i])
      }
    }
    return newArray
  }
  ```

- 4、Array.prototype.includes()

```
Array.prototype.unique = function() {
  const newArray = []
  this.forEach(item => {
    if(!newArray.includes(item)) {
      newArray.push(item)
    }
  })
  return newArray
}
```

- 5、reduce
```
Array.prototype.unique = function() {
  return this.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length - 1] !== current) {
      init.push(current)
    }
    return init
  }, [])
}
```

- 6、Map

```
Array.prototype.unique = function() {
  const newArray = []
  let tmp = new Map()

  for(let i = 0; i < this.length; i++) {
    if(!tmp.get(this[i])) {
      tmp.set(this[i], 1)
      newArray.push(this[i])
    }
  }
  return newArray
}
```

```
Array.prototype.unique = function() {
  const tmp = new Map()
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1)
  })
}
```

- 7、Set
```
Array.prototype.unique = function() {
  const set = new Set(this)
  return Array.form(set)
}
```

```
Array.prototype.unique = function() {
  return [...new Set(this)]
}
```

### 2、翻转一个字符串
```
function reverseStr(str) {
  return [...str].reverse().join('')
}
```

### 3、数据类型判断

```
var a = 'hello world'
var b = 222
var c = [1, 2, 3]
var d = new Date()
var e = function() {alert(111)}
var f = function() {this.name = '22'}

console.log(Object.prototype.toString.call(a) === '[object String]')
console.log(Object.prototype.toString.call(b) === '[object Number]')
console.log(Object.prototype.toString.call(a) === '[object Array]')
console.log(Object.prototype.toString.call(a) === '[object Date]')
console.log(Object.prototype.toString.call(a) === '[object Function]')
console.log(Object.prototype.toString.call(a) === '[object Function]')
```

### 4、XHR的具体底层原理
```
function ajax() {
  var xmlHttp
  if(window.XMLHttpRequest) {
    xmlHttp = window.XMLHttpRequest
  } else {
    xmlHttp = ActiveXObject('Microsoft.XMLHTTP')
  }

  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      document.getElementById('myDiv').innerHTML = xmlHttp.responseText
    }
  }

  xmlHttp.open('Get', 'url', true)

  <!-- 设置头部信息 -->
  xmlHttp.setRequestHeader('Content-Type', 'applcation/x-www-form-urlencoded')

  xmlHttp.send()
}
```

### 5、js事件机制（IE,谷歌，火狐的区别）
```
var EventUtil = {
  addHandler: function(element, type, handler) {
    if(window.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if(window.attachEvent) {
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },
  removeHandler: function(element, type, handler) {
    if(window.removeEventListener) {
      element.removeEventListener(type, handler, false)
    } else if(window.detachEvent){
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  }
    
}
```

### 6、js的继承方法
http://www.cnblogs.com/humin/p/4556820.html

```
<!-- 先定义一个父类 -->

function Animal(name) {
  this.name = name
  this.sleep = function() {
    console.log(this.name + '正在睡觉')
  }
}
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃' + food)
}
```

- 1、原型链继承：将父类的实例作为子类的原型

```
function Cat() {}
Cat.prototype = new Animal()
Cat.prototype.name = 'cat'

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
cat.eat()
cat.sleep() 
console.log(cat instanceof Cat) // true
console.log(cat instanceof Animal) // true
```
特点：

* 非常纯粹的继承关系，实例是子类的实例也是父类的实例

* 父类增加的原型方法/原型属性，子类都能访问到

* 简单，易于实现

缺点：

* 可以在Cat构造函数中，为Cat实例添加实例属性，如果要新增原型属性和方法，必须放在new Animal这样的语句后面执行

* 无法实现多继承

* 来自原型对象的属性被所有实例共享

* 创建子类实例时，无法向父类构造函数传参

- 2、构造继承：利用父类的构造函数来增强子类实例，等同于复制父类的实例属性给子类（没有用到原型）

```
function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
cat.sleep()
cat.eat()
console.log(cat instanceof Animal) // false
console.log(cat instanceof Cat) // true
```
特点:

* 解决了子类实例共享父类引用属性的问题

* 创建子类实例的时候，可以向父类传递参数

* 可以实现多继承(call多个父类对象)

缺点： 

* 实例并不是父类的实例，只是子类的实例

* 只能继承父类的实例的属性和方法，不能继承原型属性/方法

* 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

- 3、实例继承：为父类实例添加新特性，作为子类实例返回

```
function Cat(name) {
  var instance = new Animal()
  instance.name = name || 'Tom'
  return instance
}

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
cat.eat()
cat.sleep()
console.log(cat instanceof Animal) // true
console.log(cat instanceof Cat) // false
```
特点：

* 不限制调用的方法，不管是new 子类()还是子类()，返回的对象都具有相同的效果

缺点：

* 实例是父类的实例，不是子类的实例

* 不支持多继承

- 4、拷贝继承

```
function Cat(name) {
  var animal = new Animal()
  for(var p in animal) {
    Cat.prototype[p] = animal[p]
  }
  Cat.prototype.name = name || 'Tom'
}

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
cat.sleep()
cat.eat()
console.log(cat instanceof Animal) // false
console.log(cat instanceof Cat) // true
```

特点：

* 支持多继承

缺点： 

* 效率太低，内存占用高(因为要拷贝父类的属性)

* 无法获取父类的不可枚举的方法(不可枚举方法，不能使用for...in访问到)

- 5、组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。

```
function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}
Cat.prototype = new Animal()
<!-- 组合继承也需要修复构造函数的指向 -->
Cat.prototype.constructor = Cat

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
console.log(cat instanceof Animal) // true
console.log(cat instanceof Cat) // true
```

特点：

* 弥补方式2的缺陷，可以继承实例方法/属性，也可以继承原型属性/方法

* 既是子类的实例也是父类的实例

* 不存在引用属性共享问题

* 可传参

* 函数可复用

缺点：

* 调用了两次父类构造函数，生成了两份实例

- 6、寄生组合继承：通过寄生的方式，砍掉父类的实例属性，这样在调用两次父类构造函数的时候就不会初始化两次实例方法/属性，避免组合继承的缺点

```
function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}
(function() {
  <!-- 创建一个没有实例方法的类 -->
  var super = function() {}
  Super.prototype = Animal.prototype
  <!-- 将实例作为子类的原型 -->
  Cat.prototype = new Super()
})()

<!-- test code -->
var cat = new Cat()
console.log(cat.name)
cat.sleep()
cat.eat()
console.log(cat instanceof Animal) //true
console.log(cat instanceof Cat) // true
```

### 7、实现一个完整的Promise

Promise主要是为了解决异步回调的问题，使用Promise来解决异步回调会使得代码层次清晰。

Promise的作用:
```
function fun1(resolve, reject) {
  setTimeout(() => {
    console.log('步骤1：执行')
    resolve(1)
  }, 500)
}

function fun2(resolve,reject) {
  setTimeout(() => {
    console.log('步骤2：执行')
    resolve(2)
  }, 100)
}

new Promise(fun1).then(function(val) {
  console.log(val)
  return new Promise(fun2)
}).then(function(val){
  console.log(val)
  return 33
}) .then(val => {
  console.log(val)
})
```

**实现一个完整的Promise**
```
function Promise(fn) {
  var callback
  this.then = function(done) {
    callback = done
  }

  function resolve() {
    callback()
  }
  fn(resolve)
}
```
### 8、实现一个new实例对象的过程
```
function create() {
  let obj = new Object()
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}
```
运算符的优先级

```
function Foo() {
  return this
}

Foo.getName = function() {
  console.log(1)
}

Foo.prototype.getName = function() {
  console.log(2)
}

new Foo.getName() // 1
new Foo().getName() //2


new (Foo.getName());
(new Foo()).getName();
```
对于第一个函数来说，先执行了 Foo.getName() ，所以结果为 1；对于后者来说，先执行 new Foo() 产生了一个实例，然后通过原型链找到了 Foo 上的 getName 函数，所以结果为 2。

### 9、instanceof

instanceof可以正确的判断对象的类型，因为内部机制是通过判断实例对象的原型链上是否存在其构造函数的prototype属性

```
function instanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while(true) {
    if(left == null) {
      return false
    }
    if(prototype == left) {
      return true
    }
    left = left.__proto__
  }
}
```

### 9、深拷贝、浅拷贝
```
let a = {
  age: 1
}

let b = a
b.age = 3
console.log(a.age) // 3
```

- 1、浅拷贝

* Object.assign()

```
let a = {
  age: 1
}

let b = Object.assign({}, a)
a.age = 3
console.log(b.age) // 1
```

* 展开运算符(...)

```
let a = {
  age: 1
}

let b = {...a}
a.age = 2
console.log(b.age) // 1
```

- 2、深拷贝

* JSON.parse(JSON.stringify(object))

```
var  a = {
  age: 1,
  jobs: {
    first: 1
  }
}
var b = {...a}
a.jobs.first = 4
console.log(b.jobs.first) // 4

```

```
var  a = {
  age: 1,
  jobs: {
    first: 1
  }
}

var b = JSON.parse(JSON.stringify(a))
a.jobs.first = 3
console.log(b.jobs.first) // 1
```