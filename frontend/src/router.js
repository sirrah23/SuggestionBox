import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Submit from "./views/Submit.vue";
import View from "./views/View.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/room_sub/:hash",
      name: "submit",
      component: Submit
    },
    {
      path: "/room_own/:hash",
      name: "view",
      component: View
    }
  ]
});
