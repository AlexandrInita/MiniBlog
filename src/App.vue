<template>
  <v-app style="background: #fdfdfd;">
    <TheHeader @heartBtnClick="snackbarActive = true"/>

    <v-main class="mt-0">
      <router-view/>
    </v-main>

    <v-snackbar v-model="snackbarActive" :timeout="2000" color="primary" absolute left shaped bottom>
      Сообщение: удачи и хорошего настроения!
    </v-snackbar>
  </v-app>
</template>

<script>
import TheHeader from './components/App/TheHeader.vue';

export default {
    name: "App",
    data: () => ({
        snackbarActive: false
    }),
    components: { TheHeader }
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
