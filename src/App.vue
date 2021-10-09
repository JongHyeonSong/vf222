<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <v-btn @click="test">zdsf</v-btn>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <site-title :title="site.title"></site-title>
      <v-btn @click="readOnce" color="success">text</v-btn>
      <v-spacer></v-spacer>
      <site-sign></site-sign>
      <!-- <v-btn icon @click="save"><v-icon>mdi-magnify</v-icon> </v-btn>
      <v-btn icon @click="readOnce"><v-icon>mdi-magnify</v-icon> </v-btn>
      <span>{{ site.title }}</span>
      <span>{{ site.footer }}</span> -->
    </v-app-bar>

    <!-- nav bar -->
    <v-navigation-drawer app v-model="drawer" width="400">
      <site-menu :items="site.menu" />
    </v-navigation-drawer>

    <!-- content -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from "@/views/site/title";
import SiteFooter from "@/views/site/footer";
import SiteMenu from "@/views/site/menu";
import SiteSign from "@/views/site/sign";
import { getStorage, ref, uploadString } from "@firebase/storage";

const KEY_WORD = "site";
export default {
  components: { SiteMenu, SiteTitle, SiteFooter, SiteSign },
  name: "App",

  data: () => ({
    drawer: false,
    site: {
      menu: [
        {
          title: "home",
          icon: "mdi-home",
          subItems: [
            {
              title: "Dashboard1",
              to: "/",
            },
            {
              title: "About",
              to: "/about",
            },
          ],
        },
        {
          title: "about",
          active: true,
          icon: "mdi-onepassword",
          subItems: [
            {
              title: "Dashboard2",
              to: "/",
            },
          ],
        },
        {
          icon: "mdi-account-box-multiple-outline",
          title: "xxxffffdsf",
        },
      ],
      title: "title",
      footer: "footer",
    },
  }),

  methods: {
    test(ev) {
      const storageRef = ref(getStorage(), "boards/tt/" + 1234567890123456);

      console.log(33);
      uploadString(storageRef, "hell").then((res) => {
        console.log("uplo SUC@@");
      });
    },
    subscribe() {
      const _this = this;
      this.$firebase.readObjRsp(
        KEY_WORD,
        (sn) => {
          const v = sn.val();
          if (!v) {
            _this.$firebase.writeObj(KEY_WORD, _this.site);
          }
          _this.site = v;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    save() {
      console.log("save@");
      const dataObj = {
        title: "abcd@@",
        text: "@@@",
      };

      this.$firebase.writeObj(KEY_WORD, dataObj);
    },
    async readOnce() {
      const data = await this.$firebase.readObj(KEY_WORD);
      console.log(data);
    },
  },
  created() {
    this.subscribe();
  },
  mounted() {
    // this.$firebase.readObjRsp(KEY_WORD, (sn) => {
    //   console.log(sn.val(), 111);
    // });
  },
};
</script>
