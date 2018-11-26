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
export default {
  data(){
    return {
      name: null
    }
  },
  methods:{
    createBox(){
      console.log(this.name)
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
