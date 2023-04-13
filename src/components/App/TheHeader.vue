<template>
  <v-toolbar class="px-10" max-height="48" dense elevation="1">
    <router-link to="/" class="d-flex flex-row" style="text-decoration: none; color: inherit;">
      <div class="logo">MB</div>
      <v-toolbar-title class="">og</v-toolbar-title>
    </router-link>
    
    <v-spacer></v-spacer>
    
    <v-switch v-model="$vuetify.theme.dark" hide-details/>

    <v-btn icon @click="heartBtnClick">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <div>{{ username }}</div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'TheHeader',

  computed: {
    ...mapGetters('user', ['username'])
  },
  
  methods: {
    heartBtnClick() {
      this.$emit('heartBtnClick')
    }
  }
}
</script>

<style scoped>
.logo { 
  font-weight: 500;
  font-family: cursive;

  border: 3px solid var(--v-primary-base);
  border-radius: 8px;
  padding: 3px;
}
</style>
