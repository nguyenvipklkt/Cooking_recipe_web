<template>
  <div class="w-100">
    <Header></Header>
    <div class="w-100 row m-0" style="background-color: #f1f1f1">
      <div class="d-none d-xl-block col-3 p-2">
        <div class="w-100 h-100 bg-white" style="border-radius: 10px">
          <Menu></Menu>
        </div>
      </div>
      <div class="col-12 col-xl-9 p-2">
        <div class="w-100 h-100 bg-white" style="border-radius: 10px">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
