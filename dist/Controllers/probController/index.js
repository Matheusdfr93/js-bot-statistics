"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Campeao = _interopRequireDefault(require("../../WebScraping/SerieA/Campeao"));

var _Libertadores = _interopRequireDefault(require("../../WebScraping/SerieA/Libertadores"));

var _Rebaixamento = _interopRequireDefault(require("../../WebScraping/SerieA/Rebaixamento"));

var _Campeao2 = _interopRequireDefault(require("../../WebScraping/SerieB/Campeao"));

var _classificacaoSerieA = _interopRequireDefault(require("../../WebScraping/SerieB/classificacaoSerieA"));

var _rebaixamentoSerieC = _interopRequireDefault(require("../../WebScraping/SerieB/rebaixamentoSerieC"));

var _SerieA = _interopRequireDefault(require("../../WebScraping/ClubeDaAposta/SerieA"));

var _teams = _interopRequireDefault(require("../utils/teams"));

var _SerieA2 = _interopRequireDefault(require("../../WebScraping/chanceDeGol/SerieA"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const probController = {
  async probActions(req, res) {
    try {
      const acceptedActions = {
        findProbByTeamSerieA: async params => {
          const {
            team
          } = params;

          if (!team) {
            return {
              valid: false
            };
          }

          const probChamp = await _Campeao.default.getProbsByTeam(team);
          const probLibert = await _Libertadores.default.getProbsByTeam(team);
          const probRebaix = await _Rebaixamento.default.getProbsByTeam(team);
          return {
            valid: true,
            time: probChamp.time,
            probabilidades: {
              campeao: probChamp.prob,
              libertadores: probLibert.prob,
              rebaixamento: probRebaix.prob
            }
          };
        },
        findProbByTeamSerieB: async params => {
          const {
            team
          } = params;

          if (!team) {
            return {
              valid: false
            };
          }

          const probChamp = await _Campeao2.default.getProbsByTeam(team);
          const probCLassificacaoSerieA = await _classificacaoSerieA.default.getProbsByTeam(team);
          const probRebaixC = await _rebaixamentoSerieC.default.getProbsByTeam(team);
          return {
            valid: true,
            time: probChamp.time,
            probabilidades: {
              campeao: probChamp.prob,
              classificacoSerieA: probCLassificacaoSerieA.prob,
              rebaixamento: probRebaixC.prob
            }
          };
        },
        findProbByTeamClubeDaApostaSerieA: async params => {
          const {
            team
          } = params;

          if (!team) {
            return {
              valid: false
            };
          }

          const listTeams2 = Object.values(_teams.default);
          const time = listTeams2.filter(el => {
            if (el.nome === team) return el.nomeCda;
          });
          const prob = await _SerieA.default.getProbsByTeam(time[0].nomeCda);
          return {
            valid: true,
            time: prob.time,
            probabilidades: {
              campeao: prob.probCamp,
              libertadores: prob.probLibert,
              sulamericana: prob.probSula,
              rebaixamento: prob.probRebaixamento
            }
          };
        },
        findProbByTeamChanceDeGolSerieA: async params => {
          const {
            team
          } = params;
          console.log("Chegou:", team);

          if (!team) {
            return {
              valid: false
            };
          }

          const prob = await _SerieA2.default.getProbsByTeam(team);
          return {
            prob
          };
        }
      };
      const {
        action
      } = req.body;
      const executeAction = await acceptedActions[action];
      let responseAction = {};

      if (executeAction) {
        const request = await executeAction(req.body);
        responseAction = {
          response: request
        };
        return res.json(responseAction);
      }

      responseAction = {
        response: "No action provided"
      };
      return res.json(responseAction);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

};
var _default = probController.probActions;
exports.default = _default;