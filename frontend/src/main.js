import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSwal from 'vue-swal';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueSwal);

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true; // allow cookie, for login authorization
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
