/**
 * 使用数组平均数
 * 使用reduce()将每个值添加到累加器中，初始值为0，总和除以数组长度
 */
const average = arr => arr.reduce((init, value) => init + value, 0) / arr.length

average([1,2,3])



/**
 * 大写每个单词的首字母
 * 使用replace()匹配每个单词的第一项，并使用toUpperCase()将每个单词变成大写
 */
const capitializeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())
capitializeEveryWord('hello world')



/**
 * 首字母大写
 * lowerRest指定其他字母是否要变成小写
 */
const capitalize = (str, lowerRest) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
capitalize('hello World')



/**
 * 检查回文
 */

const palindrome = str => {
  str = str.toLowerCase().replace(/[\W_]/g, '')
  return str === str.split('').reverse().join('')
}
palindrome('taco cat')



/**
 * 计算数组中值出现的次数
 */
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
countOccurrences([1,3,4,1,6,1], 1)


/**
 * 获取当前的URL
 */
const currentUrl = () => window.location.href


/**
 * 深度打散数组
 */
const deepFlatten = arr => arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), [])

deepFlatten([1, 3, [4, [2, 6], 7], 5])


/**
 * 数组之间的差别
 * 从b中创建一个Set,a通过filter过滤出与b不相同的部分
 */

const difference = (a, b) => {
  var s = new Set(b)
  return a.filter(x => !s.has(x))
}
var a = [1,2,3], b = [1, 2]
difference(a, b)


/**
 * 两点之间的距离
 */
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)


/**
 * 可以按数字整除
 */
const isDivisible = (dividend, divisor) => dividend % divisor === 0


/**
 * 奇数还是偶数
 */
const isEven = num => num % 2 === 0



/**
 * 阶乘
 */
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1)
factorial(4)



/**
 * 斐波那契数组生成器
 */
const fibonacci = (n) => Array(n).fill(0).reduce((init, val, i) => init.concat(i > 1 ? init[i - 1] + init[i - 2] : i), [])
fibonacci(6)



/**
 * 过滤数组中的非唯一值
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
filterNonUnique([1,2,2,3,4,4,5])


/**
 * Flatten数组
 * 使用reduce()来获取数组中的所有元素，并使用concat()来使它们flatten
 */
const faltten = arr => arr.reduce((a, v) => a.concat(v), [])
faltten([1, [2], 3, 4])


/**
 * 获取数组中的最大值
 */
const arrayMax = arr => Math.max(...arr)


/**
 * 获取数组中的最小值
 */
const arrayMin = arr => Math.min(...arr)


/**
 * 获取滚动位置
 */
const getScrollPos = function(el = window) {
  return ({
    x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset: el.scrollTop
  })
}

getScrollPos()


/**
 * 最大公约数
 */
const gcd = (x, y) => !y ? x: gcd(y, x % y)
gcd(8, 36)


/**
 * head of list
 */
const head = arr => arr[0]


/**
 * list初始化
 */
const initial = arr => arr.slice(0, -1)


/**
 * rang初始化数组
 * 使用Array(end - start)创建所需长度的数组，使用map()来填充范围中的所需值，可以省略start使用的默认值0
 */

