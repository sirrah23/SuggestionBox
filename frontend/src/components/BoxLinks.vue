<template>
  <div class="links">
      <div class="collection">
        <a :href="ownerLink" class="collection-item">Room for you to review suggestions</a>
        <a :href="submitterLink" class="collection-item">Room for people to submit suggestions</a>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    boxData: {
      type: Object
    }
  },
  computed: {
    ownerLink() {
      return `http://localhost:8080/room_own/${this.boxData.hash_owner}`;
    },
    submitterLink() {
      return `http://localhost:8080/room_sub/${this.boxData.hash_submitter}`;
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
