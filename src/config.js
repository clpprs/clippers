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
    // Dev
    // if (service === "api") return `http://localhost:80/${!!page && page}`;

    return `${config.protocol}${service ? config?.[service] + "." : ""}${
      config.domain
    }${page ? `/${page}` : ""}`;
  },
};

module.exports = config;
