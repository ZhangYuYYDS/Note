import express from "express";

const router = express.Router();

router.get("/get", (req, res) => {
  res.send("Hello World get");
});

router.post("/post", (req, res) => {
  res.send("Hello World post");
});

export default router;
