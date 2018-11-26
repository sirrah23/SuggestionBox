<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Suggestion Box</h2>
        <form @submit.prevent="createBox">
          <label for="name">Enter your box name:</label>
          <input type="text" name="name" v-model="name">
          <button class="btn teal">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SuggestionBoxAPI from "@/utils/api.js"

const sboxapi = new SuggestionBoxAPI("http://localhost:3000");

export default {
  data(){
    return {
      name: null
    }
  },
  methods:{
    createBox(){
      sboxapi.createBox(`Henlo ${this.name}`).then(res => console.log(res)).catch(err => console.log(err))
    },
  }
};
</script>

<style>
  .welcome{
    max-width: 600px;
    margin-top: 100px;
  }
</style>
