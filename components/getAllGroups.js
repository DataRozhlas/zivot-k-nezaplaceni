import getSourceData from "./dataProvider.js";

export default async function getAllGroups() {
  const data = await getSourceData("structure.json");
  const lengths = await Promise.all(
    data.pages.map(async p => {
      const pageData = await getSourceData(`${p.key}.json`);
      console.log;
      return {
        key: p.key,
        group: pageData.groups.length,
      };
    })
  );
  const result = lengths.reduce((acc, cur) => {
    for (let i = 0; i < cur.group; i++) {
      acc.push({ params: { key: cur.key, group: `${i}` } });
    }
    return acc;
  }, []);
  return result;
}
