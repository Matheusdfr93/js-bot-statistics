import puppeteer from "puppeteer";

async function interneta() {
  //let launchOptions = { headless: false, args: ["--start-maximized"] };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto("http://www.mat.ufmg.br/futebol/campeao_seriea/");

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
      return Array.from(conteudo);
    });
    const arrayData: String[][] = await Promise.all(result);
    console.log(arrayData);
    const prob = [];

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

    //const team = "PALMEIRAS";

    const a = async function findChampByTeam(team) {
      const champ = await prob.filter((el: any) => {
        if (el.time === team) {
          console.log(el);
          return el;
        }
      });
      console.log(`A chace do ${team} ser campeão é: `, champ[0].prob.trim());
    };
    await browser.close();
    return { a };
  } catch (e) {
    console.log(e);
  }
}

module.exports = interneta;
