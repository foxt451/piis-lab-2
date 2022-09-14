import { RequestHandler } from "express";

const getMaze: RequestHandler = (req, res, next) => {
  return res.send("hello");
};

export { getMaze };
