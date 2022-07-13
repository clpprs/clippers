const config = {
  limit: 50,
  protocol: "https://",
  domain: "amv.tools",
  api: "gaen",
  files: "hachikuji",
  thumbnail: ({ anime, episode, index }) => {
    return `${config.url("files")}/${anime}/${episode}/${index}.jpg`;
  },
  video: ({ anime, episode, index }) => {
    return `${config.url("files")}/${anime}/${episode}/${index}.mp4`;
  },
  url: (service, page = "") => {
    return `${config.protocol}${service ? config?.[service] + "." : ""}${
      config.domain
    }${page ? `/${page}` : ""}`;
  },
  // url: (service, page = "") => {
  //   const ProdUrl = (service, page = "") => {
  //     return `${config.protocol}${service ? config?.[service] + "." : ""}${
  //       config.domain
  //     }${page ? `/${page}` : ""}`;
  //   };

  //   switch (service) {
  //     case "api": {
  //       return `http://localhost:3333${page ? `/${page}` : ""}`;
  //     }
  //     case "files": {
  //       return ProdUrl(service, page);
  //     }
  //   }
  // },
};

module.exports = config;
