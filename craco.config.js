const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");
const path = require('path'); 

module.exports = {
  plugins: [
    {

      plugin: CracoAntDesignPlugin,
      options: {
      customizeThemeLessPath:path.join(__dirname,"antd_customize.less")}

      // plugin: CracoLessPlugin,
      // options: {
      //   lessLoaderOptions: {
      //     lessOptions: {
      //       modifyVars: { '@primary-color': '#1DA57A' },
      //       javascriptEnabled: true,
      //     },
      //   },
      // },

    },
  ],
};