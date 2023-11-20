<template>
  <div>
    <div class="w-100">
      <div style="padding: 0 6%">
        <div class="w-100">
          <div
            :style="'background-image: url(' + formatCover(profile.cover) + ')'"
            style="
              z-index: 1;
              background-size: cover;
              height: 400px;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
              position: relative;
            "
          ></div>
        </div>
        <div style="height: 140px">
          <div
            class="d-flex position-absolute"
            style="z-index: 2; top: 420px; left: 130px"
          >
            <div class="me-3">
              <img
                :src="[formatImage(profile.avatar)]"
                alt=""
                style="width: 150px; border-radius: 50%; border: 5px solid #fff"
              />
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div>
                <div style="height: 50px"></div>
                <div class="h3">
                  {{ profile.firstName + " " + profile.lastName }}
                </div>
                <div class="d-flex justify-content-between">
                  <div class="h6">{{ follow.length + " Đang theo dõi" }}</div>
                  <div style="width: 40px"></div>
                  <div class="h6">{{ follower.length + " Đã theo dõi" }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center position-absolute"
            style="z-index: 2; top: 510px; right: 150px"
          >
            <div>
              <div class="d-flex">
                <button
                  v-if="!isFollow"
                  class="me-4 py-2 px-3 btn-new-post text-decoration-none user-select-none"
                  @click="followUser()"
                >
                  Theo dõi
                </button>
                <button class="px-4 py-2 me-4 btn-edit-profile" v-if="isFollow">
                  Đã theo dõi
                </button>
                <button
                  class="px-4 py-2 btn btn-danger"
                  v-if="isFollow"
                  @click="unfollow()"
                >
                  Huỷ theo dõi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="" style="background-color: #f0f2f5; padding: 0 5%">
        <div class="w-100">
          <div style="height: 20px"></div>
          <div class="row w-100 m-0">
            <div class="d-none d-xl-block col-4">
              <div class="w-100 h-100 bg-white" style="border-radius: 10px">
                <div style="height: 10px"></div>
                <div class="mx-3" style="font-weight: 600; font-size: 24px">
                  Giới thiệu
                </div>
                <div class="my-3 d-flex w-100 justify-content-center h5">
                  {{ formatTitle(profile.title) }}
                </div>
                <div></div>
                <div class="d-flex w-100 justify-content-center">
                  <div class="" style="font-size: 17px">
                    <div class="my-3 d-flex">
                      <div class="me-2">
                        <font-awesome-icon icon="fa-solid fa-cake-candles" />
                      </div>
                      <div>Sinh nhật : {{ formatDate(profile.birthday) }}</div>
                    </div>
                    <div class="my-3 d-flex">
                      <div class="me-2">
                        <font-awesome-icon icon="fa-solid fa-envelope" />
                      </div>
                      <div>Email : {{ profile.email }}</div>
                    </div>
                    <div class="my-3 d-flex">
                      <div class="me-2">
                        <font-awesome-icon icon="fa-solid fa-phone" />
                      </div>
                      <div>Số điện thoại : {{ profile.phoneNumber }}</div>
                    </div>
                    <div class="my-3 d-flex">
                      <div class="me-2">
                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                      </div>
                      <div>Địa chỉ : {{ profile.address }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-xl-8">
              <div class="w-100 h-100 bg-white" style="border-radius: 10px">
                <div style="height: 20px"></div>

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
                          <img
                            class="me-2"
                            :src="[formatImage(profile.avatar)]"
                            alt=""
                            style="width: 55px; border-radius: 50%"
                          />
                          <div>
                            <div style="font-size: 18px; font-weight: 500">
                              {{ profile.firstName + " " + profile.lastName }}
                            </div>
                            <div style="font-size: 15px">
                              {{ countDate(story.createdDate) }}
                            </div>
                          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "profile",
});
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";
export default {
  mixins: [CookingRecipeAxios, Utility],
  async beforeMount() {
    await this.getProfile();
    await this.getFollow();
    await this.getFollower();
    await this.getFoodList();
    await this.UpdateFollowInLocal();
    await this.UpdateFollowerInLocal();
    this.checkfollow();
  },

  data() {
    return {
      isFollow: false,
      follow: [],
      follower: [],
      profile: [],
      fileA: [],
      fileB: [],
      stories: [],
    };
  },
  methods: {
    async getProfile() {
      let userId = this.$route.query.page;
      var data = await this.Get(`api/Account/GetUserInf?userId=${userId}`, {});
      if (data.code == "Ok") {
        this.profile = data.data;
        this.fileB[0] = this.convertUrlToFile(this.profile.avatar);
        this.fileA[0] = this.convertUrlToFile(this.profile.cover);
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async getFollow() {
      let userId = this.$route.query.page;
      var data = await this.Get(
        `api/Follow/GetFollowOtherUser?userId=${userId}`,
        {}
      );
      if (data.code == "Ok") {
        this.follow = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async getFollower() {
      let userId = this.$route.query.page;
      var data = await this.Get(
        `api/Follow/GetFollowerInOther?userId=${userId}`,
        {}
      );
      if (data.code == "Ok") {
        this.follower = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    formatTitle(abc) {
      if (abc == "") {
        return `Tên này rất lười, không tiết lộ cái gì hết !`;
      } else {
        return abc;
      }
    },
    async getFoodList() {
      let userId = this.$route.query.page;
      var data = await this.Get(
        `api/Food/GetFoodListWithOtherUser?userId=${userId}`,
        {}
      );
      if (data.code == "Ok") {
        // this.stories = JSON.stringify(data.data);
        this.stories = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async checkfollow() {
      var followInLocal = JSON.parse(localStorage.getItem("follow"));
      let userId = this.$route.query.page;
      for (var i = 0; i < followInLocal.length; i++) {
        if (followInLocal[i].followingUserId == userId) {
          this.isFollow = true;
        }
      }
    },
    async followUser() {
      let userId = this.$route.query.page;
      const res = await this.Post("api/Follow/Follow", {
        followingUserId: userId,
      });
      if (res.code == "Ok") {
        this.$toast.success("Bạn đã theo dõi thành công !", {
          autoClose: 1000,
        });
        setTimeout(() => {
          reloadNuxtApp();
        }, 1000);
      } else {
        this.$toast.error("Theo dõi thất bại !", {
          autoClose: 2000,
        });
      }
    },
    async UpdateFollowInLocal() {
      var data = await this.Get("api/Follow/GetFollowUser", {});
      if (data.code == "Ok") {
        this.follow = data.data;
        localStorage.setItem("follow", JSON.stringify(this.follow));
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async UpdateFollowerInLocal() {
      var data = await this.Get("api/Follow/GetFollower", {});
      if (data.code == "Ok") {
        this.follower = data.data;
        localStorage.setItem("follower", JSON.stringify(this.follower));
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async unfollow() {
      let userId = this.$route.query.page;
      const res = await this.Delete(
        `api/Follow/UnFollow/?followingUserId=${userId}`,
        {
          followingUserId: userId,
        }
      );
      if (res.code == "Ok") {
        this.isFollow = false;
        this.$toast.success("Bạn huỷ theo dõi thành công !", {
          autoClose: 1000,
        });
        setTimeout(() => {
          reloadNuxtApp();
        }, 1000);
      } else {
        this.$toast.error("Huỷ theo dõi thất bại !", {
          autoClose: 1000,
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-new-post {
  border-radius: 8px;
  background-color: #0866ff;
  color: #fff;
  border: 1px solid #0866ff;
  font-size: 17px;
}

.btn-new-post:hover {
  background-color: #085ce6;
  border: 1px solid #085ce6;
}

.btn-edit-profile {
  border-radius: 8px;
  background-color: #e4e6eb;
  font-size: 17px;
  border: 1px solid #e4e6eb;
  font-weight: 500;
}

.btn-what-do-you-think {
  border-radius: 8px;
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

.btn-detail-story {
  color: #c49368;
  font-size: 18px;
  border: 0px;
  background-color: #fff1b3;
}

.btn-detail-story:hover {
  background-color: #ffec99;
}
</style>
