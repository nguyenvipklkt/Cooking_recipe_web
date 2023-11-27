<template>
  <div class="d-flex justify-content-center">
    <div>
      <div style="height: calc(100vh - 80px)" v-if="!isHaveResult">
        <div
          class="d-flex justify-content-center mb-4 bg-white p-4 h3"
          style="border-radius: 8px"
        >
          Không có kết quả tìm kiếm nào !
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";

export default {
  mixins: [CookingRecipeAxios, Utility],
  components: {},
  data() {
    return {
      isHaveResult: false,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
