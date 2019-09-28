<template>
  <v-app>
    <app-header></app-header>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style>
  @import 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons';
  @import 'https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css';
</style>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  },
};
</script>
