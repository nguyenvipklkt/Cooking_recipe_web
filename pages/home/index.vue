<template>
  <div>
    <div class="d-flex justify-content-center">
      <div>
        <div class="d-flex justify-content-center my-4">
          <img
            class="me-2"
            :src="[formatImage(user.avatar)]"
            alt=""
            style="width: 45px; border-radius: 50%"
          />
          <div class="btn-what-do-you-think">What do you think ?</div>
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
  async beforeMount() {
    this.getUserByLocalstorage();
  },
  data() {
    return {
      user: [],
    };
  },
  methods: {
    getUserByLocalstorage() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>

<style scoped>
.btn-post {
  border: none;
  padding: 12px;
  border-radius: 12px;
}
.btn-what-do-you-think {
  border-radius: 25px;
  border: 1px solid #f0f2f5;
  background-color: #f0f2f5;
  padding: 10px 20px 10px 10px;
  width: 400px;
}

.btn-what-do-you-think:hover {
  cursor: pointer;
  background-color: #e4e6e9;
  border: 1px solid #e4e6e9;
}
</style>
