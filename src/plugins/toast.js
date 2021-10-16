import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  iconPack: "mdi", //수동으로 지정해줘야함
  position: "bottom-right",
});

Vue.toasted.register("notice", (payload) => payload, {
  icon: "mdi-bell",
  duration: 4 * 1000,
  action: {
    text: "CLOSE",
    onClick: (e, toastObj) => {
      toastObj.text("III"); //내용변경
      toastObj.goAway(4 * 1000); //n밀리 후에 없어짐
    },
    icon: "mdi-numeric",
  },
  onComplete: (e, toastObj) => {
    //토스트가 시간이지나거나, 수동으로 날리고나서 오는 콜백
    console.log("toas finsited");
  },
});

Vue.toasted.register(
  "error",
  (payload) => {
    return payload;
  },
  {
    icon: "mdi-lock-alert-outline",
    duration: 4 * 1000,
    action: {
      text: "CLOSE",
      onClick: (e, toastObj) => {
        toastObj.text("III"); //내용변경
        toastObj.goAway(4 * 1000); //n밀리 후에 없어짐
      },
      icon: "mdi-numeric",
    },
    onComplete: (e, toastObj) => {
      //토스트가 시간이지나거나, 수동으로 날리고나서 오는 콜백
      console.log("toas finsited");
    },
  }
);
