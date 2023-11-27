<template>
  <div class="w-100 h-100" style="background-color: #f1f1f1">
    <Header></Header>
    <div class="row m-0 h-100" style="background-color: #f1f1f1">
      <div class="col-3 px-2 pt-3 h-100">
        <div style="background-color: #fff; border-radius: 8px"><Follow /></div>
      </div>
      <div class="col-3 px-2 pt-3">
        <div style="background-color: #fff; border-radius: 8px">
          <Follower />
        </div>
      </div>
      <div class="col-6 px-2 pt-3">
        <div style="background-color: #f1f1f1; border-radius: 8px">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "noneLayout",
};
</script>
<style></style>
