<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field v-model="name" label="Name*" required></v-text-field>
    <v-text-field
      v-model="email"
      label="Email*"
      required
      :rules="emailRules"
    ></v-text-field>
    <v-text-field v-model="password" label="Password*" required></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      label="Confirm Password"
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
      email: '',
      password: '',
      confirmPassword: '',

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      ],
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          url: 'http://localhost:3000/users/register',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Great!',
              'You have been successfully registered!',
              'success'
            );
            this.$router.push({ name: 'Login' });
          })
          .catch(err => {
            const msg = err.response.data.message;
            this.$swal('Oh oo!', `${msg}`, 'error');
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
