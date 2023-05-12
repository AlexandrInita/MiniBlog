<template>
  <v-app class="app-background">
    <TheHeader @heartBtnClick="snackbarActive = true"/>

    <v-main class="mt-0">
      <router-view/>

      <SetUserDialog 
        :dialog="setUserDialog"
        @closeDialog="closeDialog"
      />
    </v-main>

    <v-snackbar class="snackbar" v-model="snackbarActive" :timeout="2000" color="primary" left shaped bottom>
      Сообщение: удачи и хорошего настроения!
    </v-snackbar>

    <v-footer class="app-background">
      © {{ new Date().getFullYear() }} MiniBlog
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHeader from './components/App/TheHeader.vue';
import SetUserDialog from './components/Dialogs/SetUserDialog.vue';

export default {
    name: "App",
    components: { TheHeader, SetUserDialog },

    async created() {
      this.hideHtmlOverflow()
    },

    mounted() {
      this.setUserDialog = !this.userName && true
    },

    destroyed() {
      this.showHtmlOverflow()
    },
    
    data: () => ({
      snackbarActive: false,
      setUserDialog: false
    }),

    computed: {
      ...mapGetters('user', ['userName'])
    },

    methods: {
      closeDialog() {
        this.setUserDialog = false
      },

      hideHtmlOverflow() {
       // document.querySelector('html').style.overflowY = 'hidden'
      },

      showHtmlOverflow() {
       // document.querySelector('html').style.overflowY = 'visible'
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

.snackbar {
  position: sticky;
  position: -webkit-sticky; 
  top: 0;
  z-index: 2;
}
</style>
