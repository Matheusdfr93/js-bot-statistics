"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
//import { Request, Response } from "express";
function champSerieAClubeAposta() {
    const findProbsUfmg = async () => {
        const browser = await puppeteer_1.default.launch({
            args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        try {
            await page.goto("https://clubedaposta.com/probabilidade-titulo-classificacao/chances-titulo-libertadores-brasileirao-serie-a-2020-2021/");
            await page.waitForXPath(`//*[@id="post-143174"]/div/div[2]/div[1]/table/tbody`);
            const elHandle = await page.$x(`//*[@id="post-143174"]/div/div[2]/div[1]/table/tbody`);
            const result = elHandle.map(async (el) => {
                const deda = await el.evaluate(() => {
                    const x = document.getElementsByTagName("td");
                    const array = [];
                    for (let i = 0; i < x.length; i++) {
                        array.push(x[i].textContent);
                    }
                    return Array.from(array);
                });
                const conteudo = [...deda];
                await browser.close();
                console.log("Cibeeee", conteudo);
                return Array.from(conteudo);
            });
            const arrayData = await Promise.all(result);
            return Array.from(arrayData);
        }
        catch (e) {
            console.log(e);
            await browser.close();
            throw new Error(e);
        }
    };
    const makeArrayofTeamsAndProbs = async () => {
        try {
            const prob = [];
            const arrayData = await findProbsUfmg();
            //console.log(arrayData);
            let probi = 0;
            arrayData[0].map((el, i) => {
                if (i % 10 === 0) {
                    console.log("aqui");
                    prob[probi] = {
                        posicao: "",
                        time: "",
                        probCamp: "",
                        probLibert: "",
                        probSula: "",
                        probRebaixamento: "",
                    };
                    prob[probi].posicao = el.toString();
                }
                if ((i - 2) % 10 === 0) {
                    prob[probi].time = el.toString();
                }
                if ((i - 5) % 10 === 0) {
                    prob[probi].probCamp = el.toString();
                }
                if ((i - 6) % 10 === 0) {
                    prob[probi].probLibert = el.toString();
                }
                if ((i - 8) % 10 === 0) {
                    prob[probi].probSula = el.toString();
                }
                if ((i - 9) % 10 === 0) {
                    prob[probi].probRebaixamento = el.toString();
                    probi = probi + 1;
                }
            });
            console.log("ATENÇÃO!!! ", prob);
            return prob;
        }
        catch (e) {
            console.log(e);
        }
    };
    const getProbsByTeam = async (team) => {
        try {
            const prob = await makeArrayofTeamsAndProbs();
            const champ = prob.filter((el) => {
                if (el.time.toUpperCase() === team.toUpperCase()) {
                    //console.log(el);
                    return el;
                }
            });
            const a = champ[0];
            console.log("Olha essa merda", a);
            return a;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    };
    return { getProbsByTeam };
}
exports.default = champSerieAClubeAposta();
