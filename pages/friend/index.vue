<template>
  <div class="d-flex justify-content-center">
    <div>
      <div
        class="d-flex justify-content-center bg-white p-4 mb-4"
        style="border-radius: 8px"
      >
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
      <div v-for="story in stories">
        <div class="d-flex justify-content-center mb-4" style="color: #000">
          <div class="p-3 bg-white" style="width: 700px; border-radius: 8px">
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <NuxtLink
                  :to="{
                    path: '/user',
                    query: { page: story.userId },
                  }"
                >
                  <img
                    class="me-2"
                    :src="[formatImage(story.authorAvatar)]"
                    alt=""
                    style="width: 55px; border-radius: 50%"
                  />
                </NuxtLink>
                <div>
                  <NuxtLink
                    :to="{
                      path: '/user',
                      query: { page: story.userId },
                    }"
                    style="text-decoration: none; color: #000"
                  >
                    <div style="font-size: 15px; font-weight: 500">
                      {{ story.authorFirstName + " " + story.authorLastName }}
                    </div>
                  </NuxtLink>
                  <div style="font-size: 15px">
                    {{ countDate(story.createdDate) }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-center mb-2"
              style="font-size: 25px; font-weight: 500"
            >
              {{ story.name }}
            </div>
            <div class="d-flex justify-content-center mb-2">
              <video
                v-if="story.video"
                width="640"
                height="360"
                :src="[formatImage(story.video)]"
                controls
                class="mb-4"
                type="video/mp4"
              ></video>
              <img
                v-else
                :src="[formatImage(story.thumbnails)]"
                alt=""
                style="width: 360px; border: 5px solid #fff"
              />
            </div>
            <div
              class="d-flex justify-content-center"
              style="text-align: center; font-size: 15px"
            >
              {{ story.title }}
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <div class="me-3 d-flex align-items-center">
                  <font-awesome-icon icon="clock" style="font-size: 30px" />
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 600">Chuẩn bị</div>
                  <div>{{ story.preparationTime + " Phút" }}</div>
                </div>
              </div>
              <div class="d-flex">
                <div class="me-3 d-flex align-items-center">
                  <font-awesome-icon
                    icon="kitchen-set"
                    style="font-size: 30px"
                  />
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 600">Nấu nướng</div>
                  <div>{{ story.cookingTime + " Phút" }}</div>
                </div>
              </div>
              <div class="d-flex">
                <div class="me-3 d-flex align-items-center">
                  <font-awesome-icon icon="bowl-food" style="font-size: 30px" />
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 600">Khẩu phần</div>
                  <div>{{ story.meal + " Người" }}</div>
                </div>
              </div>
              <div class="d-flex">
                <div class="me-3 d-flex align-items-center">
                  <font-awesome-icon icon="5" style="font-size: 30px" />
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 600">Độ khó</div>
                  <div>{{ story.levelOfDifficult + "/5" }}</div>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-center">
              <button
                @click="updateView(story.id)"
                class="d-flex align-items-center p-3 btn-detail-story"
                style="text-decoration: none"
              >
                <font-awesome-icon
                  class="me-2"
                  icon="fa-solid fa-circle-info"
                />
                <div>Chi tiết bài viết</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";
definePageMeta({
  layout: "friend",
});

export default {
  mixins: [CookingRecipeAxios, Utility],
  components: {},
  async beforeMount() {
    await this.getUserByLocalstorage();
    await this.getFoodByFollowingUser();
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
    async getFoodByFollowingUser() {
      const data = await this.Get("api/Food/GetFoodByFollowingUser", {});
      if (data.code == "Ok") {
        this.stories = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
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

<style scoped>
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
  color: #000;
  font-size: 18px;
  border: 0px;
  background-color: #f0f2f5;
}

.btn-detail-story:hover {
  background-color: #e4e6e9;
}
</style>
