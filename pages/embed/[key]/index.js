import React from "react";
import { useRouter } from "next/router";
import getSourceData from "../../../components/dataProvider";

const bigEmbed = ({ data, texts, chartKey }) => {
  const router = useRouter();
  const { key } = router.query;
  return <div>{texts.pageData.title}</div>;
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
