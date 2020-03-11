<template>
  <span>
    <v-container fluid class="fill-height pa-0">
      <v-row no-gutters>
        <v-col cols="4" v-for="movie in movies" :key="movie._id">
          <v-card height="70vh">
            <v-card-title class="text-justify">
              <div>
                <div>
                  <v-btn
                    class="headline text-none text-justify pa-0"
                    text
                    v-bind:to="`/movies/${movie._id}`"
                    >{{ movie.name }}</v-btn
                  >
                </div>

                <span class="subtitle-1 grey--text"
                  >{{ movie.released }} ‧ {{ movie.genre }}‧
                  {{ movie.runtime }}</span
                >
              </div>
            </v-card-title>

            <v-card-text class="text-justify">{{
              movie.description
            }}</v-card-text>

            <!-- <v-card-actions>
            <v-btn text color="purple">Rate this movie</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>-->
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        :length="pageCount"
        circle
        @input="fetchMovies(page)"
      ></v-pagination>
    </v-container>
  </span>
</template>

<script>
export default {
  name: 'HomeDisplay',

  data() {
    return {
      activeLocale: 'en',
      movies: [],

      page: 1,
      pageSize: 3,
      pageCount: null,
    };
  },

  mounted() {
    this.fetchTotalMovies();
    this.fetchMovies();
  },

  methods: {
    async fetchTotalMovies() {
      return this.axios({
        method: 'get',
        url: '/movies/total',
      })
        .then(response => {
          this.pageCount = Math.ceil(response.data.total / this.pageSize);
        })
        .catch(() => {});
    },
    async fetchMovies(page = 1, pageSize = 3) {
      // const token = window.localStorage.getItem('auth') // for jwt
      return this.axios({
        method: 'get',
        url: '/movies',
        params: {
          offset: page > 0 ? (page - 1) * pageSize : 0,
          limit: pageSize,
        },
        headers: {
          // Authorization: `JWT ${token}`, // for jwt
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          this.movies = res.data.movies;
        })
        .catch(() => {});
    },
  },

  watch: {
    // for pagination:
    // 1) monitor component's input event;
    // 2) use watcher on pagination.page
    // 'pagination.page': (page) => {
    //   this.fetchMovies(page)
    // }
  },
};
</script>

<style scoped></style>
