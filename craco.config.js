const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [{
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@primary-color': "#D5A944",
            '@link-color': "#D5A944",
            '@font-family': 'Open Sans',
    
          },
          javascriptEnabled: true,
        },
      },
    },
  }, ],
};