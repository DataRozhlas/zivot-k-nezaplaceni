import React from "react";
import { useRouter } from "next/router";
import getSourceData from "../../../components/dataProvider";
import ChartWrapper from "../../../components/chartWrapper";
import { useState, useEffect } from "react";
import { usePostMessageWithHeight } from "../../../components/hooks";

const bigEmbed = ({ data, texts, chartKey }) => {
  const router = useRouter();
  const { key } = router.query;
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
    <div ref={containerRef}>
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
