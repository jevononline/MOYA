// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from 'router';
import VueResource from 'vue-resource';
import Geolib from 'geolib';

import App from './App';

import 'common/stylus/index.styl';

Vue.use(VueResource);
Vue.use(Geolib);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
