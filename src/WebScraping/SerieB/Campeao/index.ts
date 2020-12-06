import puppeteer, { Browser } from "puppeteer";
//import { Request, Response } from "express";

function champSerieB() {
  const findProbsUfmg = async () => {
    const browser: Browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: puppeteer.Page = await browser.newPage();
    try {
      await page.goto("http://www.mat.ufmg.br/futebol/campeao-serie-b/");
      await page.waitForXPath(`//*[@id="tabelaCL"]/tbody`);
      const elHandle = await page.$x(`//*[@id="tabelaCL"]/tbody`);

      const result = elHandle.map(async (el) => {
        const deda = await el.evaluate(() => {
          const x = document.getElementsByTagName("td");
          const array: String[] = [];
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
      const arrayData: String[][] = await Promise.all(result);
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
          prob[probi] = { posicao: "", time: "", prob: "" };
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

  const getProbsByTeam = async (team) => {
    try {
      const prob: String[] = await makeArrayofTeamsAndProbs();
      console.log(prob);
      const champ: String[] = prob.filter((el: any) => {
        if (el.time === team.toUpperCase()) {
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
  return { getProbsByTeam };
}

export default champSerieB();
