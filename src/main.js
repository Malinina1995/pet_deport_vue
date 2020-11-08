import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store';
import "firebase";
import './firebase';
import { rtdbPlugin as VueFire } from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueFire)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
