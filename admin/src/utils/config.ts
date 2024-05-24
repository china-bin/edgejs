const config = {
  terminal: 7, // pc管理后台
  title: "h5工程", //网站默认标题
  version: "1.0.0", //版本号
  baseUrl: `${import.meta.env.VITE_APP_BASE_URL}/`, //请求接口域名
  timeout: 10 * 1000, //请求超时时长
  appkey: "34ae1db6022ff6f355a0f",
};

export default config;
