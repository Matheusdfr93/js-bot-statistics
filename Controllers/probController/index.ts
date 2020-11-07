import { Request, Response } from "express";
import champSerieA from "../../WebScraping/SerieA/Campeao";

const probController = {
  async probActions(req: Request, res: Response, next) {
    const acceptedActions = {
      findProbByTeam: async (params) => {
        const { team } = params;
        const result = await champSerieA.getProbsByTeam(team);
        return {
          valid: true,
          result,
        };
      },
    };
    const { action } = req.body;

    const executeAction = await acceptedActions[action];
    let responseAction = {};

    if (executeAction) {
      const request = await executeAction(req.body);

      responseAction = {
        response: request,
      };

      return res.json(responseAction);
    }

    responseAction = {
      response: "No action provided",
    };

    return res.json(responseAction);
  },
};

export default probController.probActions;
