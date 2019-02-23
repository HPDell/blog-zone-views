// Configuration for your app
const path = require("path");

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'photo-preview',
      'infinite-loading',
      'vue-prism',
      'marked',
      'lazyload'
    ],
    css: [
      'app.styl',
      'flex.css',
      'code.css',
      'mathjax.css',
      'prism.css'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules|vue\/src/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        });
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          use: [
            {loader: '@kazupon/vue-i18n-loader'},
            {loader: 'yaml-loader'}
          ]
        });
      },
      distDir: path.join(__dirname, "./dist/")
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically,
      proxy: {
        '/api': {
          target: "http://localhost:3000/",
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/login': {
          target: "http://localhost:3000/",
          changeOrigin: true,
          pathRewrite: {
            '^/login': '/login'
          }
        },
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QAlert',
        'QAutocomplete',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtn',
        'QBtnDropdown',
        'QBtnGroup',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCheckbox',
        'QChipsInput',
        'QDatetimePicker',
        'QField',
        'QIcon',
        'QInfiniteScroll',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemSeparator',
        'QItemTile',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QList',
        'QListHeader',
        'QModal',
        'QPageContainer',
        'QPage',
        'QPageSticky',
        'QPopover',
        'QRouteTab',
        'QScrollArea',
        'QSelect',
        'QTable',
        'QToggle',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QToolbar',
        'QToolbarTitle',
        'QTabs',
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog'
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'zh-hans' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
