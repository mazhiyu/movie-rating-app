<template>
  <v-row no-gutters>
    <v-col cols="4">
      <v-card>
        <v-card-title class="text-justify">
          <div class="headline">{{ movie.name }}</div>
          <span class="subtitle-1 grey--text"
            >{{ movie.released }} ‧ {{ movie.genre }}‧ {{ movie.runtime }}</span
          >
        </v-card-title>

        <h6 class="text-center card-title" v-if="currentUser" @click="rate()">
          Rate this movie
        </h6>

        <v-card-text class="text-justify">{{ movie.description }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
// shared state
const state = { note: 0 };
const RatingComponenet = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) {
      state.note = newVal;
    },
  },
  template: `
    <div class="rating">
      How was your experience getting help with this issues?
      <star-rating v-model="rating" :show-rating="false"></star-rating>
    </div>`,
  components: { 'star-rating': StarRating },
});

const component = new RatingComponenet().$mount(wrapper);

export default {
  name: 'Movie',

  data() {
    return {
      movie: [],
      currentUser: null,
    };
  },

  mounted() {
    this.fetchMovie();
  },

  methods: {
    async fetchMovie() {
      return axios({
        method: 'get',
        url: `http://localhost:3000/movies/${this.$route.params.id}`,
      }).then(res => {
        this.movie = res.data;
      });
    },

    async rate() {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: { value: 0 },
        },
      }).then(() => {
        const movieID = this.$route.params.id;
        return axios({
          method: 'post',
          data: {
            rate: state.note,
          },
          url: `http://localhost:3000/movies/rate/${movieID}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(`Thank you for rating! ${state.note}`, 'success');
          })
          .catch(err => {
            const msg = err.response.data.message;
            this.$swal('Oh oo!', `${msg}`, 'error');
          });
      });
    },
  },
};
</script>
