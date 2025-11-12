/**
 * - 中间件：对请求进行预处理，上一个中间件的输出会作为下一个中间件的输入
 * - 中间件的分类：
 * 1. 应用级别的中间件
 * 2. 路由级别的中间件
 * 3. 错误级别的中间件
 * 4. 内置的中间件
 * 5. 第三方中间件
 */

import express from "express";

const app = express();

// 1. 中间件的本质就是一个function函数，它有三个参数：req, res, next
// next()函数是用来调用下一个中间件的，如果当前中间件没有调用next()函数，则不会执行下一个中间件
// app.use注册全局生效的中间件
app.use((req, res, next) => {
  console.log("中间件1");
  next();
});

app.get("/get", (req, res, next) => {
  console.log("中间件2");
});

// 2. 中间件作用
// 多个中间件之间，共享同一份req和res，基于这样的特性，我们可以在上游的中间件中，统一为req和res对象添加自定义的属性或方法，供下游的中间件或者路由进行使用
app.use((req, res, next) => {
  console.log("中间件2");
  req.msg = "hello";
  next();
});

app.get("/get2", (req, res, next) => {
  console.log("路由");
  console.log(req.msg);
  res.send(req.msg);
});

// 3. 局部生效的中间件,多个的时候可以写成数组的形式/使用逗号隔开
app.get(
  "/get3",
  (req, res, next) => {
    console.log("中间件3");
    req.msg = "hello2";
    next();
  },
  (req, res) => {
    console.log("路由2");
    res.send(req.msg);
  }
);

// 4. 错误级别的中间件
app.get("/error", (req, res, next) => {
  console.log("错误中间件");
  throw new Error("错误");
  // 不会执行到这里，只要throw new Error("错误")，就会执行错误级别的中间件
  res.send("错误");
});

app.use((err, req, res, next) => {
  console.log("错误中间件");
  res.status(500).send(err.message);
});

// 5. 内置的中间件
app.use(express.static("public")); // 快速托管静态资源
app.use(express.urlencoded({ extended: false })); // 解析表单数据
app.use(express.json()); // 解析JSON数据

// 5.1 解析JSON数据的中间件
app.use(express.json()); // 解析JSON数据,并且挂载到req.body上,如果不配置解析表单数据，则req.body为空对象
app.post("/post3", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// 5.2 解析表单数据的中间件
app.use(express.urlencoded({ extended: false })); // 解析表单数据,并且挂载到req.body上,如果不配置解析JSON数据，则req.body为空对象
app.post("/post4", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// 6. 第三方中间件
import bodyParser from "body-parser";
app.use(bodyParser.json()); // 解析JSON数据
app.use(bodyParser.urlencoded({ extended: false })); // 解析表单数据
// 如果没有配置任何解析表单数据的中间件，则req.body默认等于undefined
app.post("/post5", (req, res) => {
  // 如果没有配置任何解析表单数据的中间件，则req.body默认等于undefined
  console.log(req.body);
  res.send(req.body);
});

// 7. 自定义中间件
// 解析表单数据的中间件，需要使用body-parser中间件
import qs from "querystring"; // Node内置的querystring模块，用于解析URL的查询字符串
app.use((req, res, next) => {
  let str = "";
  req.on("data", chunk => {
    str += chunk;
  });
  req.on("end", () => {
    console.log(str);
    req.body = qs.parse(str);
    next();
  });
  app.post("/post6", (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
});

app.listen(3000, () => {
  console.log("服务器启动成功 http://127.0.0.1:3000");
});
