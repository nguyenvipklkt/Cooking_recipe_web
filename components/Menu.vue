<template>
  <div class="w-100 d-flex justify-content-center p-3">
    <div>
      <div class="h4 mb-4 d-flex justify-content-center">
        Món ăn được xem nhiều nhất
      </div>
      <div v-for="(story, index) in stories">
        <div class="mb-4">
          <div class="d-flex justify-content-center" style="font-size: 18px">
            <div class="me-3">
              <font-awesome-icon icon="fa-solid fa-trophy" />
            </div>
            <div>{{ index + 1 }}</div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              @click="updateView(story.id)"
              style="
                font-size: 15px;
                border: 0;
                background-color: #fff;
                font-weight: 600;
              "
            >
              {{ story.name }}
            </button>
          </div>
          <img
            @click="updateView(story.id)"
            :src="[formatImage(story.thumbnails)]"
            alt=""
            style="
              width: 360px;
              height: 243px;
              border: 5px solid #fff;
              cursor: pointer;
              border-radius: 8px;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";

export default {
  mixins: [CookingRecipeAxios, Utility],
  components: {},
  async beforeMount() {
    await this.getStoryInHighestView();
  },
  data() {
    return {
      stories: [],
    };
  },
  methods: {
    async getStoryInHighestView() {
      const data = await this.Get("api/Story/GetStoryHighestView", {});
      if (data.code == "Ok") {
        this.stories = data.data;
      } else {
        this.$toast.error("Lỗi lấy dữ liệu các bài viết có view cao rồi", {
          autoClose: 2000,
        });
      }
    },
    async updateView(foodId) {
      const data = await this.Post(`api/Story/AddView?foodId=${foodId}`, {});
      if (data.code == "Ok") {
        this.$router.push({ path: "/story", query: { page: foodId } });
      } else {
        this.$router.push({ path: "/story", query: { page: foodId } });
      }
    },
  },
};
</script>

<style></style>
