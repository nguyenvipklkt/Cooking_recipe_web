<template>
  <div class="d-flex justify-content-center">
    <div class="h-100" style="background-color: #f1f1f1">
      <div v-if="!isHaveResult">
        <div
          class="d-flex justify-content-center mb-4 bg-white p-4 h3"
          style="border-radius: 8px"
        >
          Không có kết quả tìm kiếm nào !
        </div>
        <div class="vh-100"></div>
      </div>
      <div v-if="isHaveResult" v-for="story in stories">
        <div class="d-flex justify-content-center mb-4" style="color: #000">
          <div class="p-3 bg-white" style="width: 700px; border-radius: 8px">
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <NuxtLink
                  :to="{
                    path: checkUser(story.userId),
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
                      path: checkUser(story.userId),
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
              <div style="font-size: 25px" class="setting-in-story">
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
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
definePageMeta({
  layout: "search",
});
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";

export default {
  mixins: [CookingRecipeAxios, Utility],
  components: {},
  data() {
    return {
      isHaveResult: false,
      stories: [],
    };
  },
  async beforeMount() {
    await this.search();
  },
  methods: {
    async search() {
      const res = await this.Get(
        `api/Food/Search?keyword=${this.$route.query.page}`,
        {}
      );
      if (res.code == "Ok") {
        this.stories = res.data;
        if (this.stories == "") {
          this.isHaveResult = false;
        } else {
          this.isHaveResult = true;
        }
      } else {
        this.$toast.error("Lỗi tìm kiếm rồi bạn ơi !", {
          autoClose: 1000,
        });
      }
    },
    checkUser(id) {
      var userInStorage = JSON.parse(localStorage.getItem("user"));
      if (id != userInStorage.id) {
        return "/user";
      }
      return "/profile";
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

<style scoped></style>
