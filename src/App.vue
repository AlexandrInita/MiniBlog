<template>
  <v-app style="background: #fdfdfd;">
    <v-toolbar class="px-10" max-height="48" dense elevation="1">
      <div class="logo">MB</div>
      <v-toolbar-title class="">og</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="snackbarActive = true">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main class="mt-0">
      <router-view/>
    </v-main>

    <v-snackbar v-model="snackbarActive" :timeout="2000" color="primary" absolute left shaped bottom>
      Сообщение: удачи и хорошего настроения!
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    snackbarActive: false
  }),
};
</script>

<style>
@import 'assets/styles/main.css';

.logo { 
  font-weight: 500;
  font-family: cursive;

  border: 3px solid #1E88E5;
  border-radius: 8px;
  padding: 3px;
}
</style>
