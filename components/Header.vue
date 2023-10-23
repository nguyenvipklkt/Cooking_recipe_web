<template>
  <div
    class="w-100 d-flex justify-content-between"
    style="
      height: 70px;
      background-color: #ffeede;
      padding: 0 12px;
      font-family: Florence, cursive;
    "
  >
    <div
      class="d-flex py-1 align-items-center"
      style="width: 215px; min-height: 100%"
    >
      <img src="/favicon.ico" alt="" style="height: 100%" class="me-5" />
      <div class="d-flex justyfy-content-center align-items-center">
        <div style="height: 34px" class="search d-flex">
          <input type="text" class="search-input" placeholder=" Search..." />
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="glass-icon"
          />
        </div>
      </div>
    </div>
    <div
      class="align-items-center d-none d-lg-flex justify-content-between"
      style="background-color: #ffeede; border-radius: 12px"
    >
      <div>
        <font-awesome-icon class="icon-main-header" icon="fa-solid fa-house" />
      </div>
      <div>
        <font-awesome-icon
          class="icon-main-header"
          icon="fa-solid fa-user-group"
        />
      </div>
      <div>
        <font-awesome-icon class="icon-main-header" icon="fa-solid fa-tv" />
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div>
        <font-awesome-icon
          class="logout-icon"
          icon="fa-solid fa-user"
          @click="account_click"
        />
      </div>
    </div>
  </div>
  <!-- <div
    class="w-100 d-flex justify-content-between"
    style="
      height: 70px;
      background-color: #ffeede;
      padding: 0 12px;
      font-family: Florence, cursive;
    "
  >
    <div style="width: 30%; height: 100%; background-color: red"></div>
    <div style="width: 60%; height: 100%; background-color: red"></div>
  </div> -->
  <!-- <div
    class="w-100 d-flex"
    style="
      height: 70px;
      background-color: #ffeede;
      padding: 0 12px;
      font-family: Florence, cursive;
    "
  >
    <div
      class="d-none d-lg-flex py-1 align-items-center me-3"
      style="width: 215px; min-height: 100%"
    >
      <img src="/favicon.ico" alt="" style="height: 100%" />
      <div style="width: 5px"></div>
      <div>
        <div style="font-size: 15px; padding: 0">Cooking</div>
        <div style="font-size: 12px; padding: 0">Socializing & Sharing</div>
      </div>
    </div>
    <div class="d-flex d-lg-none align-items-center me-3">
      <font-awesome-icon icon="fa-solid fa-bars" style="width: 100px" />
    </div>
    <div class="d-flex justyfy-content-center align-items-center">
      <div style="height: 34px" class="search d-flex">
        <input type="text" class="search-input" placeholder=" Search..." />
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
          class="glass-icon"
        />
      </div>
    </div>
    <div style="width: 100px"></div>
    <div
      class="align-items-center d-none d-lg-flex"
      style="background-color: #fff; padding: 23px"
    >
      <div>
        <font-awesome-icon style="width: 100px" icon="fa-solid fa-house" />
      </div>
      <div style="width: 100px"></div>
      <div>
        <font-awesome-icon style="width: 100px" icon="fa-solid fa-user-group" />
      </div>
      <div style="width: 100px"></div>
      <div>
        <font-awesome-icon style="width: 100px" icon="fa-solid fa-user" />
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div>
        <font-awesome-icon
          style="width: 100px"
          icon="fa-solid fa-right-from-bracket"
        />
      </div>
    </div>
  </div> -->
  <!-- modal profile  -->
  <div v-if="isOpenAccountModal" class="account-modal">
    <div class="vh-100 w-100">
      <div class="w-100 d-flex">
        <div
          @click="account_click"
          style="height: 100vh; width: calc(100% - 414px)"
        ></div>
        <div
          class="account-container p-2"
          style="width: 414px; height: 100vh; background-color: #ffeede"
        >
          <div class="d-flex w-100 justify-content-between">
            <div></div>
            <div @click="account_click">
              <font-awesome-icon
                icon="fa-solid fa-xmark"
                style="font-size: 20px; cursor: pointer"
              />
            </div>
          </div>
          <div
            class="h3 d-flex justify-content-center mb-4"
            style="font-family: Florence, cursive; color: #e6bb00"
          >
            Cooking profile
          </div>
          <div class="d-flex justify-content-center">
            <div>
              <div class="d-flex mb-4">
                <div class="ms-2 me-4">
                  <img
                    src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                    alt="avatar"
                    style="border-radius: 100%; width: 100px"
                  />
                </div>
                <div class="align-items-center justify-content-center d-flex">
                  <div class="">
                    <div class="h4 mb-1" style="font-family: Florence, cursive">
                      {{ profile.firstName }}
                    </div>
                    <div style="font-family: Florence, cursive">5 contacts</div>
                  </div>
                </div>
              </div>
              <div
                class="d-flex mx-3 mb-4 py-1 justify-content-center"
                style="
                  border: 2px solid #000;
                  height: 70px;
                  font-size: 15px;
                  font-family: Florence, cursive;
                "
              >
                title...
              </div>
              <div class="d-flex w-100 mb-4 mx-2">
                <div
                  class=""
                  style="font-size: 17px; font-family: Florence, cursive"
                >
                  <div class="my-3">
                    Name : {{ profile.firstName + profile.lastName }}
                  </div>
                  <div class="my-3">
                    Birthday : {{ formatDate(profile.birthday) }}
                  </div>
                  <div class="my-3">Email : {{ profile.email }}</div>
                  <div class="my-3">Address : {{ profile.address }}</div>
                  <div class="my-3">Number of post : 0</div>
                </div>
              </div>
              <div class="w-100 mb-3 justify-content-center d-flex" style="">
                <div class="">
                  <button class="mx-3 btn-update-profile">
                    Update profile
                  </button>
                  <button class="mx-3 btn-change-password">
                    Change password
                  </button>
                </div>
              </div>
              <div class="d-flex m-3">
                <button class="btn-update-profile" @click="logout">
                  <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                  Logout
                </button>
              </div>
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
export default {
  mixins: [CookingRecipeAxios, Utility],
  components: {},
  async beforeMount() {
    await this.getProfile();
  },

  data() {
    return {
      isOpenAccountModal: false,
      profile: [],
    };
  },
  methods: {
    account_click() {
      this.isOpenAccountModal = !this.isOpenAccountModal;
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
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
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

.modal-backdrop.show {
  display: none;
}
</style>
