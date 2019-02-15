### 1、http和https,https的SSL加密还是在传输层实现的

- （1）http和https的基本概念

  * http: 超文本传输协议，是互联网上最为广泛的一种传输协议，是一个客户端和服务器请求和应答的标准(TCP),用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以是网络传输更加高效，是网络传输减少。
  （http的底层是基于TCP/IP的关于数据如何在万维网中如何通信的协议）

  * https: 以安全为目标的HTTP通道，简单的说就是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内就需要SSL。https的主要作用是建立一个信息安全通道，来确保数据的传输，确保网站的真实性

- （2）http和https的区别？

  * https协议需要ca证书，费用较高

  * htpp是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议

  * 使用不同的链接方式，端口不同，一般而言，http协议的端口是80，https协议的端口是443

  * http协议的链接很简单，是无状态的，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输，身份认证的网络协议，比http协议安全

- （3）https协议的工作原理

  * 客户使用https url访问服务器，则要求web服务建立ssl链接

  * web服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或者说传输给客户端

  * 客户端和web服务器开始协商SSL链接的安全等级，也就是加密等级

  * 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密密钥，并传输给网站

  * web服务器通过自己的私钥解密出会话密钥

  * web服务器会通过会话密钥加密与客户端之间的通信

- (4)https协议的优点

  * 使用https协议可以认证客户端和服务器，确保数据发送到正确的客户机和服务器

  * htpps协议是通过SSL和HTTP协商构建的可进行加密传输和身份认证的网络协议，要比http协议安全，可防止数据在传输的过程中不被窃取，改变，确保数据的完整性

  * HTTPS是现行架构下最安全的解决方案，虽然不是绝对的安全，但是可以大幅度的增加中间人攻击的成本

- (5)https协议的缺点

  * https的握手过程比较费时，会使页面加载时间延长50%，增加10%~20%的耗电量

  * htpps的缓存不如http高效，会增加数据开销

  * SSL证书需要费用，功能越强大的证书费用越高

  * SSL证书需要绑定IP，不能同一个IP绑定多个域名，IPV4资源支持不了这种消耗

### 2、TCP三次握手

* 第一次握手： sever只能确认client发送报文段

* 第二次握手： client可以确认sever收到自己发送的报文段，并且可以确认自己可以接收sever发送的报文段

* 第三次握手： sever可以确认client收到了自己发送的报文段

### 3、TCP和UDP的区别

* （1）TCP是面向连接的，UDP是无连接的及发送数据之前是不需要建立连接的

* （2）TCP提供可靠的服务，也就是说通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达，UDP是尽最大努力的交付，即不保证可靠的交付。并且因为tcp可靠，面向连接，不会丢失数据因此是个大数据量的交换

* （3）TCP是面向字节流的，UDP是面向报文，并且在网络出现堵塞不会使得发送速率降低（因此会出现丢包，对时实的应用，比如IP电话和视频会议等）

* （4）TCP只支持1对1，UDP可以支持1对1或是1对多

* （5）TCP首部最大有20个字节，UDP只有8个字节

* （6）TCP是面向连接的可靠传输，而UDP是不可靠的

### 4、websocket的实现和应用

* （1）http的生命周期是通过request来界定的，也就是一个request一个response，在http1.1协议中加入了connection:keep-alive,也就是说在一个http连接中可以有多个request和多个response，但是**在http中一个request中一个request只能对应一个response，而且response是被动的，不能主动发起的**

* （2）websocket是基于http协议的，或是说借用http协议来完成一部分握手，在握手阶段和http是相同的，一个websocket协议的实现需要两个属性： upgrade/connection

```
GET /chat HTTP/1.1
Host: sever.example.com
Upgrade: websocket
Connection: Upgrade
Sec-Websocket-Key:x3JJHMbDL1EzLkh9GBhXDw==
Sec-Websocket-Protocol: chat,superchat
Sec-Websocket-Version: 13
Origin: http://example.com
```

```
Upgrade: websocket
Connection: Upgrade
告诉服务器发送的是websocket
Sec-Websocket-Key:x3JJHMbDL1EzLkh9GBhXDw==
Sec-Websocket-Protocol: chat,superchat
Sec-Websocket-Version: 13
```
Sec-Websocket-Key是一个base64 encode的值，这个值是浏览器生成的，验证服务器是不是真的websocket
Sec-Websocket-Protocol是一个用户自定义的字符串，用来区分同URL下，不同的服务所需要的协议
Sec-Websocket-Version告诉服务器当前的协议版本

