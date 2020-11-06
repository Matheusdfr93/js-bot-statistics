import { Router } from "express";
import champSerieA from "../WebScraping/SerieA/Campeao";

function createRouter() {
  const router = Router();
  const champController = champSerieA;

  function registerRoutes() {
    router.get("/", (req, res) => {
      res.send({ status: "ok" }).status(200);
    });
    router.post("/probChamp", champController.getProbsByTeam);
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
