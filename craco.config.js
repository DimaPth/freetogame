const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@text-color': 'rgba(255, 255, 255, .5)',
              '@component-background': '#272b30', 
              '@body-background': '#272b30', 
              '@layout-header-background': '#272b30', 
              '@layout-header-height': '55px', 
              '@layout-body-background': '#272b30',
              '@layout-footer-background': '#1c1e22',
              '@font-size-base': '.9375rem',
              '@dropdown-menu-bg': '#3a3f44',
              '@link-color': 'rgba(255, 255, 255, .5)',
              '@link-hover-color': '#fff',
              '@item-hover-bg': '#272b30',
              '@divider-color': 'rgba(94,84,84,.1)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
