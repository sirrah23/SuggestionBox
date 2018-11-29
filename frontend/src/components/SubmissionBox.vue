<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Suggestion Box</h2>
        <h3 v-if="this.boxData" class="teal-text">{{this.boxData.name}}</h3>
        <h3 v-else>N/A</h3>
        <p v-if="loadErrorMsg" class="red-text">{{this.loadErrorMsg}}</p>
        <p v-if="sendErrorMsg" class="red-text">{{this.sendErrorMsg}}</p>
        <p v-if="sendSuccessMsg" class="green-text">{{this.sendSuccessMsg}}</p>
        <form v-if="!loadErrorMsg && boxData" @submit.prevent="submitSuggestion">
          <label for="suggestion">Enter your suggestion:</label>
          <input type="text" name="suggestion" v-model="suggestion">
          <button class="btn teal">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SuggestionBoxAPI from "@/utils/api.js";

const sboxapi = new SuggestionBoxAPI("http://localhost:3000");

export default {
  props: {
    hash: {
      type: String
    }
  },
  data() {
    return {
      suggestion: null,
      loadErrorMsg: null,
      sendErrorMsg: null,
      sendSuccessMsg: null,
      boxData: null
    };
  },
  beforeMount() {
    sboxapi.getBox(this.hash).then(res => {
      this.boxData = res.data;
      if (this.boxData.error) {
        this.loadErrorMsg = "Something went wrong";
      }
      if (this.boxData.hash_submitter !== this.hash) {
        this.loadErrorMsg = "Could not find suggestion box";
      }
    });
  },
  methods: {
    submitSuggestion() {
      this.clearSendMsgs();
      if (!this.suggestion) {
        this.sendErrorMsg = "Try entering something first";
        return;
      }
      sboxapi.postSuggestion(this.hash, this.suggestion).then(res => {
        if (res.data.error) {
          this.sendErrorMsg = "Unable to submit suggestion";
          return;
        }
        this.suggestion = null;
        this.sendSuccessMsg = "Suggestion submitted successfully!";
      });
    },
    clearSendMsgs() {
      this.sendErrorMsg = null;
      this.sendSuccessMsg = null;
    }
  }
};
</script>

<style>
.links {
  max-width: 600px;
  margin-top: 100px;
}
</style>
