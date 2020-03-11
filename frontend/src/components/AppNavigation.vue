<template>
  <span>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link v-bind:to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>Contact</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hide-sm-and-down">
        <v-btn v-if="currentUser" text v-bind:to="{ name: 'AddMovie' }"
          >Add Movie</v-btn
        >
        <v-btn v-if="currentUser" text class="text-none">{{
          currentUser.email
        }}</v-btn>
        <v-btn v-if="!currentUser" text v-bind:to="{ name: 'Register' }"
          >register</v-btn
        >
        <v-btn v-if="!currentUser" text v-bind:to="{ name: 'Login' }"
          >login</v-btn
        >
        <v-btn v-if="currentUser" text @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </span>
</template>

<script>
import '../assets/stylesheet/main.css';
import bus from '@/bus';

export default {
  name: 'AppNavigation',

  data() {
    return {
      drawer: null,
      currentUser: null,
    };
  },

  mounted() {
    this.fetchUser();
    this.onEvents();
  },

  methods: {
    async fetchUser() {
      return this.axios({
        method: 'get',
        url: '/users/current',
      })
        .then(response => {
          this.currentUser = response.data.currentUser;
        })
        .catch(() => {});
    },
    onEvents() {
      bus.$on('refreshUser', () => {
        this.fetchUser();
      });
    },
    logout() {
      return this.axios({
        method: 'get',
        url: '/users/logout',
      })
        .then(() => {
          bus.$emit('refreshUser');
          if (this.$router.path !== '/') {
            this.$router.push({ name: 'Home' });
          }
          // this.$router.push('path').catch(error => {
          //   if (error.name != 'NavigationDuplicated') {
          //     throw error
          //   }
          // })
        })
        .catch(() => {});
    },
  },
};
</script>
