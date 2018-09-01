##一个 material 设计风格的 Cnode项目

---
### 1. 为什么要开发这样一个项目？
> 在学习 **react， redux** 的过程中，看文档总是一知半解， 学习进度也很慢。学习 **React** 只看文档，不实践那并不能掌握 **redux** 的使用方法，看过的东西很快就忘了。所以才动手写一个项目巩固自己所学的知识。**cnode** 社区本身开放了api和源码，网上也有很多类似的实现，只要看社区的接口文档就可以写出一个漂亮的项目。在开发的过程中也参考了一些优秀项目的源码和页面UI设计。**感谢 cnode 社区的贡献 🙏🙏**

### 2. 使用哪些技术？
- **React v16.4**
- **React-Router-Dom** 路由跳转
- 使用 **Redux** 管理组件状态， **Redux-thunk** 中间件解决异步问题， **Redux-form** 更好的处理表单
- 页面风格使用 **Material UI** 

### 3. 项目预览
- 在线链接：

[https://riyueweiyi.github.io/cnode/#/](https://riyueweiyi.github.io/cnode/#/)
最好用Chrome手机模式打开

- 手机扫描二维码：
 ![二维码](https://www.zybuluo.com/static/img/logo.png)

### 4. 如何运行本项目？
>cnode项目是使用[Create React App](https://github.com/facebookincubator/create-react-app)工具生成的项目结构，更多功能请参考官方文档。

```
    git clone https://github.com/riyueweiyi/cnode.git
    cd cnode // 切换到项目目录
    yarn // 执行yarn命令安装依赖
    yarn start // 启动开发环境
    yarn build // 生产环境构建
```
### 5. 总结一下

* 使用 **xhr** 对象实现了一个简洁版的 **Ajax**，通过返回 **Promise** 支持 **async await** 特性和链式调用。
* 页面完全是自己设计的，为了能够很好的效果，参考了 **知乎**，**豆瓣** 等APP应用的交互。
* 通过 **onbeforeunload** 事件来监听页面刷新或关闭，把用户浏览帖子的位置信息存入本地存储。实现了用户刷新或后退之后恢复到上一次浏览位置，但是用户刷新/返回一次性会加载上一次浏览的所有数据。
* 一些和后端简单的请求交互，比如点赞，收藏，回复功能没必要放在redux里增加复杂度。

### 6. todo

* 完善页面 **入场/出场** 动画及交互
* **redux** 代码有些冗余，进一步优化重构

---

感谢您的对本项目的关注！祝您Happy Coding！🤓

作者 ☞ [@riyueweiyi](https://github.com/riyueweiyi) 

