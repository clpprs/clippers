const config = {
  protocol: "http://",
  domain: "amv.tools",
  api: "gaen",
  files: "hachikuji",
  url: (service, page = "") =>
    `${config.protocol}${service ? config?.[service] + "." : ""}${
      config.domain
    }${page ? `/${page}` : ""}`,
};

module.exports = config;
