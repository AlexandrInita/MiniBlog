<template>
  <v-app style="background: #fdfdfd;">
    <v-toolbar class="px-10" max-height="48" dense elevation="1">
     <!-- <div class="logo">mb</div> -->
      <div class="logo">MB</div>
      <v-toolbar-title class="">og</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main class="mt-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  mounted() {
    document.title = 'MiniBlog';
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.btn-text {
  font-weight: 500;
  line-height: 19px;
  text-transform: none;
  letter-spacing: normal;
}

.logo { 
  font-weight: 500;
  font-family: cursive;

  border: 3px solid #1E88E5;
  border-radius: 8px;
  padding: 3px;
}
</style>
