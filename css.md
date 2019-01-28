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

### 8、 