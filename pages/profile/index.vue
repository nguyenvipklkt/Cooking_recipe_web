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
                <NuxtLink
                  :to="{ path: '/post-story' }"
                  class="me-4 py-2 px-3 btn-new-post text-decoration-none user-select-none"
                  >Bài viết mới</NuxtLink
                >
                <button class="px-4 py-2 btn-edit-profile" @click="openModal()">
                  Chỉnh sửa trang cá nhân
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
              <div class="w-100 bg-white" style="border-radius: 10px">
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
                    <div class="my-3 d-flex mb-4">
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
              <div class="w-100 h-100" style="border-radius: 10px">
                <div
                  class="d-flex justify-content-center mb-4 bg-white py-4"
                  style="border-radius: 8px"
                >
                  <img
                    class="me-2"
                    :src="[formatImage(profile.avatar)]"
                    alt=""
                    style="width: 45px; border-radius: 50%"
                  />
                  <NuxtLink
                    :to="{ path: '/post-story' }"
                    style="text-decoration: none; color: #000"
                    ><div class="btn-what-do-you-think">
                      Bạn đang nghĩ gì thế ?
                    </div></NuxtLink
                  >
                </div>
                <div v-for="story in stories.reverse()">
                  <div class="d-flex justify-content-center mb-4">
                    <div
                      class="p-3"
                      style="
                        background-color: #fff;
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
                        <div class="dropdown setting-in-story">
                          <font-awesome-icon
                            icon="fa-solid fa-ellipsis-vertical"
                            style="font-size: 25px"
                          />
                          <div class="dropdown-content">
                            <NuxtLink
                              :to="{
                                path: '/update-story',
                                query: { story: story.id },
                              }"
                            >
                              Chỉnh sửa bài viết
                            </NuxtLink>
                            <a href="#" @click="deleteStory(story.id)"
                              >Xoá bài viết</a
                            >
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
                            <font-awesome-icon
                              icon="clock"
                              style="font-size: 30px"
                            />
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
                            <font-awesome-icon
                              icon="5"
                              style="font-size: 30px"
                            />
                          </div>
                          <div>
                            <div style="font-size: 13px; font-weight: 600">
                              Độ khó
                            </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal update profile -->

  <div id="myModal" class="modal" v-if="isOpenModal">
    <!-- Modal content -->
    <form action="" v-on:submit.prevent="updateProfile()">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="p-3">Edit profile</h2>
          <span class="close" @click="openModal()">&times;</span>
        </div>
        <div class="modal-body">
          <div style="height: 20px"></div>
          <div
            class="d-flex mb-4 mt-2 justify-content-between align-items-center"
            style="font-family: Florence, cursive"
          >
            <div style="font-size: 17px">Cover :</div>
            <VueFileAgent
              :uploadUrl="uploadUrl"
              v-model:raw-model-value="fileA"
            ></VueFileAgent>
          </div>
          <div
            class="d-flex mb-4 mt-2 justify-content-between align-items-center"
            style="font-family: Florence, cursive"
          >
            <div style="font-size: 17px">Avatar :</div>
            <VueFileAgent
              :uploadUrl="uploadUrl"
              v-model:raw-model-value="fileB"
            ></VueFileAgent>
          </div>
          <textarea
            class="form-control"
            style="resize: none; font-family: Florence, cursive"
            rows="3"
            v-model="modelUser.title"
            placeholder="Title"
            required
          ></textarea>
          <div class="" style="font-size: 17px; font-family: Florence, cursive">
            <div class="d-flex justify-content-between my-4">
              <textarea
                class="form-control"
                style="resize: none; width: 150px"
                rows="1"
                placeholder="First name"
                v-model="modelUser.firstName"
                required
              ></textarea>
              <textarea
                class="form-control"
                style="resize: none; width: 150px"
                rows="1"
                placeholder="Last name"
                v-model="modelUser.lastName"
                required
              ></textarea>
              <textarea
                class="form-control"
                style="resize: none; width: 150px"
                rows="1"
                placeholder="Address"
                v-model="modelUser.address"
                required
              ></textarea>
            </div>
            <textarea
              class="form-control my-4"
              style="resize: none"
              rows="1"
              v-model="modelUser.phoneNumber"
              placeholder="Phone number"
              required
            ></textarea>
            <div class="input-group mb-2">
              <input
                type="datetime-local"
                class="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                v-model="modelUser.birthday"
                required
              />
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="mx-3 btn-update-profile">
            Save change
          </button>
        </div>
      </div>
    </form>
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
  components: {},
  async beforeMount() {
    await this.getProfile();
    await this.getFollow();
    await this.getFollower();
    await this.getFoodList();
  },

  data() {
    return {
      isOpenModal: false,
      follow: [],
      follower: [],
      profile: [],
      modelUser: {
        firstName: "",
        lastName: "",
        title: "",
        phoneNumber: "",
        birthday: "",
        address: "",
      },
      fileA: [],
      fileB: [],
      stories: [],
    };
  },
  methods: {
    async getProfile() {
      var data = await this.Get("api/Account/GetProfile", {});
      if (data.code == "Ok") {
        this.profile = data.data;
        localStorage.setItem("user", JSON.stringify(this.profile));
        this.modelUser = this.profile;
        this.fileB[0] = this.convertUrlToFile(this.profile.avatar);
        this.fileA[0] = this.convertUrlToFile(this.profile.cover);
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async updateProfile() {
      const formData = new FormData();
      formData.append("avatar", this.fileB[0].file, this.fileB[0].file.name);
      formData.append("cover", this.fileA[0].file, this.fileA[0].file.name);
      formData.append("title", this.modelUser.title);
      formData.append("firstName", this.modelUser.firstName);
      formData.append("lastName", this.modelUser.lastName);
      formData.append("phoneNumber", this.modelUser.phoneNumber);
      formData.append("address", this.modelUser.address);
      formData.append("birthday", this.modelUser.birthday);
      const response = await this.PutFormData(
        "api/Account/UpdateProfile",
        formData
      );
      if (response.code == "Ok") {
        this.$toast.success("Change information successfull !", {
          autoClose: 1000,
        });
        setTimeout(() => {
          reloadNuxtApp();
        }, 1000);
      } else {
        this.$toast.error("Change information fail !", {
          autoClose: 2000,
        });
      }
    },
    async getFollow() {
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
    async getFollower() {
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
    formatTitle(abc) {
      if (abc == "") {
        return `Tên này rất lười, không tiết lộ cái gì hết !`;
      } else {
        return abc;
      }
    },
    openModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    async getFoodList() {
      var data = await this.Get("api/Food/GetFoodListWithUser", {});
      if (data.code == "Ok") {
        // this.stories = JSON.stringify(data.data);
        this.stories = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async deleteStory(foodId) {
      const res = await this.Delete(
        `api/Story/DeleteStory?foodId=${foodId}`,
        {}
      );
      if (res.code == "Ok") {
        this.$toast.success("Xoá bài viết thành công", {
          autoClose: 1000,
        });
        setTimeout(() => {
          this.$router.push({ path: "/" });
        }, 1000);
      } else {
        this.$toast.error("xoá bài viết thất bại !", {
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

.btn-edit-profile:hover {
  background-color: #d8dadf;
  border: 1px solid #d8dadf;
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

/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 4; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: #000;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #f0f2f5;
  color: #000;
  font-family: Florence, cursive;
}

.modal-body {
  padding: 2px 16px;
}

.modal-footer {
  padding: 10px 16px;
  background-color: #f0f2f5;
  color: white;
}

.btn-update-profile {
  border-radius: 10px;
  border: 10px;
  color: #fff;
  background-color: #0866ff;
  padding: 10px;
}
.btn-update-profile:hover {
  background-color: #085ce6;
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

.dropdown {
  position: relative;
  display: inline-block;
  padding: 15px 20px 10px 20px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  right: 40px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 6;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #e4e6eb;
}
.setting-in-story:hover {
  background-color: #e4e6eb;
  border-radius: 8px;
  cursor: pointer;
}
</style>
