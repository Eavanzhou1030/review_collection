### 1、 flex布局

传统的布局方式是基于盒模型的，依赖 **display** 属性 + **position** 属性 + **float**属性

#### flex布局的元素称为flex容器，容器中的成员叫做项目

容器的属性： 

* flex-direction: row | row-reverse | column | column-reverse 主轴的方向

* flex-wrap: nowrap | wrap | wrap-reverse 是否换行

* flex-flow: flex-direction和flex-wrap的简写 flex-direction || flex-wrap

* justify-content: flex-start | flex-end | center | space-between | space-round 项目在主轴上的对齐方式(两端对齐，项目两侧间隔相等)

* align-item: flex-start | flex-end | center | baseline | strech 项目在交叉轴上的对齐方式(项目的第一行文字的基线为主， 如果项目未设置高度或是设为auto，将占满整个容器的高度)

* align-content: flex-start | flex-end | center | space-between | space-round | stretch 多根轴线的对齐方式

项目的属性： 

* order: 项目的排列顺序， 数值越小， 排列越靠前， 默认值是0

* flex-grow: 定义项目的放大比例，默认值是0，存在剩余的空间也不放大, 所有项目的flex-grow为1,表示将等分剩余空间

* flex-shrink: 定义项目的缩小比例，默认值是1,即空间不足的时候，该项目会缩小，第一个项目是0，其他的项目是1，空间不足的时候前者不缩小，负值对该属性无效
 
* flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，根据这个属性，计算主轴上是否有多余的空间， auto即为项目的本来大小

* flex: flex-grow flex-shrink flex-basis的简写，默认值是0 1 auto， auto（1 1 auto） | none（0 0 auto）

* align-self: 单个项目与其他项目不一样的对齐方式,auto表示继承align-items的属性，如果没有父元素，则等同于stretch

### 2、盒子模型

* IE盒子模型： width = content.width + padding + border

* 标准的盒子模型： width = content.width 

```
box-sizing: border-box | content-box | padding-box

border-box: content + padding + border

content-box: content

padding-box: content + padding
```

### 3、link标签和import标签的区别

* link属于html标签，import属于是css引入

* 页面被加载时，link会同时被加载，而@import加载的css会等到页面加载结束之后加载

* link是HTML标签，所以没有兼容性问题， @import只有IE5以上才能识别

* link的样式权重高于@import的


### 4、BFC（块级格式化上下文，用于清除浮动，防止margin重叠等）
链接： https://www.cnblogs.com/libin-1/p/7098468.html

块级格式化上下文： 一个独立的渲染区域，其中的元素布局不会受外界的影响

* BFC区域不会与float box重叠

* BFC是页面上一个独立的容器，子元素不会影响到外面

* 计算BFC的高度时，浮动元素也会参与计算

会生成BFC的元素：

* 根元素

* float不会none的元素

* position为fixed和absolute的元素

* display为inline-block、table-cell、table-caption、flex、inline-flex的元素

* overflow不为visible的元素

BFC可以做什么：

* 利用BFC防止外边框折叠：将元素放在不同的BFC中，可以避免发生外边距

* BFC包含浮动：是浮动元素的父容器高度被撑高（给父元素添加上overflow:hidden的样式）

* 使用BFC避免文字环绕： 盒子会重叠在BFC元素的下面，但是文字会移位，解决方法是新建一个BFC

* 在多列布局中使用BFC，避免最后一列移出发到最后一行

### 5、垂直居中的方法

* margin: auto的方法

```
  div {
    width: 50px;
    height: 50px;
    position: relative;
    border:2px solid #ccc
  }
  img {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
```

* margin负值法：

```
  .container {
    width: 500px;
    height: 500px;
    position: relative;
    border: 1px solid #ccc;
  }

  .inner {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -100px;
  }
  
  <!--另一种解决方案-->
  .inner {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%)
  }
```

* table-cell(未脱离文档流的方式)

```

div {
  width: 300px;
  height: 300px;
  border: 2px solid #ccc;
  display: table-cell;
  vertical-align: middle;
  text-align: center
}
img {
  vertical-align: middle
}
```

* 利用flex

```
  .container {
    width: 500px;
    height: 300px;
    border: 2px solid #ccc;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justofy-content: center;
    justify-content: center;
  }
```

### 6、块级元素和行内元素

* 块级元素： 独占一行，并且会自动填满父元素，可以设置margin和padding以及宽度和高度

* 行内元素： 不会独占一行， 宽度和高度会被忽略，并且垂直方向上的padding和margin会丢失

### 7、 多行文本省略号

