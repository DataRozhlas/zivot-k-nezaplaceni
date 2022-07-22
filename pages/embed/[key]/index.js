import React from "react";
import getSourceData from "../../../components/dataProvider";
import ChartWrapper from "../../../components/chartWrapper";
import { useState, useEffect } from "react";
import Head from "next/head";
import { usePostMessageWithHeight } from "../../../components/hooks";

const bigEmbed = ({ data, texts, chartKey }) => {
  const [total, setTotal] = useState(true);
  const [group, setGroup] = useState(0);
  const [filter, setFilter] = useState(data.filters ? 0 : undefined);
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    `cro-paq-${chartKey}`
  );

  useEffect(() => {
    postHeightMessage();
  }, []);

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
      <div ref={containerRef} style={{ fontFamily: "'Fira Sans', sans-serif" }}>
        <h1 style={{ marginTop: 0 }}>{texts.pageData.title}</h1>
        <ChartWrapper
          key={`${chartKey + (filter ? `-${filter}` : "")}`}
          dataProps={data}
          group={group}
          total={total}
          filter={filter}
          legendDescriptions={texts.legendDescriptions}
          legendTitle={texts.legendTitle}
        />
      </div>
    </>
  );
};

export default bigEmbed;

export async function getStaticProps(context) {
  const data = await getSourceData(`${context.params.key}.json`);
  const texts = await getSourceData(`${context.params.key}-texts.json`);

  return {
    props: {
      data: data,
      texts: texts,
      chartKey: `${context.params.key}-chart`,
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
