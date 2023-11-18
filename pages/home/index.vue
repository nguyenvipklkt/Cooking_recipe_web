<template>
  <div>
    <div class="d-flex justify-content-center">
      <div>
        <div class="d-flex justify-content-center my-4">
          <NuxtLink :to="{ path: '/profile' }">
            <img
              class="me-2"
              :src="[formatImage(user.avatar)]"
              alt=""
              style="width: 45px; border-radius: 50%"
            />
          </NuxtLink>
          <NuxtLink :to="{ path: '/post-story' }" style="text-decoration: none"
            ><div class="btn-what-do-you-think">
              Bạn đang nghĩ gì thế ?
            </div></NuxtLink
          >
        </div>
        <div v-for="story in stories.reverse()">
          <div
            class="d-flex justify-content-center mb-4"
            style="color: #be895b"
          >
            <div
              class="p-3"
              style="
                background-color: #fff2e6;
                width: 700px;
                border-radius: 8px;
              "
            >
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <NuxtLink>
                    <img
                      class="me-2"
                      :src="[formatImage(story.authorAvatar)]"
                      alt=""
                      style="width: 55px; border-radius: 50%"
                    />
                  </NuxtLink>
                  <div>
                    <NuxtLink>
                      <div style="font-size: 18px; font-weight: 500">
                        {{ story.authorFirstName + " " + story.authorLastName }}
                      </div>
                    </NuxtLink>
                    <div style="font-size: 15px">
                      {{ countDate(story.createdDate) }}
                    </div>
                  </div>
                </div>
                <div style="font-size: 25px" class="setting-in-story">
                  <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
                </div>
              </div>
              <div
                class="d-flex justify-content-center mb-2"
                style="font-size: 28px; font-weight: 500"
              >
                {{ story.name }}
              </div>
              <div class="d-flex justify-content-center mb-2">
                <img
                  :src="[formatImage(story.thumbnails)]"
                  alt=""
                  style="width: 300px; border: 5px solid #fff"
                />
              </div>
              <div
                class="d-flex justify-content-center"
                style="text-align: center; font-size: 18px"
              >
                {{ story.title }}
              </div>
              <hr />
              <div class="d-flex justify-content-center">
                <NuxtLink
                  :to="{ path: '/story', query: { page: story.id } }"
                  class="d-flex align-items-center p-3 btn-detail-story"
                  style="text-decoration: none"
                >
                  <font-awesome-icon
                    class="me-2"
                    icon="fa-solid fa-circle-info"
                  />
                  <div>Chi tiết bài viết</div>
                </NuxtLink>
              </div>
            </div>
          </div>
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
    await this.getUserByLocalstorage();
    await this.getFoodList();
  },
  data() {
    return {
      user: [],
      stories: [],
    };
  },
  methods: {
    getUserByLocalstorage() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    async getFoodList() {
      var data = await this.Get("api/Food/GetFoodList", {});
      if (data.code == "Ok") {
        this.stories = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async getUserInf(foodId) {
      const data = await this.Get(`api/Food/GetUserInFood?foodId=${foodId}`);
      if (data.code == "Ok") {
        return data.data;
      }
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
  color: #000;
}

.btn-what-do-you-think:hover {
  cursor: pointer;
  background-color: #e4e6e9;
  border: 1px solid #e4e6e9;
}

.btn-detail-story {
  color: #c49368;
  font-size: 18px;
  border: 0px;
  background-color: #fff1b3;
}

.btn-detail-story:hover {
  background-color: #ffec99;
}

.setting-in-story {
  padding: 10px 20px 10px 20px;
}
.setting-in-story:hover {
  background-color: #e4e6eb;
  border-radius: 8px;
  cursor: pointer;
}
</style>
