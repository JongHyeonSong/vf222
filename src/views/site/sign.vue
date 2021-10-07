<template>
  <v-progress-circular
    color="green"
    indeterminate
    v-if="this.loading"
    :value="20"
  ></v-progress-circular>
  <v-menu offset-y v-else-if="!$store.state.user">
    <h3>{{ $store.state }}</h3>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on"><v-icon>mdi-hail</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title primary-title> Login </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red" block dark @click="signInWithGoogle"
          ><v-icon left>mdi-google</v-icon>Login with google</v-btn
        >
      </v-card-actions>

      <v-card-actions>
        <v-btn color="red" block dark @click="signInWithFaceBook"
          ><v-icon left>mdi-emoticon</v-icon>Login with face</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-menu offset-y v-else>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar size="32" color="red">
          <!-- <img :src="$store.state.fireUser.photoURL" alt="alt" /> -->
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-title primary-title> user </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="green" block dark @click="signOutWithGoogle"
          ><v-icon left>mdi-google-ads</v-icon>out with google</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      items: [
        {
          key: "ㅋㅋ",
        },
        {
          key: "ㅎㅎ",
        },
      ],
    };
  },
  methods: {
    signInWithGoogle() {
      this.loading = true;
      this.$firebase.LoginGoogle().then((sn) => {
        console.log(sn, "zz");
        this.loading = false;
      });
    },
    signOutWithGoogle() {
      this.$firebase.signOutG();
    },

    signInWithFaceBook() {
      alert("face login@@  ");
    },
  },
  mounted() {},
};
</script>

<style></style>
