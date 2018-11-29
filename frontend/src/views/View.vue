<template>
  <div class="submit">
    <ViewBox :hash="$route.params.hash"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ViewBox from "@/components/ViewBox.vue";

export default {
  name: "view",
  components: {
    ViewBox
  }
};
</script>
