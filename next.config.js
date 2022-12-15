module.exports = {
  basePath: "/zivot", //before static deployment, change this to "/zivot"
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "https://data.irozhlas.cz/zivot/",
  //       permanent: true,
  //     },
  //     {
  //       source: "/:key",
  //       destination: "https://data.irozhlas.cz/zivot/:key",
  //       permanent: true,
  //     },
  //   ];
  // },
};
