<template>
  <div
    class="w-100 d-flex justify-content-between"
    style="
      height: 70px;
      background-color: #fff;
      padding: 0 12px;
      font-family: Florence, cursive;
      box-shadow: 0px 1px 5px 0px #888888;
    "
  >
    <div
      class="d-flex py-1 align-items-center"
      style="width: 215px; min-height: 100%"
    >
      <img
        @click="returnHome()"
        src="/favicon.ico"
        alt=""
        style="height: 100%; cursor: pointer"
        class="me-5"
      />
      <form action="" v-on:submit.prevent="search()">
        <div class="d-flex justyfy-content-center align-items-center">
          <div style="height: 34px" class="search d-flex dropdown-search">
            <input
              type="text"
              class="search-input"
              v-model="keyword"
              placeholder=" Tìm kiếm..."
              style="background-color: #f0f2f5"
            />
            <button
              class="glass-icon pe-2"
              type="submit"
              style="border: 0; background-color: #f0f2f5; height: 34px"
            >
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
            <div v-if="isKeySearchList" class="dropdown-content-search">
              <div v-for="(keySearch, index) in keySearchList">
                <div class="d-flex justify-content-between">
                  <div
                    @click="search(keySearch.keyword)"
                    class="mb-3"
                    style="border-bottom: 1px solid #000; cursor: pointer"
                  >
                    {{ keySearch.keyword }}
                  </div>
                  <div
                    class=""
                    @click="
                      deleteKeySearch(keySearch.id, keySearch.keyword, index)
                    "
                    style="cursor: pointer"
                  >
                    <font-awesome-icon
                      style="padding: 2px"
                      icon="fa-solid fa-xmark"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      class="align-items-center d-none d-lg-flex justify-content-between"
      style="background-color: #fff; border-radius: 12px"
    >
      <div>
        <NuxtLink :to="{ path: '/' }" style="color: #000">
          <font-awesome-icon
            class="icon-main-header"
            icon="fa-solid fa-house"
          />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink :to="{ path: '/friend' }" style="color: #000"
          ><font-awesome-icon
            class="icon-main-header"
            icon="fa-solid fa-user-group"
        /></NuxtLink>
      </div>
      <div>
        <NuxtLink
          :to="{ path: '/profile', query: { page: user.id } }"
          style="color: #000"
          ><font-awesome-icon class="icon-main-header" icon="fa-solid fa-user"
        /></NuxtLink>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="dropdown-notify" style="float: right">
        <div class="icon-main-setting" @click="toggleDropdownNotification()">
          <font-awesome-icon icon="fa-solid fa-bell" style="font-size: 20px" />
        </div>
        <div v-if="haveNewNotify" class="new-notify"></div>
        <div v-if="isOpenNotification" class="dropdown-content-notify">
          <a
            v-if="isHaveNotificationList"
            v-for="notification in notificationList.reverse()"
          >
            <div
              class="d-flex"
              @click="
                routeFromNotify(
                  notification.reactingUserId,
                  notification.type,
                  notification.foodId
                )
              "
            >
              <img
                class="me-2"
                :src="[formatImage(notification.reactingUserAvatar)]"
                alt=""
                style="width: 45px; border-radius: 50%"
              />
              <div class="d-flex align-items-center">
                <div class="d-flex">
                  <div class="me-2">
                    {{ notification.reactingUserFirstName }}
                  </div>
                  <div class="me-2">
                    {{ notification.reactingUserLastName }}
                  </div>
                  <div>{{ notification.content }}</div>
                </div>
              </div>
            </div>
          </a>
          <a v-else href="">Không có thông báo mới.</a>
        </div>
      </div>
      <div class="dropdown" style="float: right">
        <div class="icon-main-setting" @click="toggleDropdown()">
          <font-awesome-icon icon="fa-solid fa-gear" style="font-size: 20px" />
        </div>
        <div v-if="isOpenDropdown" class="dropdown-content">
          <a href="#" @click="logout()">Đăng xuất</a>
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
    await this.getUserByLocalstorage();
    await this.getProfile();
    await this.getKeySearch();
    await this.getNotification();
    await this.initWebSocket();
  },

  data() {
    return {
      isOpenAccountModal: false,
      isOpenDropdown: false,
      profile: [],
      isOpenChangeProfile: true,
      user: [],
      keyword: "",
      keySearchList: [],
      isKeySearchList: false,
      notificationList: [],
      isOpenNotification: false,
      isHaveNotificationList: false,
      haveNewNotify: false,
    };
  },

  methods: {
    async initWebSocket() {
      let socket = new WebSocket(
        "wss://localhost:50270" + "/ws?username=" + this.user.id
      );
      const _this = this;
      socket.onmessage = function (event) {
        console.log(event.data);
        const message = JSON.parse(event.data);
        if (message.type && message.type === "Notify") {
          _this.addNewNotify();
        }
      };
    },

    async getUserByLocalstorage() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    async logout() {
      this.deleteAllLocalStorages();
      this.deleteAllCookies();
      this.$router.push({ path: "/login" });
    },
    async getProfile() {
      var data = await this.Get("api/Account/GetProfile", {});
      if (data.code == "Ok") {
        this.profile = data.data;
        localStorage.setItem("user", JSON.stringify(this.profile));
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    toggleDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
    toggleDropdownNotification() {
      this.haveNewNotify = false;
      this.isOpenNotification = !this.isOpenNotification;
    },
    search(key) {
      if (!key) {
        if (this.keyword == "") {
          this.$toast.error("Bạn chưa tìm kiếm gì cả !", {
            autoClose: 1000,
          });
        } else {
          this.$router.push({ path: "/search", query: { page: this.keyword } });
        }
      } else {
        this.$router.push({ path: "/search", query: { page: key } });
      }
    },
    async getKeySearch() {
      const data = await this.Get("api/Food/GetKeySearch", {});
      if (data.code == "Ok") {
        this.keySearchList = data.data;
        if (this.keySearchList == "") {
          this.isKeySearchList = false;
        } else {
          this.isKeySearchList = true;
        }
      } else {
        this.$toast.error(`Lỗi lịch sử tìm kiếm`, {
          autoClose: 1000,
        });
      }
    },
    async deleteKeySearch(keyId, keyword, index) {
      const data = await this.Delete(`api/Food/DeleteSearch?id=${keyId}`, {});
      if (data.code == "Ok") {
        this.$toast.success(`Xoá key ${keyword} thành công !`, {
          autoClose: 1000,
        });
        this.keySearchList.splice(index, 1);
      } else {
        this.$toast.error(`Lỗi xoá lịch sử tìm kiếm`, {
          autoClose: 1000,
        });
      }
    },
    returnHome() {
      this.$router.push({ path: "/" });
    },
    async getNotification() {
      const data = await this.Get("api/Notification/GetNotification", {});
      if (data.code == "Ok") {
        this.notificationList = data.data;
        if (this.notificationList != "") {
          this.isHaveNotificationList = true;
        }
      } else {
        this.$toast.error(`Lấy thông báo thất bại`, {
          autoClose: 1000,
        });
      }
    },
    addNewNotify() {
      this.haveNewNotify = true;
      this.getNotification();
    },
    routeFromNotify(reactingUserId, type, foodId) {
      if (type == 2) {
        this.$router.push({ path: "/user", query: { page: reactingUserId } });
      } else {
        this.$router.push({ path: "/story", query: { page: foodId } });
      }
    },
  },
};
</script>

<style scoped>
.search-input {
  border: none;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  outline: none;
  padding: 0 15px;
  width: 200px;
}

.glass-icon {
  padding: 5px;
  background-color: #fff;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  height: 24px;
}

.icon-main-header {
  padding: 30px;
  margin: 20px;
}
.icon-main-header:hover {
  background-color: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
}

.logout-icon {
  padding: 30px;
}

.logout-icon:hover {
  background-color: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
}

/* modal */
.account-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
}

