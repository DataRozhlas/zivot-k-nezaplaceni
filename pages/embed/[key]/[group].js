import React from "react";
import { useRouter } from "next/router";
import getAllGroups from "../../../components/getAllGroups";
import getSourceData from "../../../components/dataProvider";

const smallEmbed = ({ data, texts, chartKey }) => {
  const router = useRouter();
  const { key, group } = router.query;
  return (
    <div>
      {key},{group}
    </div>
  );
};

export default smallEmbed;

export async function getStaticProps(context) {
  const group = context.params.group;
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
  return {
    paths: await getAllGroups(),
    fallback: false,
  };
}
