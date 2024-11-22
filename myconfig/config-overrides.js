// /* myconfig-overrides.js */
//
// module.exports = function override(myconfig, env) {
//   // 参数中的 myconfig 就是默认的 webpack myconfig
//
//   // 对 myconfig 进行任意修改
//   myconfig.mode = 'development';
//
//   // 一定要把新的 myconfig 返回
//   return myconfig;
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