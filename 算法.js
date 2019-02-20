/**
 * 判断一个变量是对象还是数组
 * @param {变量} value 
 */
function isObjArray(value) {
  if(Object.prototype.toString.call(value) === '[object Array]') {
    console.log('value是数组')
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    console.log('value是对象')
  } else {
    console.log('value不是对象和数组')
  }
}

/**
 * 冒泡排序（两两比较）
 */
function bubleSort(arr) {
  var len = arr.length
  for(let outer = len; outer >= 2; outer--) {
    for(let inner = 0; inner <= outer - 1; inner++) {
      if(arr[inner] > arr[inner + 1]) {
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]]
      }
    }
  }
  return arr
}

/**
 * 选择排序（遍历自身元素以后的元素，最小的元素和自己调换位置）
 */
function selectSort(arr) {
  var len = arr.length
  for(let i = 0; i < len - 1; i++) {
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

/**
 * 插入排序（将元素插入到已经排序好的数组中）
 */
function insertSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    for(let j = i; j > 0; j--) {
      if(arr[j] < arr[j -1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      } else {
        break;
      }
    }
  }
  return arr
}

/**
 * 快速排序
 */

function quickSort(arr) {
  if(arr.length <= 1) {
    return arr
  }

  var left = [], right = [], current = arr.splice(0, 1)
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(current, quickSort(right))
}

/**
 * 菲波那切数列
 */
function cStairs(n) {
  if(n == 1 || n == 2) {
    return 1
  } else {
    return cStairs(n - 1) + cStairs(n - 2)
  }
}

function fib(num) {
  var a = 0, b = 1, arr = [0, 1]
  while(arr.length < num) {
    [a, b] = [b, b + a]
    arr.push(b)
  }
  return arr
}

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


/**
 * 数组去重：双重循环
 */

Array.prototype.unique = function() {
  const newArray = []
  let isRepeat
  for(let i = 0; i < this.length; i++) {
    isRepeat = false
    for(let j = 0; j < newArray.length; j++) {
      if(this[i] === newArray[j]) {
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

Array.prototype.unique1 = function() {
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

Array.prototype.unique2 = function () {
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

/**
 * 数组去重： indexOf
 */
Array.prototype.unique = function() {
  return this.filter((item, index) => {
    return this.indexOf(item) === index
  })
}

Array.prototype.unique1 = function() {
  const newArray = []
  this.forEach(item => {
    if(newArray.indexOf(item) === -1) {
      newArray.push(item)
    }
  });
  return newArray
}

/**
 * 数组去重： 先排序之后去重
 */

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

/**
 * 数组去重：includes
 */

Array.prototype.unique = function() {
  const newArray = []
  this.forEach(item => {
    if(!newArray.includes(item)) {
      newArray.push(item)
    }
  })
  return newArray
}

/**
 * 数组去重： reduce
 */
Array.prototype.unique = function() {
  return this.sort().reduce((init, current) => {
    if(init.length == 0 || init[init.length - 1] !== current) {
      init.push(current)
    }
    return init
  }, [])
}

/**
 * 数组去重： Map
 */
Array.prototype.unique = function() {
  const newArray = []
  const tmp = new Map()
  for(let i = 0; i < this.length; i++) {
    if(!tmp.get(this[i])) {
      tmp.set(this[i], 1)
      newArray.push(this[i])
    }
  }
  return newArray
}


Array.prototype.unique = function() {
  const tmp = new Map()
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1)
  })
}

/**
 * 数组去重： Set
 */
Array.prototype.unique = function() {
  const set = new Set(this)
  return Array.from(set)
}

Array.prototype.unique = function() {
  return [...new Set(this)]
}

/**
 * 翻转一个字符串
 */
function reverseStr(str) {
  return [...str].reverse().join('')
}

/**
 * 数据类型判断
 */
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


/**
 * XHR的底层原理
 */

function ajax() {
  var xmlHttp
  if(window.XMLHttpRequest) {
    xmlHttp = window.XMLHttpRequest
  } else {
    xmlHttp = ActiveXObject('Microsoft.XMLHTTP')
  }

  // 判断执行状态
  xmlHttp.onreadystatechange = function() {
    /**
     * readyState:
     *  0: 请求未初始化
     *  1: 服务器连接已建立
     *  2: 请求已接收
     *  3: 请求处理中
     *  4: 请求已完成，且响应已就绪
     * 
     * status:
     *  200: 请求成功 
     *  404: 资源未找到
     *  500: 服务器内部错误
     */

    if(xmlHttp.readyState === 4 && xmlHttp.status == 200) {
      document.getElementById('myDiv').innerHTML = xmlHttp.responseText
    }

  }
  xmlHttp.open('GET', url, true)

  // 设置头部信息
  xmlHttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")

  // 将消息发送到服务器
  xmlHttp.send()
}

/**
 * js事件机制
 */

var EventUtil = {
  addHandler: function(element, type, handler) {
    if(element.addEventListener) { //webkit ff
      element.addEventListener(type, handler)
    } else if(element.attachEvent) { // ie
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },  
  removeHandler: function(element, type, handler) {
    if(element.removeEventListener) {
      element.removeEventListener(type, handler)
    } else if(element.detachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  }
}

/**
 * 使用Promise的实例
 */

function fun1(resolve, reject) {
  setTimeout(() => {
    console.log('执行步骤1')
    resolve(1)
  }, 500)
}

function fun2(resolve, reject) {
  setTimeout(()=> {
    console.log('执行步骤2')
    resolve(2)
  }, 100)
}

new Promise(fun1).then(val => {
  console.log(val)
  return new Promise(fun2)
}).then(val => {
  console.log(val)
  return 333
}).then(val => {
  console.log(val)
})

/**
 * 实现查询字符串的解析
 */
function parseQueryString() {
  var str = location.search;
  str = str.substring(1,str.length);
  
  var arr = str.split("&");
  var obj = new Object();
  
  for(var i = 0; i < arr.length; i++) {
      var tmp_arr = arr[i].split("=");
      obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj;
}

function searchToObject(str) {
  if(str === undefined) return
  str = str.substr(1)
  var arr = str.split('&'),
  obj = {},
  newArr = []
  arr.map(item => {
    newArr = item.split('=')
    if(newArr[0] != undefined) {
      obj[newArr[0]] = newArr[1]
    }
  })
  return obj
}

var str1 = '?query=js代码片段&type=all'
searchToObject(str1)

/**
 * 如何计算出字符串中各个字符的数量
 */

function count(str) {
  if(!str || str.length == 0) {
    return 
  }

  let hash = {}
  for(let i = 0; i < str.length; i++) {
    if(!hash[str[i]]) {
      hash[str[i]] = 1
    } else {
      hash[str[i]]++
    }
  }

  return hash
}

var str = 'aaabbtddjaajtt'
count(str)

/**
 * 将字符串的首字母编程大写
 */
function upperCaseFirst(str) {
  str = str.tirm()

  if(!str.length) return str
  if(str.length == 1) {
    return str.toUpperCase()
  }

  return str.substr(0,1).toUpperCase() + str.substr(1)
}

/**
 * 格式化时间
 * 
 * @param {Date} time 时间Date对象
 * @param {string} fmt 时间格式标识符 y M d h m s q S
 */
function format(time, fmt) {
  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    
  }
}