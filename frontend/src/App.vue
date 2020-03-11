<template>
  <v-app id="inspire">
    <app-navigation></app-navigation>

    <v-content>
      <router-view />
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text"
        >&copy; 2017-{{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import './assets/stylesheet/main.css';
import AppNavigation from '@/components/AppNavigation.vue';

export default {
  name: 'App',

  components: {
    AppNavigation,
  },

  data() {
    return {};
  },
  props: {
    source: String,
  },
};
</script>
