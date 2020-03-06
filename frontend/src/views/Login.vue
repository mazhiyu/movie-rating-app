<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-email"
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @keydown.enter="login"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
              <!-- <v-row justify="center">
                <v-btn class="ma-2" @click="login()" :disabled="!valid">login</v-btn>
                <v-btn class="ma-2" @click="clear()">clear</v-btn>
              </v-row>-->
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bus from '@/bus'

export default {
  data () {
    return {
      valid: true,
      email: '',
      password: '',

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid'
      ],

      showPassword: false
    }
  },

  methods: {
    login () {
      if (this.$refs.form.validate()) {
        return this.axios({
          method: 'post',
          data: {
            email: this.email,
            password: this.password
          },
          url: '/users/login',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          // window.localStorage.setItem('auth', res.data.token) // for jwt
          this.$swal('Great!', 'You are ready to start!', 'success')
          bus.$emit('refreshUser')
          this.$router.push({ name: 'Home' })
        }).catch((err) => {
          const msg = err.response.data.message
          this.$swal('Oh oo!', `${msg}`, 'error')
          this.$router.push({ name: 'Login' })
        })
      }
    },

    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
