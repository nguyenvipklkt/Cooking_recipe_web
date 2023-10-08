<template>
  <div
    class="w-100 d-flex"
    style="
      height: 50px;
      background-color: #ffeede;
      padding: 0 12px;
      font-family: Florence, cursive;
    "
  >
    <div
      class="d-none d-md-flex py-1 align-items-center"
      style="width: 215px; min-height: 100%"
    >
      <img src="/favicon.ico" alt="" style="height: 100%" />
      <div style="width: 5px"></div>
      <div>
        <div style="font-size: 15px; padding: 0">Cooking</div>
        <div style="font-size: 12px; padding: 0">Socializing & Sharing</div>
      </div>
    </div>
    <div class="main-header d-flex justify-content-between">
      <div class="d-flex d-md-none align-items-center">
        <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-bars" />
      </div>
      <div
        class="search-container d-flex px-2 justify-content-between"
        style="
          height: 100%;
          width: 220px;
          background-color: #fff;
          border-radius: 3px;
        "
      >
        <div class="h-100 d-flex align-items-center" style="font-size: 15px">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
        <input class="input-key-search" type="text">
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.input-key-search {
    width: 160px;
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 13px;
}

.input-key-search:active {}

.main-header {
    width: calc(100% - 220px);
    padding: 8px 3px;
}
</style>
