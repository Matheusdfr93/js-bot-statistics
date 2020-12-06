"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Campeao_1 = __importDefault(require("../../WebScraping/SerieA/Campeao"));
const Libertadores_1 = __importDefault(require("../../WebScraping/SerieA/Libertadores"));
const Rebaixamento_1 = __importDefault(require("../../WebScraping/SerieA/Rebaixamento"));
const Campeao_2 = __importDefault(require("../../WebScraping/SerieB/Campeao"));
const classificacaoSerieA_1 = __importDefault(require("../../WebScraping/SerieB/classificacaoSerieA"));
const rebaixamentoSerieC_1 = __importDefault(require("../../WebScraping/SerieB/rebaixamentoSerieC"));
const SerieA_1 = __importDefault(require("../../WebScraping/ClubeDaAposta/SerieA"));
const teams_1 = __importDefault(require("../utils/teams"));
const SerieA_2 = __importDefault(require("../../WebScraping/chanceDeGol/SerieA"));
const probController = {
    async probActions(req, res) {
        try {
            const acceptedActions = {
                findProbByTeamSerieA: async (params) => {
                    const { team } = params;
                    if (!team) {
                        return {
                            valid: false,
                        };
                    }
                    const probChamp = await Campeao_1.default.getProbsByTeam(team);
                    const probLibert = await Libertadores_1.default.getProbsByTeam(team);
                    const probRebaix = await Rebaixamento_1.default.getProbsByTeam(team);
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
                    const probChamp = await Campeao_2.default.getProbsByTeam(team);
                    const probCLassificacaoSerieA = await classificacaoSerieA_1.default.getProbsByTeam(team);
                    const probRebaixC = await rebaixamentoSerieC_1.default.getProbsByTeam(team);
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
                    const { team } = params;
                    if (!team) {
                        return {
                            valid: false,
                        };
                    }
                    const listTeams2 = Object.values(teams_1.default);
                    const time = listTeams2.filter((el) => {
                        if (el.nome === team)
                            return el.nomeCda;
                    });
                    const prob = await SerieA_1.default.getProbsByTeam(time[0].nomeCda);
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
                    console.log("Chegou:", team);
                    if (!team) {
                        return {
                            valid: false,
                        };
                    }
                    const prob = await SerieA_2.default.getProbsByTeam(team);
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
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    },
};
exports.default = probController.probActions;
