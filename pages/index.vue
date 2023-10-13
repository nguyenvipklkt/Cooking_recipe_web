<template>
  <div></div>
</template>

<script>
export default {
  async beforeCreate() {
    this.$router.push({ path: "/home" });
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
