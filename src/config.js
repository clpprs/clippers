const config = {
  limit: 50,
  protocol: "https://",
  domain: "amv.tools",
  api: "gaen",
  files: "hachikuji",
  url: (service, page = "") => {
    // If provided a clip object
    if (typeof service === "object")
      return `${config.protocol}${config.files}.${config.domain}/${
        service.anime
      }/${service.episode}/${service.index}.mp4${page && "?download=1"}`;

    return `${config.protocol}${service ? config?.[service] + "." : ""}${
      config.domain
    }${page ? `/${page}` : ""}`;
  },
};

module.exports = config;
