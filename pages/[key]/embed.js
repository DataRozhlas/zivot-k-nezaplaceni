import React from "react";
import { useState, useEffect } from "react";
import getSourceData from "../../components/dataProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Embed.module.css";

const EmbedPage = ({ data, texts, chartKey, baseUrl }) => {
  const router = useRouter();
  const { query } = router;
  const skupina = query.skupina ?? "";
  const [src, setSrc] = useState(
    `${baseUrl}${router.basePath}/embed/${query.key}/${skupina}`
  );
  const id = `cro-${chartKey}`;
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([0]);

  useEffect(() => {
    const currentGroups = data.groups
      .find((g, i) => i === Number(skupina))
      .data.map((g, i) => {
        return { title: g.title, index: i };
      });
    setGroups(currentGroups);
    setSelectedGroups(currentGroups.map(g => g.index));
    setSrc(
      `${baseUrl}${router.basePath}/embed/${query.key}/${skupina}/index.html`
    );
  }, [skupina]);

  useEffect(() => {
    if (selectedGroups.length === groups.length) {
      setSrc(
        `${baseUrl}${router.basePath}/embed/${query.key}/${skupina}/index.html`
      );
      return;
    }
    const omit = groups
      .filter(g => !selectedGroups.includes(g.index))
      .map(g => g.index);
    const omitString = `?omit=${omit.toString()}`;
    setSrc(
      `${baseUrl}${router.basePath}/embed/${query.key}/${skupina}/index.html${omitString}`
    );
  }, [selectedGroups]);

  useEffect(() => {
    window.addEventListener("message", function (a) {
      if (void 0 !== a.data["cro-embed-height"])
        for (var e in a.data["cro-embed-height"]);
      if (id === e) {
        var d = document.querySelector(`#${id}`);
        d && (d.style.height = a.data["cro-embed-height"][e] + "px");
      }
    });
  }, []);

  const handleCheckboxClick = e => {
    const index = Number(e.target.value);
    if (selectedGroups.includes(index)) {
      if (selectedGroups.length === 1) {
        return;
      }
      setSelectedGroups(prevState => {
        return prevState.filter(el => el !== index);
      });
      return;
    }
    setSelectedGroups(prevState => [...prevState, index]);
  };

  return (
    <>
      <Head>
        <title>Život k nezaplacení - {texts.pageData.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          key="share-image"
          property="og:image"
          content="https://data.irozhlas.cz/zivot/ekonomicke-dopady.png"
        />
        <meta
          property="og:title"
          content="Český rozhlas a PAQ Research: Život k nezaplacení"
        />
        <meta name="twitter:card" content="summary" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KB3JR9L');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer.push({"configGemiusId": ".AGbkHxOpDTrDJT4gULQydTa38O1ESN_CYN2Y62XFGz.z7"});
      `,
          }}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={styles.container}>
        {skupina.length > 0 && (
          <fieldset className={styles.checkboxContainer}>
            <legend>Vyberte si kategorie, které chcete embedovat</legend>
            {groups.map(g => {
              const checked = selectedGroups.includes(g.index);
              return (
                <div>
                  <input
                    type="checkbox"
                    value={g.index}
                    key={g.index}
                    checked={checked}
                    onChange={handleCheckboxClick}
                  />
                  {g.title}
                </div>
              );
            })}
          </fieldset>
        )}
        <>
          <h1>Kód pro vložení grafu do vlastních stránek</h1>

          <pre className={styles.codeBox}>
            <code>
              {`<iframe src="${src}" scrolling="no" frameborder="0" allowtransparency="true" style="width: 0; min-width: 100% !important;" height="730" id="${id}"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["cro-embed-height"])for(var e in a.data["cro-embed-height"])if("${id}"===e){var d=document.querySelector("#${id}");d&&(d.style.height=a.data["cro-embed-height"][e]+"px")}});</script>`}
            </code>
          </pre>
          <iframe
            src={src}
            scrolling={"no"}
            frameBorder={0}
            allowtransparency={"true"}
            style={{ width: 0, minWidth: "100%!important" }}
            height="730"
            id={id}
          ></iframe>
        </>
      </div>
    </>
  );
};

export default EmbedPage;

export async function getStaticProps(context) {
  const data = await getSourceData(`${context.params.key}.json`);
  const texts = await getSourceData(`${context.params.key}-texts.json`);

  return {
    props: {
      data: data,
      texts: texts,
      chartKey: `${context.params.key}-chart`,
      baseUrl:
        process.env.NODE_ENV === "production" ? "https://data.irozhlas.cz" : "",
    },
  };
}

export async function getStaticPaths() {
  const data = await getSourceData("structure.json");
  return {
    paths: data.pages.map(p => {
      return { params: { key: p.key } };
    }),
    fallback: false,
  };
}
