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
          <input type="text" class="search-input" placeholder=" Tìm kiếm..." />
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
        <NuxtLink :to="{ path: '/' }">
          <font-awesome-icon
            class="icon-main-header"
            icon="fa-solid fa-house"
          />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink :to="{}"
          ><font-awesome-icon
            class="icon-main-header"
            icon="fa-solid fa-user-group"
        /></NuxtLink>
      </div>
      <div>
        <NuxtLink :to="{ path: '/profile' }"
          ><font-awesome-icon class="icon-main-header" icon="fa-solid fa-user"
        /></NuxtLink>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="dropdown" style="float: right">
        <div class="icon-main-setting" @click="toggleDropdown()">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </div>
        <div v-if="isOpenDropdown" class="dropdown-content">
          <a href="#" @click="logout()">Logout</a>
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
      isOpenDropdown: false,
      profile: [],
      isOpenChangeProfile: true,
      modelUser: {
        firstName: "",
        lastName: "",
        title: "",
        phoneNumber: "",
        birthday: "",
      },
    };
  },
  methods: {
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
</style>
