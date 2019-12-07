importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "xc-portal",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.ed2387f838fbc2865030.js",
    "revision": "db8034e0338479b37e3d66217dcd75ba"
  },
  {
    "url": "/_nuxt/layouts_default.49dceef938d397de3609.js",
    "revision": "5219baa1ea79f90a44925b380e8ffff2"
  },
  {
    "url": "/_nuxt/layouts_default1.da81fc07e89fb983eee9.js",
    "revision": "c6abe85ca16a3290679c87d7ba1ec912"
  },
  {
    "url": "/_nuxt/layouts_empty-page.24c72bd32b86a2a9c56c.js",
    "revision": "27c85deec511eaaaf21bcc9210f4734e"
  },
  {
    "url": "/_nuxt/layouts_test.feaa0862e5330b5dc180.js",
    "revision": "59206cfa88c128705dc633786965a31c"
  },
  {
    "url": "/_nuxt/manifest.7e695b940cc06aa01737.js",
    "revision": "e505d153534dfa95caac4682cf3e024c"
  },
  {
    "url": "/_nuxt/pages_about.66244eeff3d3a4806031.js",
    "revision": "1a119d132935880b59864c17e0ddd2ac"
  },
  {
    "url": "/_nuxt/pages_course_search_index.944f257626a4fb71207b.js",
    "revision": "cba721ac2a7c6650e2d662a22f3dedc9"
  },
  {
    "url": "/_nuxt/pages_user__id.74dd2823e69602681bed.js",
    "revision": "eddb9a278ca0f618a09162378f10252c"
  },
  {
    "url": "/_nuxt/pages_user_index.3099c056f2f963196b19.js",
    "revision": "4482c9a2e56f4652c290317509234a5d"
  },
  {
    "url": "/_nuxt/pages_user_one.048cd9a72771cd0ed694.js",
    "revision": "7f0fd4dc98cb23880c32d8688000dfe8"
  },
  {
    "url": "/_nuxt/pages_user.50522372944f4caf4ae9.js",
    "revision": "5d2f92fe68626fe1f4d0f639fa41b45f"
  },
  {
    "url": "/_nuxt/vendor.432827a019a2be39ea3e.js",
    "revision": "82a9f5d8c590af70c0b7db9d60dff4b2"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

