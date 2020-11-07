import { Request, Response } from "express";
import champSerieA from "../../WebScraping/SerieA/Campeao";
import libertSerieA from "../../WebScraping/SerieA/Libertadores";
import rebaixamentoSerieA from "../../WebScraping/SerieA/Rebaixamento";

const probController = {
  async probActions(req: Request, res: Response, next) {
    const acceptedActions = {
      findProbByTeam: async (params) => {
        const { team } = params;
        const probChamp = await champSerieA.getProbsByTeam(team);
        const probLibert = await libertSerieA.getProbsByTeam(team);
        const probRebaix = await rebaixamentoSerieA.getProbsByTeam(team);
        return {
          valid: true,
          probChamp,
          probLibert,
          rebaixamento: probRebaix.prob,
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
