import Express from "express";
import morgan from "morgan";

import createRouter from "./router";

function createApp() {
  const express = Express();
  const router = createRouter();

  function registerMiddleWares() {
    express.use(Express.json());
    express.use(morgan("dev"));
    express.use(router.router);
  }

  function init() {
    router.init();
    registerMiddleWares();
  }

  return {
    init,
    express,
  };
}

export default createApp;
