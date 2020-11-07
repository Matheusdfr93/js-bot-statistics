import { Request, Response } from "express";
import { Request, Response } from "express";

const probController = {
  async probActions(req: Request, res: Response, next) {
    const acceptedActions = {
      findProbByTeam: async (params) => {
        const { team } = params;
      },
    };
    const { action } = req.body;

    const executeAction = await acceptedActions[action];
    responseAction = {};
  },
};
