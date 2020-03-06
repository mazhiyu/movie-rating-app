<template>
  <div class="contact">
    <h2>{{localised('hello')}}</h2>
    <h2>{{localised('goodbye')}}</h2>
    <button @click="activeLocale='en'">English</button>
    <button @click="activeLocale='zh'">简体中文</button>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      activeLocale: 'en',
      message: {
        en: {
          hello: 'Hello',
          goodbye: 'Goodbye'
        },
        zh: {
          hello: '你好',
          goodbye: '再见'
        }
      }
    }
  },
  methods: {
    localised (key) {
      return this.message[this.activeLocale][key]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
