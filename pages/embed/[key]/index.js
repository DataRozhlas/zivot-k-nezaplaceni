import React from "react";
import { useRouter } from "next/router";
import getSourceData from "../../../components/dataProvider";
import ChartWrapper from "../../../components/chartWrapper";
import { useState, useEffect } from "react";

const bigEmbed = ({ data, texts, chartKey }) => {
  const router = useRouter();
  const { key } = router.query;
  const [total, setTotal] = useState(true);
  const [group, setGroup] = useState(0);
  const [filter, setFilter] = useState(data.filters ? 0 : undefined);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    setShowChart(true);
  }, []);

  return (
    <>
      <h1>{texts.pageData.title}</h1>
      {showChart && (
        <ChartWrapper
          key={`${chartKey + (filter ? `-${filter}` : "")}`}
          dataProps={data}
          group={group}
          total={total}
          filter={filter}
          legendTitle={texts.legendTitle}
          legendDescriptions={texts.legendDescriptions}
        />
      )}
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
