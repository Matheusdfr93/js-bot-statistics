"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classificacaoParaSerieA() {
  const findProbsUfmg = async () => {
    const browser = await _puppeteer.default.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();

    try {
      await page.goto("http://www.mat.ufmg.br/futebol/classificacao-para-primeira-divisao/");
      await page.waitForXPath(`//*[@id="tabelaCL"]/tbody`);
      const elHandle = await page.$x(`//*[@id="tabelaCL"]/tbody`);
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
      const arrayData = await findProbsUfmg();
      let probi = 0;
      arrayData[0].map((el, i) => {
        if (i % 3 === 0) {
          prob[probi] = {
            posicao: "",
            time: "",
            prob: ""
          };
          prob[probi].posicao = el.toString();
        }

        if ((i - 1) % 3 === 0) {
          prob[probi].time = el.toString();
        }

        if ((i - 2) % 3 === 0) {
          prob[probi].prob = el.toString();
          probi = probi + 1;
        }
      });
      return prob;
    } catch (e) {
      console.log(e);
    }
  };

  const getProbsByTeam = async team => {
    try {
      const prob = await makeArrayofTeamsAndProbs();
      const champ = prob.filter(el => {
        if (el.time === team.toUpperCase()) {
          return el;
        }
      });
      const a = champ[0];
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

var _default = classificacaoParaSerieA();

exports.default = _default;