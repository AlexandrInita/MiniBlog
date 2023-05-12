<template>
  <v-toolbar class="px-10 header" max-height="48" dense elevation="0">
    <router-link to="/" class="d-flex flex-row" style="text-decoration: none; color: inherit;">
      <div class="logo">MB</div>
      <v-toolbar-title class="">og</v-toolbar-title>
    </router-link>
    
    <v-spacer></v-spacer>
    
    <v-switch v-model="$vuetify.theme.dark" hide-details/>

    <v-btn icon @click="heartBtnClick">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <div>{{ userName }}</div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'TheHeader',

  computed: {
    ...mapGetters('user', ['userName'])
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

.header {
  border-bottom: 1px solid var(--v-lightGrey-base) !important;

  position: sticky;
  position: -webkit-sticky; 
  top: 0;
  z-index: 2;
}
</style>
