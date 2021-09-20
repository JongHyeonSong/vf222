<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Application
          <v-btn class="float-right" icon color="primary">
            <v-icon @click="drawer = false">mdi-license</v-icon></v-btn
          >
        </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.subItems"
          :key="subItem.title"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["menu"],

  data: () => ({
    items: [
      {
        title: "home",
        icon: "mdi-home",
        subItems: [
          {
            title: "Dashboard",
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
            title: "Dashboard",
            to: "/",
          },
        ],
      },
      {
        icon: "mdi-account-box-multiple-outline",
        title: "xxxffffdsf",
        to: "/xxx",
      },
    ],
  }),
};
</script>

<style></style>
