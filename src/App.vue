<template>
  <v-app>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-item
            v-for="item in menuItems"
            :key="item.id"
            link
          >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"  class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-black">Vue</span>
        <span class="font-weight-light">learn</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in menuItems"
          :key="item.id"
          text
          :to="item.route"
          class="font-weight-light"
        >
          <span class="mr-2">{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

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

export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
  computed: {
    menuItems() {
      return [
        /*{
          id: 0,
          icon: 'visibility',
          title: 'Читать',
          route: '/books'
        },
        {
          id: 1,
          icon: 'extension',
          title: 'Учить слова',
          route: '/words'
        },
      {
          id: 2,
          icon: 'account_circle',
          title: 'Мой кабинет',
          route: '/profile'
        },
        {
          id: 3,
          icon: 'exit_to_app',
          title: 'Выйти',
          route: '/logout'
        },*/
        {
          id: 4,
          icon: 'input',
          title: 'Войти',
          route: '/signin'
        },
        {
          id: 5,
          icon: 'lock_open',
          title: 'Зарегистрироваться',
          route: '/signup'
        },
      ]
    }
  },
};
</script>
