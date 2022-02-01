module.exports = {
  assetPrefix: getBasePath(),
  basePath: getBasePath(), 
  webpack(webpackConfig) {
    webpackConfig.output.publicPath = getBasePath() + webpackConfig.output.publicPath; 
    return webpackConfig;
  },
  reactStrictMode: true,
  locales: {
    locales: ['zh-CN', 'zh-TW', 'en-US'],
    defaultLocale: 'zh-CN'
  }
}

function getBasePath() {
  var basePath = "";

  if (process.env.NODE_ENV === "production" && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  return basePath;
}
