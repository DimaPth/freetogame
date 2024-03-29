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
              '@font-size-base': '16px',
              '@dropdown-menu-bg': '#3a3f44',
              '@link-color': 'rgba(255, 255, 255, .5)',
              '@link-hover-color': '#fff',
              '@item-hover-bg': '#272b30',
              '@divider-color': 'rgba(94,84,84,.1)',
              '@heading-color': '#aaa',
              '@heading-2-size': 'ceil(@font-size-base * 2)',
              '@card-background': '#32383e',
              '@select-dropdown-bg': '#3a3f44',
              '@select-item-active-bg': '#272b30',
              '@select-item-selected-color': '#fff',
              '@select-item-selected-font-weight': '400',
              '@input-bg': '#1c1e22',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
