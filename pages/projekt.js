import getMenu from "../components/menuBuilder";
import Layout from "../components/layout";
import Image from "../components/Image";
import Link from "next/link";

import styles from "../styles/Projekt.module.css";

export default function About({ menu }) {
  return (
    <Layout title="O projektu" menuItemsData={menu}>
      <h1 style={{ marginBottom: "3rem" }}>O projektu</h1>
      <p>
        Výzkumný projekt Českého rozhlasu a agentury PAQ Research{" "}
        <strong>Česko 2022: Život k nezaplacení</strong> přímo navazuje na
        panelový výzkum{" "}
        <a href="https://zivotbehempandemie.cz/" className={styles.odkaz}>
          Život během pandemie
        </a>
        , který zkoumal, jak se vyvíjelo chování Čechů od začátku epidemie
        covid-19 a jak dopadala na jejich životy.
      </p>
      <p>
        Po epidemii čelí Česko dalším ekonomickým a geopolitickým výzvám. Jak se
        zvyšují výdaje domácností na energie, bydlení a potraviny? Jak velkou
        část rozpočtu jim to ubírá a kolik jim zbývá? Jaké domácnosti inflace
        zasahuje? Kolik domácností se propadá do chudoby – nebo jim po zaplacení
        nezbytných věcí zbývá minimum prostředků? Jakým domácnostem by měl stát
        pomáhat a které si se situací poradí?
      </p>
      <p>
        Právě to bude zjišťovat výzkum{" "}
        <strong>Česko 2022: Život k nezaplacení</strong> až do podzimu tohoto
        roku. V jeho průběhu budeme postupn2 ukazovat i další témata. Například,
        jak Češi vnímají integraci lidí z Ukrajiny v různých oblastech života,
        jak na ně ekonomická situace a nedaleká válka dopadá psychicky a zda se
        chtějí před hrozícím podzimním návratem koronaviru nechat přeočkovat.
      </p>
      <p>
        Každý měsíc počínaje květnem 2022 oslovujeme vzorek stejných respondentů
        jako v předešlé studii. Některé časové řady o hospodaření a strategiích
        domácností ovšem popisují situaci domácností již od března 2020.
        Výsledný reprezentativní vzorek se v jednotlivých vlnách pohybuje mezi
        1600 a 1800 rozhovory. Longitudinální (dlouhodobá) metodika umožňuje
        zkoumat změnu chování či ekonomického stavu stejné skupiny domácností.
      </p>
      <p>
        Na projektu se podílí výzkumníci ze společnosti PAQ Research (
        <em>Daniel Prokop</em>, <em>Michaela Kudrnáčová</em>,{" "}
        <em>Eliška Dvořáková</em>) a datoví experti z Českého rozhlasu. Data
        sbírá agentura NMS (člen SIMAR). Původní studie Život během pandemie a
        analýza výdajů za energie vznikaly ve spolupráci s think-tankem IDEA u
        CERGE-EI.
      </p>
      <h2>Sběr dat</h2>
      <p>
        Dotazování probíhá na Českém národním panelu. Výzkum je reprezentativní
        pro populaci ČR, ale kvůli metodice se ho mohou účastnit jen respondenti
        s připojením k internetu. Výstupy pro starší generaci (55+) jsou zejména
        u individuálních či postojových otázek pouze orientační.
      </p>
      <h2>Reprezentativita</h2>
      <p>Náš vzorek kopíruje složení populace 18+ z hlediska:</p>

      <ul>
        <li>
          kraje a velikosti obce bydliště, pohlaví, vzdělání, věku respondenta
        </li>
        <li>pracovního statusu (před začátkem epidemie)</li>
        <li>věku&nbsp;×&nbsp;pohlaví, věku&nbsp;×&nbsp;vzdělání</li>
        <li>zdrojů topení u domácností</li>
      </ul>
      <p>
        Pro možnost robustnějšího modelování epidemiologického chování jsou
        nadhodnoceny rizikové kategorie měst nad 50 tisíc obyvatel. Pro
        zpracování výsledků je tento „boost“ redukován vážením dat.
      </p>
      <h2>Kontroly dat</h2>
      <p>
        Ve výzkumu kontrolujeme délku vyplňování dotazníku. Výzkum také obsahuje
        kontrolní otázky, které odhalí, když respondent při vyplňování nedával
        pozor.
      </p>
      <h2>Financování</h2>
      <p>
        Tvorba výstupů projektu <strong>Česko 2022: Život k nezaplacení</strong>{" "}
        je plně financována Českým rozhlasem, který rovněž financuje část sběru
        a rozšíření o některé otázky zobrazované v dashboardu od května 2022.
      </p>
      <p>
        Další zdroje na dotazování zbytku výzkumu a tvorbu předchozích výstupů
        pocházejí zejména z programu Strategie AV21 Akademie věd ČR, v rámci
        něhož také probíhá zajištění dat pro další výzkumné účely IDEA při
        CERGE-EI. V minulosti bylo panelové šetření financováno i ze zdrojů
        Technologické agentury ČR, Max Planck Institute a dalších donorských
        zdrojů.
      </p>
      <h2>Metodické poznámky</h2>
      <p>
        Údaje v grafech vychází z různých počtů respondentů. Následující tabulka
        ukazuje statistickou chybu, která vychází z dané velikosti vzorku a liší
        se také podle zastoupení odpovědi. Se vzrůstajícím počtem respondentů se
        zvyšuje přesnost odhadu, tedy snižuje statistická chyba. Relativně
        vysokou přesností se vyznačují odhady provedené alespoň na 500
        respondentech, naopak odhady založené na vzorcích do přibližně 150 až
        300 respondentů je třeba považovat za orientační. Zároveň se statistická
        chyba odvíjí od procentuálního zastoupení odpovědí. Při stejné velikosti
        vzorku je největší u výsledků, které se pohybují kolem 50 %, naopak
        klesá jak u nižších (směrem k 0 %), tak u vyšších (směrem k 100 %).
      </p>
      <h4 className={styles.stred}>
        Statistická chyba vycházející z velikosti vzorku a zastoupení odpovědí
        (v procentních bodech)
      </h4>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr>
              <th colSpan={"9"}>Velikost vzorku (n)</th>
            </tr>
            <tr style={{ borderBottom: "1px solid black" }}>
              <th
                rowSpan={"9"}
                style={{
                  width: "100px",
                  borderBottom: "1px solid transparent",
                }}
              >
                Percentil (kolik respondentů uvádí odpověď)
              </th>
              <td style={{ borderBottom: "1px solid transparent" }}></td>
              <td>150</td>
              <td>300</td>
              <td>500</td> <td>1000</td> <td>1200</td> <td>2400</td>
              <td>3100</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                5&nbsp;%
              </td>
              <td>3,5</td>
              <td>2,5</td>
              <td>1,9</td>
              <td>1,4</td>
              <td>1,2</td>
              <td>0,9</td>
              <td>0,8</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                10&nbsp;%
              </td>
              <td>4,8</td>
              <td>3,4</td>
              <td>2,6</td>
              <td>1,9</td>
              <td>1,7</td>
              <td>1,2</td>
              <td>1,1</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                15&nbsp;%
              </td>
              <td>5,7</td>
              <td>4,0</td>
              <td>3,1</td>
              <td>2,2</td>
              <td>2,0</td>
              <td>1,4</td>
              <td>1,3</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                20&nbsp;%
              </td>
              <td>6,4</td>
              <td>4,5</td>
              <td>3,5</td>
              <td>2,5</td>
              <td>2,3</td>
              <td>1,6</td>
              <td>1,4</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                30&nbsp;%
              </td>
              <td>7,3</td>
              <td>5,2</td>
              <td>4,0</td>
              <td>2,8</td>
              <td>2,6</td>
              <td>1,8</td>
              <td>1,6</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                40&nbsp;%
              </td>
              <td>7,8</td>
              <td>5,5</td>
              <td>4,3</td>
              <td>3,0</td>
              <td>2,8</td>
              <td>2,0</td>
              <td>1,7</td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid black",
                  textAlign: "right",
                  padding: "0 5px",
                }}
              >
                50&nbsp;%
              </td>
              <td>8,0</td>
              <td>5,7</td>
              <td>4,4</td>
              <td>3,1</td>
              <td>2,8</td>
              <td>2,0</td>
              <td>1,8</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.loga}>
        <Link href="https://portal.rozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/cro.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://www.paqresearch.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/paq.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://radiozurnal.rozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/radiozurnal.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://plus.rozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/plus.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://www.irozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/irozhlas.svg"
              height={30}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://dvojka.rozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/dvojka.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
        <Link href="https://wave.rozhlas.cz/">
          <div className={styles.logo}>
            <Image
              src="../logo/wave.svg"
              height={40}
              width={120}
              alt="logo"
              unoptimized={true}
            ></Image>
          </div>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      menu: await getMenu(),
    },
  };
}
