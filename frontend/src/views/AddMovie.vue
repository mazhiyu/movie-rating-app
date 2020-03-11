<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Movie Name*"
      required
    ></v-text-field>
    <v-textarea
      v-model="description"
      label="Movie Description"
      multi-line
    ></v-textarea>
    <v-select
      v-model="released"
      label="Movie Released Year*"
      required
      :rules="releasedYearRules"
      :items="years"
    ></v-select>
    <v-text-field
      v-model="genre"
      label="Movie Genre*"
      required
      :rules="genreRules"
    ></v-text-field>
    <v-text-field
      v-model="runtime"
      label="Movie Runtime*"
      required
    ></v-text-field>

    <v-row justify="center">
      <v-btn class="ma-2" @click="submit()" :disabled="!valid">submit</v-btn>
      <v-btn class="ma-2" @click="clear()">clear</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: true,
      name: '',
      description: '',
      released: '',
      genre: '',
      runtime: '',
      years: ['2020', '2019', '2018', '2017', '2016', '2015', '2014'],

      nameRules: [v => !!v || 'Movie name is required'],
      genreRules: [
        v => !!v || 'Movie genre year is required',
        v =>
          (v && v.length <= 800) ||
          'Genre must be less than equal to 800 characters.',
      ],
      releasedYearRules: [v => !!v || 'Movie release year is required'],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            description: this.description,
            released: this.released,
            genre: this.genre,
            runtime: this.runtime,
          },
          url: 'http://localhost:3000/movies',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal('Great!', 'Movie added successfully!', 'success');
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal('Oh oo!', 'Could not add the movie!', 'error');
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped></style>
