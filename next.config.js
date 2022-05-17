module.exports = {
  basePath: "/zivot-k-nezaplaceni/zivot", //before static deployment, change this to "/zivot"
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ekonomicke-dopady",
        permanent: true,
      },
    ];
  },
};
