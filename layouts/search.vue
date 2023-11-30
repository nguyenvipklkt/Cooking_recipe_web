<template>
  <div class="w-100 h-100" style="background-color: #f1f1f1">
    <div class="w-100 h-100 row m-0">
      <div class="d-none d-xl-block col-4 px-3 pt-3">
        <div class="w-100 h-100 bg-white" style="border-radius: 10px">
          <Menu></Menu>
        </div>
      </div>
      <div class="col-12 col-xl-7 px-3 pt-3">
        <div class="w-100 h-100" style="border-radius: 10px">
          <slot></slot>
        </div>
      </div>
      <div class="col-1 col-xl-block px-3 pt-3">
        <div class="w-100 h-100" style="border-radius: 10px">
          <button
            @click="goHome()"
            class="bg-white d-flex justify-content-center p-4"
            style="border-radius: 10px; border: 0"
          >
            <font-awesome-icon
              icon="fa-right-to-bracket"
              style="font-size: 25px"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ path: "/home" });
    },
  },
};
</script>

<style></style>
