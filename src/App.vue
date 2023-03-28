<template>
  <v-app style="background: #fdfdfd;">
    <v-toolbar class="px-10" max-height="48" dense elevation="1">
      <v-toolbar-title class="py-0">Блог для примера</v-toolbar-title>
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
</style>
