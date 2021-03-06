"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Request, Response } from "express";
function champSerieAChanceDeGol() {
  const findProbsUfmg = async () => {
    const browser = await _puppeteer.default.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    try {
      await page.goto("https://www.chancedegol.com.br/br20.htm");
      await page.waitForXPath(`/html/body/p[1]/font/table[2]/tbody/tr/td[3]/font/table/tbody`);
      const elHandle = await page.$x(`/html/body/p[1]/font/table[2]/tbody/tr/td[3]/font/table/tbody`);
      const result = elHandle.map(async el => {
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
    } catch (e) {
      console.log(e);
      await browser.close();
      throw new Error(e);
    }
  };

  const makeArrayofTeamsAndProbs = async () => {
    try {
      const prob = [];
      const arrayData = await findProbsUfmg(); //console.log(arrayData);

      let probi = 0;
      arrayData[0].map((el, i) => {
        if (i % 15 === 0) {
          console.log("aqui");
          prob[probi] = {
            posicao: "",
            time: "",
            probCamp: "",
            probLibert: "",
            probSula: "",
            probRebaixamento: ""
          };
          prob[probi].posicao = el.toString();
        }

        if ((i - 1) % 10 === 0) {
          prob[probi].time = el.toString();
        }

        if ((i - 11) % 10 === 0) {
          prob[probi].probCamp = el.toString();
        }

        if ((i - 12) % 10 === 0) {
          prob[probi].probLibert = el.toString();
        }

        if ((i - 13) % 10 === 0) {
          prob[probi].probSula = el.toString();
        }

        if ((i - 14) % 10 === 0) {
          prob[probi].probRebaixamento = el.toString();
          probi = probi + 1;
        }
      });
      console.log("ATENÇÃO!!! ", prob);
      return prob;
    } catch (e) {
      console.log(e);
    }
  };

  const getProbsByTeam = async team => {
    try {
      const prob = await makeArrayofTeamsAndProbs();
      const champ = prob.filter(el => {
        if (el.time.toUpperCase() === team.toUpperCase()) {
          //console.log(el);
          return el;
        }
      });
      const a = champ[0];
      console.log("Olha essa merda", a);
      return a;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return {
    getProbsByTeam
  };
}

var _default = champSerieAChanceDeGol();

exports.default = _default;