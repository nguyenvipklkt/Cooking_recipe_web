<template>
  <div>
    <div class="d-flex justify-content-center">
      <div>
        <div class="bg-white py-4" style="border-radius: 8px">
          <div class="d-flex justify-content-center h3 mb-2">
            Mùa đông này ăn gì ?
          </div>
          <div class="d-flex justify-content-center">
            <BCarousel controls indicators>
              <BCarouselSlide
                v-for="(item, index) in storiesInTrend"
                :key="index"
                style="width: 400px; height: 220px"
                @click="updateView(item.id)"
                :img-src="[formatImage(item.thumbnails)]"
                :caption="item.name"
              />
            </BCarousel>
          </div>
        </div>
        <div
          class="d-flex justify-content-center mt-5 mb-4 bg-white p-4"
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
        <form action="" v-on:submit.prevent="searchForId()">
          <div class="d-flex justify-content-center mb-4 p-4">
            <div class="bg-white p-2 me-5" style="border-radius: 8px">
              <label class="me-2">Chọn món</label>
              <select style="height: 37px" v-model="foodTypeId">
                <option value="1">kho</option>
                <option value="2">chiên</option>
                <option value="3">xào</option>
                <option value="4">nướng</option>
                <option value="5">gỏi/nộm</option>
                <option value="6">canh/súp</option>
                <option value="7">hấp</option>
                <option value="8">lẩu</option>
                <option value="9">khác</option>
              </select>
            </div>
            <div class="bg-white p-2 me-5" style="border-radius: 8px">
              <label class="me-2">Miền</label>
              <select style="height: 37px" v-model="foodPlaceId">
                <option value="1">Miền bắc</option>
                <option value="2">Miền trung</option>
                <option value="3">Miền nam</option>
                <option value="4">Ba miền</option>
              </select>
            </div>
            <div class="bg-white p-2 me-5" style="border-radius: 8px">
              <label class="me-2">Mùa</label>
              <select style="height: 37px" v-model="seasonalFoodId">
                <option value="1">Mùa xuân</option>
                <option value="2">Mùa hạ</option>
                <option value="3">Mùa thu</option>
                <option value="4">Mùa đông</option>
                <option value="5">Mùa mưa</option>
                <option value="6">Mùa khô</option>
                <option value="7">Mọi mùa</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary px-4">Tìm kiếm</button>
          </div>
        </form>
        <div v-for="story in stories.reverse()">
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
                    <div style="font-size: 13px; font-weight: 600">
                      Chuẩn bị
                    </div>
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
                    <div style="font-size: 13px; font-weight: 600">
                      Nấu nướng
                    </div>
                    <div>{{ story.cookingTime + " Phút" }}</div>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="me-3 d-flex align-items-center">
                    <font-awesome-icon
                      icon="bowl-food"
                      style="font-size: 30px"
                    />
                  </div>
                  <div>
                    <div style="font-size: 13px; font-weight: 600">
                      Khẩu phần
                    </div>
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
                <div
                  class="ms-4 d-flex align-items-center px-5"
                  style="background-color: #f0f2f5"
                >
                  <!-- <span
                            style="user-select: none; font-size: 24px"
                            :style="'width: ' + story.food.id + 'px;'"
                            v-for="star in 5"
                            :key="star"
                            :class="{
                              rated: star <= story.point,
                            }"
                            >&#9733;</span
                          > -->
                  <div class="star-rating">
                    <span>&star;</span>
                    <span>&star;</span>
                    <span>&star;</span>
                    <span>&star;</span>
                    <span>&star;</span>
                    <div
                      class="star-rating-current"
                      :style="'width: ' + (story.reviewPoint / 5) * 100 + '%;'"
                    >
                      <span>&starf;</span>
                      <span>&starf;</span>
                      <span>&starf;</span>
                      <span>&starf;</span>
                      <span>&starf;</span>
                    </div>
                  </div>
                </div>
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
    await this.getFoodListInTrend();
    // await this.checkFoodType();
  },
  data() {
    return {
      user: [],
      stories: [],
      storiesInTrend: [],
      haveFoodTypeId: false,
      haveFood: true,
      storiesInFoodType: [],
      foodTypeId: "",
      foodPlaceId: "",
      seasonalFoodId: "",
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
    async getFoodListInTrend() {
      var data = await this.Get("api/Food/GetFoodInTrend", {});
      if (data.code == "Ok") {
        this.storiesInTrend = data.data;
      } else {
        this.$toast.error("Lỗi lấy trend rồi :((", {
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

    searchForId() {
      this.$router.push({
        path: "search-with-filter",
        query: {
          type: this.foodTypeId,
          place: this.foodPlaceId,
          season: this.seasonalFoodId,
        },
      });
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
  color: #000;
  font-size: 18px;
  border: 0px;
  background-color: #f0f2f5;
}

.btn-detail-story:hover {
  background-color: #e4e6e9;
}

.setting-in-story {
  padding: 10px 20px 10px 20px;
}
.setting-in-story:hover {
  background-color: #e4e6eb;
  border-radius: 8px;
  cursor: pointer;
}

.star-rating {
  display: inline-block;
  color: gold;
  font-size: 28px;
  position: relative;
}

.star-rating-current {
  position: absolute;
  top: 0;
  overflow: hidden;
  white-space: nowrap;
}
</style>
