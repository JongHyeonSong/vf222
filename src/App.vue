<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <site-title :title="title"></site-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/about"><v-icon>mdi-magnify</v-icon> </v-btn>
    </v-app-bar>

    <!-- nav bar -->
    <v-navigation-drawer app v-model="drawer">
      <site-menu />
    </v-navigation-drawer>
    <!-- content -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <site-footer :footer="footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from "@/views/site/title";
import SiteFooter from "@/views/site/footer";
import SiteMenu from "@/views/site/menu";
export default {
  components: { SiteMenu, SiteTitle, SiteFooter },
  name: "App",

  data: () => ({
    //
    drawer: false,
    title: "@@##zzz",
    footer: "fFFF",
  }),
};
</script>
