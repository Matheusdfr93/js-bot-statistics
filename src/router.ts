import { Router } from "express";
import champSerieA from "./WebScraping/SerieA/Campeao";
import probController from "./Controllers/probController";

function createRouter() {
  const router = Router();
  const champController = champSerieA;
  const probControllers = probController;

  function registerRoutes() {
    router.get("/", (req, res) => {
      res.send({ status: "abroba" }).status(200);
    });
    router.post("/probChamp", champController.getProbsByTeam);
    router.post("/probController", probControllers);
  }

  function init() {
    registerRoutes();
  }

  return {
    init,
    router,
  };
}

export default createRouter;
