import { Request, Response } from "express";
import champSerieA from "../../WebScraping/SerieA/Campeao";
import libertSerieA from "../../WebScraping/SerieA/Libertadores";
import rebaixamentoSerieA from "../../WebScraping/SerieA/Rebaixamento";
import champSerieB from "../../WebScraping/SerieB/Campeao";
import classificacaoParaSerieA from "../../WebScraping/SerieB/classificacaoSerieA";
import rebaixamentoSerieB from "../../WebScraping/SerieB/rebaixamentoSerieC";
import champSerieAClubeAposta from "../../WebScraping/ClubeDaAposta/SerieA";
import listTeams from "../utils/teams";
import champSerieAChanceDeGol from "../../WebScraping/chanceDeGol/SerieA";

const probController = {
  async probActions(req: Request, res: Response) {
    try {
      const acceptedActions = {
        findProbByTeamSerieA: async (params) => {
          const { team } = params;
          if (!team) {
            return {
              valid: false,
            };
          }
          const probChamp = await champSerieA.getProbsByTeam(team);
          const probLibert = await libertSerieA.getProbsByTeam(team);
          const probRebaix = await rebaixamentoSerieA.getProbsByTeam(team);
          return {
            valid: true,
            time: probChamp.time,
            probabilidades: {
              campeao: probChamp.prob,
              libertadores: probLibert.prob,
              rebaixamento: probRebaix.prob,
            },
          };
        },
        findProbByTeamSerieB: async (params) => {
          const { team } = params;
          if (!team) {
            return {
              valid: false,
            };
          }
          const probChamp = await champSerieB.getProbsByTeam(team);
          const probCLassificacaoSerieA = await classificacaoParaSerieA.getProbsByTeam(
            team
          );
          const probRebaixC = await rebaixamentoSerieB.getProbsByTeam(team);

          return {
            valid: true,
            time: probChamp.time,
            probabilidades: {
              campeao: probChamp.prob,
              classificacoSerieA: probCLassificacaoSerieA.prob,
              rebaixamento: probRebaixC.prob,
            },
          };
        },

        findProbByTeamClubeDaApostaSerieA: async (params) => {
          const { team }: { team: string } = params;
          if (!team) {
            return {
              valid: false,
            };
          }
          console.log("time: ", team);
          const listTeams2 = Object.values(listTeams);
          const time = listTeams2.find((el) => {
            return el.nome.toUpperCase() === team.toUpperCase();
          });
          console.log("achou o que:?", time);
          const prob = await champSerieAClubeAposta.getProbsByTeam(
            time.nomeCda
          );
          return {
            valid: true,
            time: prob.time,
            probabilidades: {
              campeao: prob.probCamp,
              libertadores: prob.probLibert,
              sulamericana: prob.probSula,
              rebaixamento: prob.probRebaixamento,
            },
          };
        },
        findProbByTeamChanceDeGolSerieA: async (params) => {
          const { team } = params;
          if (!team) {
            return {
              valid: false,
            };
          }
          const prob = await champSerieAChanceDeGol.getProbsByTeam(team);
          return {
            prob,
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
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  },
};

export default probController.probActions;