发送给服务器之后，服务器会返回下面的内容，表示已经接受请求，成功建立websocket了！
**这里开始也是http协议负责的最后区域，之后是完全按照websocket协议进行**

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```
Sec-WebSocket-Accept是经过服务器确认的，并且加密过的Sec-Websocket-Key
Sec-WebSocket-Protocol则是表示最终使用的协议

##### websocket的作用

- 1、ajax轮询： 让浏览器隔几秒就发送一个请求，询问浏览器是否有新的信息

- 2、long poll：原理和ajax轮询的原理差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起连接后，如果没消息，就一直不返回Response给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。

- 3、websocket实现的问题是：当http升级为websocket服务之后，**服务端可以主动推送数据给客户端**

至于怎么在不支持Websocket的客户端上使用Websocket。。答案是： 不能

但是可以通过上面说的 long poll 和 ajax 轮询 来 模拟出类似的效果

### 5、http请求的方式，HEAD方式

* head： 类似于get请求，只不过返回的响应中没有具体的内容，用户获取报头

* options: 允许客户端查看服务器的性能，比如u、服务器支持的请求方式

### 6、web Quality（无障碍）

```
<img src="person.jpg" alt="this is a person">
```
有时候浏览器不能显示图片，具体原因：

* 用户关闭了图像显示

* 浏览器是不支持图形显示的迷你浏览器

* 浏览器是语言浏览器

### 7、http2.0的优势

* 提升访问速度(请求资源所需时间更少，访问速度更快)

* 允许多路复用：就是多个请求可以通过一个TCP连接并发完成，http1.1

* 二进制分帧：http2.0将所有的传输信息分割成更小的信息或是帧，并对他们进行二进制编码(**采用二进制的格式传输数据，而非http1.1的文本格式，二进制在协议的解析和优化扩展上带来了更多的优势和可能**)

* 对消息头使用HPACK进行压缩传输，能够节省消息头占用的网络流量，而http1.1每次请求，都会携带大量冗余的头部信息，浪费很多的带宽资源

* 服务器端推送

### 8、补充400/401/403状态码

- 1、 400状态码：请求失效
  
  产生的原因：

  * 前端提交数据的字段名称和字段类型与后台的实体没有保持一致

  * 前端提交到后台的数据应是json字符串类型，但是前端没有将对象JSON.stringify转化为字符串

  解决的方法：

  * 对照字段的名称，保持一致性

  * 将obj对象通过JSON.stringify实现序列化

- 2、401状态码：当前请求需要用户验证

- 3、403状态码：服务器已经得到请求，但是拒绝执行

### 9、fetch发送两次请求的原因

fetch发送post请求的时候，总是需要发送两次，第一次的状态码是204，第二次才能成功？

发送post请求的时候，第一次会先发送一个options请求，询问服务器是否支持修改请求头，如果服务器支持，则在第二次中发送真正的请求

### 10、cookie、session、sessionStorage、localStorage的区别

共同点：都是保存在浏览器端，并且都是同源的

* cookie：cookie数据总是在同源的http请求中携带（即使不需要），即cookie在浏览器和服务端之间来回传递，而sessionStorage和localStorage不会将数据发送给服务器，仅在本地保存。cookie数据还有路径的改变(path)的概念，可以限制cookie只属于在某个路径下，存储的容量很小，只有4k左右 **可以在浏览器和服务器之间来回传递，存储容量很小，大约只有4k左右**

* sessionStorage: 尽在当前的浏览器关闭之前有效，localStorage是一直有效，cookie只在设置的过期时间之前有效，即使窗口或是浏览器关闭了 **本身就是一个回话过程，关闭浏览器之后消失**

* localStorage: localStorage在所有的同源窗口中都是共享的 **同源窗口都会共享，并不会失效，不过窗口或是浏览器关闭都始终有效**

**cookie、sessionStorage、localStorage是在客户端的，session是保存在服务器端的，服务器端的session机制，session对象的数据保存在服务器上，实现上，服务器，服务器和浏览器只见那仅需传递session id即可，服务根据session id找到对应的session对象，会话数据仅在一段时间内有效，这个时间就是server设置的session的有效期，服务器session存储数据安全一些，一般存放用户数据，浏览器只适合存储一般数据**

### 11、web Storage带来的好处

* 减少网络流量： 一旦数据保存到本地之后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器之间不必要的来回传递

* 快速显示数据：性能好，从本地读取数据比通过网络服务器获取数据快很多，本地数据可以及时获取，再加上网页本身也可以缓存，因此整个页面和数据都在本地的话，可以立即显示。

* 临时存储：很多时候只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用sessionStorage非常方便。

### 12、cookie的作用：

  * 保存用户登录信息：将用户的id存储在一个cookie中，这样用户下次访问页面的时候就不需要登录了

  * 跟踪用户行为：比如跟踪上一次用户选择的地区的天气预报

  * 定制页面：如果网站提供换肤或是更换布局的功能，可以使用cookie来记录用户的选项

### 13、cookie如何防止xss攻击

XSS（跨脚本攻击）是指攻击者在返回的HTML中嵌入JavaScript脚本，为了减轻这些攻击，需要在http头部配上，set-cookie:

* httponly： 这个属性可以防止xss，他会禁止JavaScript脚本访问cookie

* secure: 这个属性会告诉浏览器只在https请求的时候发送cookie

### 14、http的请求方法

| 请求方法 | 方法作用 | 
| ------ | ------ |
| GET | GET请求会显示请求指定的资源，一般用于数据资源的读取操作，在url末尾可以追加查询字符串，请求的body中只能显示少量的数据，依据浏览器和服务器的不同而不同  |
| POST | 主要用来向服务器新增数据，请求的主体理论上可以包含任意多条数据 |
| HEAD | HEAD方法和GET方法一样，只是不返回报文的主体部分，主要用于确认url的有效性以及资源更新的日期时间。判断类型、查看响应中的状态码，测试资源是否被修改过，查看服务器的性能 | 
| PUT | 用于传输文件，在请求的报文主体内容中会包含文件内容，保存到请求的URL的指定位置，http1.1的put方法自身不带验证机制，任何人可以请求，上传文件，会有请求问题 |
| DELETE | 删除服务器上的某个资源 |
| OPTIONS | 查询服务器支持的请求方法 | 
| TRACE | 可以对请求消息的传输路径进行追踪 | 
| CONNECT | 要求与代理服务器通讯的时候建立隧道，实现用隧道协议进行tcp通信。主要使用ssl（安全套接层）和tls（传输层安全）协议把通信内容加密后经网络隧道传输 |
| PATCH | 与PUT请求类似，同样用于资源的更新，但有两点不同，(1)PATH一般用于资源的部分更新，而PUT用于资源的整体更新(2)当资源不存在的时候，PATH会创建一个新的资源，PUT只会对存在的资源进行更新 |

