if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-dd306352"],(function(e){"use strict";importScripts("/fallback-ce627215c0e4a9af.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/L4yS2UAgVRzSptL7BSoh9/_buildManifest.js",revision:"f7b0cd9c06b354ced531ea9da0246c29"},{url:"/_next/static/L4yS2UAgVRzSptL7BSoh9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/173-f04f234e50200bcf.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/263-14c707d9ebf7d5ba.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/342-79c46f845b52fb6a.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/447-ea380792bb3f62c0.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/4bd1b696-984eb1d58b8f392f.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/52-f39baf78e6669030.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/565-ea04e731fc174305.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/575-e39569b214374796.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/7-1e40d122ed645a31.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/78-33eca25d3b1d68d0.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/(home)/page-b8cd9e7a03fad1f0.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/(home)/shalat/loading-38e46155d24cf72c.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/(home)/shalat/page-02c2e40eda92a991.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/_not-found/page-7da4ed15ceea0ca7.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/layout-96acfcecba7f773d.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/app/offline/page-b35d31d6c0994ce8.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/main-app-9c0c11c2552cfcbf.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/main-b9e5225d3d5efaed.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-1770ba5189621f41.js",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/_next/static/css/2fdf682d0a46ae04.css",revision:"2fdf682d0a46ae04"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/fallback-ce627215c0e4a9af.js",revision:"c8ed78f9c9d308579697a9a6fa40ffbb"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"e52c08ce0a255991e9cbf23bd6828555"},{url:"/logo-quranku.svg",revision:"02b393f5ee33abdb34f64aef8b8b4a3e"},{url:"/logo-quranku144x144.webp",revision:"02521f8df4641fd2915fff1bde967586"},{url:"/logo-quranku192x192.png",revision:"061034d2589deb40ab735e0bb9270d71"},{url:"/logo-quranku192x192.webp",revision:"11ac145416d57402a7a35b11ac162471"},{url:"/logo-quranku256x256.webp",revision:"c165e4526a1c0f0ec24b165c2733880f"},{url:"/logo-quranku384x384.webp",revision:"48ad67508da56be1a9fa7d0aee3f70e1"},{url:"/logo-quranku48x48.webp",revision:"871932ec8d8f9a3f926fd4b07b31c784"},{url:"/logo-quranku512x512.png",revision:"313e1a2c6f05c2d9b09714848bd205c6"},{url:"/logo-quranku512x512.webp",revision:"7ad08eb3ca9c266e0b7467c9e8864983"},{url:"/logo-quranku72x72.webp",revision:"ee562b1263110f474bf0b8267d242760"},{url:"/logo-quranku96x96.webp",revision:"ab303fc25adbc323c548289dca8f4c76"},{url:"/manifest.json",revision:"ac7ea8ea097f009874f7539392c03169"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/offline",revision:"L4yS2UAgVRzSptL7BSoh9"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}},{handlerDidError:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",plugins:[new e.ExpirationPlugin({maxEntries:2e4}),{handlerDidError:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/equran\.nos\.wjv-1\.neo\.id\/audio-full\/.*\.mp3$/,new e.CacheFirst({cacheName:"audioCache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[200]}),{handlerDidError:function(e){return _ref.apply(this,arguments)}}]}),"GET")}));