```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

### 8、 前端性能优化

* 1、对高频触发的事件进行节流和消抖,减少触发的频率（resize, scroll和touchmove事件进行节流和防抖）

* 

### 9、 前端静态资源的缓存及优化

对于页面中的静态资源(html/js/css/img/webfont),理想中的效果：

* 页面以最快的速度获取所有需要的静态资源，渲染飞快

* 服务器上的静态资源未更新时，再次访问不请求服务器

* 服务器上的静态资源更新时请求服务器更新资源，加载又飞快

总结一下就是两个指标：

* （1）静态资源的加载速度， **最直接的方法就是对静态资源进行缓存，缓存也是减少了请求的带框和服务器的压力**

* （2）页面的渲染速度





### 10、响应式的常用解决方法对比（媒体查询，百分比，rem和vw/vh）

- 1、像素：像素是网页布局的基础，一个像素表示计算机屏幕所能显示的最小区域，像素一般是分为css像素和物理像素

  * css像素：为web开发者提供的，在css中使用的是一个抽象的概念

  * 物理像素： 只与设备的硬件密度有关，相同尺寸的屏幕，设备密度越高，物理像素也就越多，任何设备的物理像素都是固定的

- 2、媒体查询

  在不同端的设备下，在1css像素锁表示的物理像素是不同的，因此通过一套样式是不可能实现各端的自适应，媒体查询通过@media针对不同的媒体类型定义不同的样式

  ```
  @media screen and (max-width: 960px) {
    body {
      background: red
    }
  } 

  @media screen and (max-width: 678px) {
    body {
      background: blue
    }
  }
  ```

  通过媒体查询，可以通过不同的分辨率的设备编写不同的样式来实现响应式布局，比如针对不同的分辨率的屏幕设置，不同的背景图片，比如小屏幕的手机设置@2x
  图，大屏幕的手机设置@3x图，但是媒体查询的缺点很明显，浏览器大小改变时，改变的样式太对

- 3、百分比

  浏览器的宽度或是高度发生变化的时候，通过百分比单位使得组件的宽度和高度可以随着浏览器的变化而变化，从而实现响应式的效果

  * （1）子元素的height和width的百分比

      子元素中的height和width百分比，是相对于子元素中的直接父元素，width是相对于父元素的width，height是相对于父元素的height

      ```
        <div class="father">
          <div class="child"></div>
        </div>

        .father {
          width: 500px;
          height: 500px
        }

        .child {
          width: 50%; // 250px
          height: 50%; // 250px
        }
      ```
  * （2）top和bottom、left和right

    子元素的top和bottom设置百分比，则相当于非static定位(默认定位)的父元素的高度，同样left/right如果设置百分比，也是相对于非static定位(默认定位)的父元素的宽度

  * （3）padding

    子元素的padding如果设置百分比，无论是 **垂直方向还是水平方向，都是相对于父元素的width，而与复原度的height没有关系**

    ```
      .parent {
        width: 200px;
        height: 100px;
        background: green;
      }

      .child {
        width: 0px;
        height: 0px;
        background: blue;
        color: white;
        padding-top: 50%;
        padding-lef: 50%;
      }
    ```
    子元素的初始化宽高是0，通过padding将父元素撑大，上图显示一个正方形，边长是100px， **说明padding不论宽高，如果设置百分比都是相对于父元素的width**

  * （4）margin

    margin和padding一样，设置百分比的时候，无论水平方向还是垂直方向，都是相对于父元素的width
  
  * （5）border-radius

    border-radius设置百分比，是相对于自身的宽度，**除了border-radius外，还有比如是translate、background-size等都是相对于自身**

    ```
      <div class="target"></div>

      .target {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: blue;
        margin-top: 10px;
      }
    ```

    **百分比在布局中的应用**

    要实现一个固定宽高比的长方形，比如要实现一个长宽比是4:3的长方形，我们可以根据padding属性来实现，因为padding不管是水平方向还是垂直方向，百分比都是相对于父级元素的宽度，因此可以设置padding-top为百分比来实现，长宽自适应的长方形

    ```
    <div class="trangle"></div>

    .trangle {
      height: 0;
      width: 100%;
      padding-top: 75%;
    }
    ```

    **百分比的缺点**

    (1)计算困难，如果我们定义一个元素的宽度和高度，按照设计稿，必须转换成百分比

    (2)各个属性中使用百分比，相对于父元素的属性并不是唯一的。比如width和height相对于父元素的width和height，而margin、padding不管垂直还是水平方向都相对比父元素的宽度、border-radius则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

- 4、自适应场景下的rem解决方案

  rem单位无论嵌套如何，都只相对于浏览器的根元素（HTML元素）的font-size,默认情况下，html元素的font-size为16px

  ```
    1 rem = 10px

    html {
      font-size: 62.5%; 
    }
  ```

  ```
  function refreshRem() {
    var docEl = doc.documentElement
    var width = docEl.getBoundingClientRect().width
    var rem = width / 10
    docEl.style.fontSize = rem + 'px'
    flexible.rem = win.rem = rem
  }
  win.addEventListener('resize', refreshRem)
  ```
   
  **rem2px和px2rem**

  px2rem的原理比较简单，主要方法有两个：

  （1）webpack loader的方式： npm install px2rem-loader

  （2）webpack中使用postcss plugin: npm install postcss-loader

  **rem布局的缺点**

  在响应式布局中，必须通过js动态控制根元素font-size的大小

- 5、通过vm/vh实现自适应

css3中引入了一个新的单位vw/vh，与视图窗口有关，vw表示相对于视图窗口的宽度，vh表示相对于视图窗口的高度，处理vm和vh之外，还有vmin和vmax两个相关单位

* vw：相对于视窗的宽度，视窗的宽度是100vw

* vh：相对于视窗的高度，视窗的高度是100vh

* vmin：vw和vh中较小值

* vmax：vw和vh中较大值

**百分比和vw/vh的区别**
 
  * %：是相对于祖先元素，或是本身

  * vw/vh：是相对于视窗的大小

  **vw和vh的兼容性问题**

  ie9-11不支持vmin和vmax，opera整体上不支持vw和vh
