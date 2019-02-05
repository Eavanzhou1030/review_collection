### 1、drap api

* dragstart: 事件主体是被拖放的元素，在开始拖放被拖放元素是触发

* drag： 事件主体是被拖放的元素，在正在拖放被拖放元素时触发

* dragenter: 事件主体是目标元素，在被拖放元素进图某元素时触发

* dragover: 事件主体是目标元素，在被拖放在某元素内移动时触发

* dragleave：事件主体是目标元素，在被拖放的元素移出目标元素时触发

* drop：事件主体是目标元素，在目标元素完全接受被拖动元素时触发

* dragend: 事件主体是被拖动元素，在整个拖放操作结束时触发

### 2、iframe

- （1）定义：iframe元素会创建包含另一个文档的内联框架

- （2）提示：可将提示的文字放在iframe标签之间，用来提示某些不支持iframe的浏览器

- （3）缺点:

  * 会阻塞页面的onload事件

  * 搜索引擎无法解读这种页面，不利于SEO

  * iframe和主页面之间共享连接池，而浏览器对相同区域有所限制所以导致性能

### 3、doctype作用？严格模式和混杂模式如何区分？他们有何意义？

Doctype声明于文档的前面，告诉浏览器以何种方式渲染页面，这里有两种模式，严格模式和混杂模式

* 严格模式的排版和js的运行模式是以浏览器的最高标准来运行的

* 混杂模式，向后兼容，模拟老式浏览器，防止浏览器不能兼容页面

### 4、meta标签有哪些？

用法：http://www.cnblogs.com/qiumohanyu/p/5431859.html

meta标签是html文档在head标签中定义的一个文档进行描述的功能性标签

meta标签的作用是：

* 搜索引擎优化(SEO)

* 定义页面使用的语言

* 自动刷新并指向新的页面

* 实现网页转换时的动态效果

* 控制页面缓存

* 网页定级评价

* 控制网页的显示窗口

meta标签的组成：两个属性，http-equiv属性和name属性

- 1、name属性

name属性用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的，name属性值有以下几种参数：

* keywords:关键字

* description: 网站内容描述

* robots: 机器人向导

* author: 作者

* render: 渲染

* viewport: 视图模式

- 2、http-equiv属性

http-equiv属性相当于http文件头的作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，主要的参数值有：

* X-UA-Compatible(浏览模式)

* Expires(期限)

* Pragma(cache模式)

* Refresh(刷新)

* Set-Cookie(cookie设定)

* Window-target(显示窗口的设定): 强制页面在当前窗口以独立页面显示

* Content-Type(显示字符集的设定)

* Content-Language(显示语言的设定)

* Content-Control(制定请求和响应遵循的缓存机制)