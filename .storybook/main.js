const webpackConfig = require('../webpack.config')

module.exports = {
  stories: ["../components/**/*.stories.[tj]s?(x)"],
  addons: ["@storybook/preset-create-react-app"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    webpackConfig.module.rules.forEach(rule => {
      config.module.rules.push(rule);
    })
    config.resolve.extensions.push('.ts', '.tsx');

    // Return the altered config
    return config;
  },
};
