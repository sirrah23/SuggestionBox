<template>
  <div class="submit">
    <SubmissionBox :hash="$route.params.hash"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SubmissionBox from "@/components/SubmissionBox.vue";

export default {
  name: "submit",
  components: {
    SubmissionBox
  }
};
</script>