@keyframes FadeLeft {
  from {
    transform: translateX(414px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
  }
}

.account-container {
  animation: FadeLeft ease 0.8s;
}

.icon-hover:hover {
  cursor: pointer;
  opacity: 0.9;
}

.btn-change-password,
.btn-update-profile {
  border-radius: 10px;
  border: 1px solid #e6bb00;
  color: #e6bb00;
  background-color: #fbf3cf;
  padding: 10px;
}

.btn-change-password:hover,
.btn-update-profile:hover {
  color: #fbf3cf;
  background-color: #e6bb00;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.dropdown-notify {
  position: relative;
  display: inline-block;
}
.dropdown-content-notify {
  display: block;
  position: absolute;
  right: -50px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.dropdown-content-notify a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 350px;
}

.new-notify {
  width: 9px;
  height: 9px;
  position: absolute;
  background-color: red;
  border-radius: 50%;
  right: 30px;
  top: 25px;
}
.dropdown-content-notify a:hover {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: #f1f1f1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* .dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
} */

.icon-main-setting {
  padding: 23px 30px;
}

.icon-main-setting:hover {
  background-color: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
}

.dropdown-search {
  position: relative;
  display: inline-block;
}

.dropdown-content-search {
  display: none;
  position: absolute;
  top: 35px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px 10px;
  z-index: 1;
}

.dropdown-search:hover .dropdown-content-search {
  display: block;
}
</style>
