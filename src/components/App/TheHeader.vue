<template>
  <v-toolbar class="px-10" max-height="48" dense elevation="1">
    <router-link to="/" class="d-flex flex-row" style="text-decoration: none; color: inherit;">
      <div class="logo">MB</div>
      <v-toolbar-title class="">og</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn icon @click="heartBtnClick">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>

export default {
  name: 'TheHeader',
  
  methods: {
    heartBtnClick() {
      this.$emit('heartBtnClick')
    }
  }
}
</script>

<style scoped>
</style>
