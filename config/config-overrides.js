// /* config-overrides.js */
//
// module.exports = function override(config, env) {
//   // 参数中的 config 就是默认的 webpack config
//
//   // 对 config 进行任意修改
//   config.mode = 'development';
//
//   // 一定要把新的 config 返回
//   return config;
// }
const {
  override,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // add an alias for "page" imports
  addWebpackAlias({
    page: path.resolve(__dirname, "src")
  }),
);