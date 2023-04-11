<template>
  <v-app class="app-background">
    <TheHeader @heartBtnClick="snackbarActive = true"/>

    <v-main class="mt-0">
      <router-view/>
    </v-main>

    <v-snackbar v-model="snackbarActive" :timeout="2000" color="primary" absolute left shaped bottom>
      Сообщение: удачи и хорошего настроения!
    </v-snackbar>

    <v-footer class="app-background">
      © {{ new Date().getFullYear() }} MiniBlog
    </v-footer>
  </v-app>
</template>

<script>
import TheHeader from './components/App/TheHeader.vue';

export default {
    name: "App",

    async created() {
      this.hideHtmlOverflow()
    },

    destroyed() {
      this.showHtmlOverflow()
    },
    
    data: () => ({
      snackbarActive: false
    }),

    components: { TheHeader },

    methods: {
      hideHtmlOverflow() {
        document.querySelector('html').style.overflowY = 'hidden'
      },

      showHtmlOverflow() {
        document.querySelector('html').style.overflowY = 'visible'
      },
    }
};
</script>

<style>
@import 'assets/styles/main.css';

.app-background {
  background: var(--v-background-base) !important;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #A0A0A0;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.6);
}
</style>
