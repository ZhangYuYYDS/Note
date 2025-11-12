/**
 * - 路由：路由是指客户端请求的URL地址，根据不同的URL地址，返回不同的内容。即客户端请求与服务器处理函数之间的映射关系
 *  1. 请求的类型
 *  2. 请求的URL地址
 *  3. 处理函数
 */

import express from "express";
import router from "./05_router.js";
const app = express();

// 挂载路由
// 1. app.use()的作用就是用于注册全局中间件
app.use(router);

// 2. 统一添加访问前缀
app.use("/api", router);

app.listen(3000, () => {
  console.log("服务器启动成功 http://127.0.0.1:3000");
});
