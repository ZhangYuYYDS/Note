import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("import.meta.url", import.meta.url); // 当前文件的url
console.log("__filename", __filename); // 当前文件的绝对路径
console.log("__dirname", __dirname); // 当前文件的目录

const app = express();

// 监听get请求,获取url中的请求参数
app.get("/get", (req, res) => {
  // 1. 获取url中的请求参数(http://127.0.0.1:3000/get?name=张三&age=18)
  // req.query默认是个空对象，返回形式是对象
  // 返回结果：{ name: '张三', age: '18' }
  const query = req.query;
  console.log(query);
  // 发送响应数据
  res.send({
    code: 200,
    message: "get请求成功",
    data: query,
  });
});

// 监听get请求,获取url中的动态参数
app.get("/getDynamic/:id/:name", (req, res) => {
  // 2. 获取url中的动态参数(http://127.0.0.1:3000/getDynamic/123/张三)
  // req.params默认是个空对象，返回形式是对象
  // 返回结果：{ id: '123', name: '张三' }
  const params = req.params;
  console.log(params);
  // 发送响应数据
  res.send({
    code: 200,
    message: "get请求成功",
    data: params,
  });
});

// 监听post请求
app.post("/post", (req, res) => {
  res.send("post请求");
});

// 3. 托管静态资源,express.static()方法用于托管静态资源,参数为静态资源所在的目录
// 访问静态资源时,会自动访问public目录下的文件
// 访问方式: http://127.0.0.1:3000/index.html
// 访问方式: http://127.0.0.1:3000/css/style.css
// 访问方式: http://127.0.0.1:3000/js/app.js
// 访问方式: http://127.0.0.1:3000/img/logo.png
app.use(express.static(path.join(__dirname, "public")));

// 3.1. 托管多个静态资源目录，多次调用即可，查找资源顺序即多次调用的顺序
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public2")));

// 3.2. 挂载路径前缀，访问时需要加上前缀
// 访问方式: http://127.0.0.1:3000/static/index.html
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("服务器启动成功 http://127.0.0.1:3000");
});
