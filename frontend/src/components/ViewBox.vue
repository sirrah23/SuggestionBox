
<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Suggestion Box</h2>
        <h3 v-if="this.boxData" class="teal-text">{{this.boxData.name}}</h3>
        <h3 v-else>N/A</h3>
        <p v-if="loadErrorMsg" class="red-text">{{this.loadErrorMsg}}</p>
        <ul v-if="this.boxData.suggestions.length > 0" id="suggestions" class="collection">
            <li v-for="(suggestion, index) in this.boxData.suggestions" class="collection-item" :key="index">
                {{suggestion.body}}
            </li>
        </ul>
        <p v-else class="purple-text">No suggestions at this time</p>
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
      loadErrorMsg: null,
      boxData: null
    };
  },
  beforeMount() {
    sboxapi.getBox(this.hash).then(res => {
      this.boxData = res.data;
      if (this.boxData.error) {
        this.loadErrorMsg = "Something went wrong";
      }
      if (this.boxData.hash_owner !== this.hash) {
        this.loadErrorMsg = "Could not find suggestion box";
      }
    });
  }
};
</script>

<style>
.links {
  max-width: 600px;
  margin-top: 100px;
}
</style>
