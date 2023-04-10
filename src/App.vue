<template>
  <v-app class="app-background">
    <TheHeader @heartBtnClick="snackbarActive = true"/>

    <v-main class="mt-0">
      <router-view/>
    </v-main>

    <v-snackbar v-model="snackbarActive" :timeout="2000" color="primary" absolute left shaped bottom>
      Сообщение: удачи и хорошего настроения!
    </v-snackbar>

    <v-footer class="footer-background">
      © {{ new Date().getFullYear() }} MiniBlog
    </v-footer>
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

.app-background {
  background: var(--v-background-base);
}

.footer-background {
  background: var(--v-background-base) !important;
}
</style>
