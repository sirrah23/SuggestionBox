<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Suggestion Box</h2>
        <p v-if="this.errorMsg" class="red-text">{{this.errorMsg}}</p>
        <form v-if="!submitted" @submit.prevent="createBox">
          <label for="name">Enter your box name:</label>
          <input type="text" name="name" v-model="name">
          <button class="btn teal">Create</button>
        </form>
        <BoxLinks v-if="submitted" :boxData="boxData"/>
      </div>
    </div>
  </div>
</template>

<script>
import BoxLinks from "@/components/BoxLinks.vue";
import SuggestionBoxAPI from "@/utils/api.js";

const sboxapi = new SuggestionBoxAPI("http://localhost:3000");

export default {
  data() {
    return {
      name: null,
      boxData: null,
      errorMsg: null,
      submitted: false
    };
  },
  methods: {
    createBox() {
      sboxapi
        .createBox(this.name)
        .then(res => {
          if (res.error) {
            console.log(res.error);
            this.errorMsg = "Something went wrong...";
          } else {
            this.boxData = res.data;
            this.submitted = true;
          }
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    BoxLinks
  }
};
</script>

<style>
.welcome {
  max-width: 600px;
  margin-top: 100px;
}
</style>
