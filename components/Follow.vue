<template>
  <div class="w-100 p-2">
    <div>
      <div class="mb-4 d-flex justify-content-center" style="color: 18px">
        Người bạn theo dõi
      </div>
      <div
        class="d-flex justify-content-between mb-2 p-2"
        v-for="user in followingUserInf"
      >
        <div class="d-flex justify-content-center">
          <NuxtLink
            :to="{
              path: '/user',
              query: { page: user.id },
            }"
          >
            <img
              class="me-2"
              :src="[formatImage(user.avatar)]"
              alt=""
              style="width: 32px; border-radius: 50%"
            />
          </NuxtLink>
          <div class="d-flex align-items-center">
            <NuxtLink
              :to="{
                path: '/user',
                query: { page: user.id },
              }"
              style="text-decoration: none; color: #000"
              >{{ user.firstName + " " + user.lastName }}</NuxtLink
            >
          </div>
        </div>
        <div class="drop-down-detail-follow">
          <button class="btn-detail-follow">
            <font-awesome-icon
              style="font-size: 20px"
              icon="fa-solid fa-ellipsis"
            />
          </button>
          <div class="drop-down-content-detail-follow">
            <button @click="unfollow(user.id)">Huỷ theo dõi</button>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
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
    await this.getFollow();
    await this.getFollowingUserInf();
  },
  data() {
    return {
      follow: [],
      followingUserInf: [],
      follower: [],
    };
  },
  methods: {
    async getFollow() {
      var data = await this.Get("api/Follow/GetFollowUser", {});
      if (data.code == "Ok") {
        this.follow = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async getFollowingUserInf() {
      for (let i = 0; i < this.follow.length; i++) {
        var data = await this.Get(
          `api/Account/GetUserInf?userId=${this.follow[i].followingUserId}`,
          {}
        );
        if (data.code == "Ok") {
          this.followingUserInf[i] = data.data;
        } else {
          this.$toast.error(`${data.des}`, {
            autoClose: 1000,
          });
        }
      }
    },
    async unfollow(userId) {
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
.btn-detail-follow {
  border: 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 5px 10px 5px 10px;
  position: relative;
}

.btn-detail-follow:hover {
  background-color: #e4e6eb;
}

.drop-down-detail-follow:hover .drop-down-content-detail-follow {
  display: block;
}
.drop-down-content-detail-follow {
  position: absolute;
  display: none;
  z-index: 6;

  left: 197px;
}

.drop-down-content-detail-follow button {
  background-color: #f0f2f5;
  border: 0;
  padding: 10px 25px 10px 25px;
  text-decoration: none;
  color: #000;
  font-size: 13px;
}

.drop-down-content-detail-follow button:hover {
  background-color: #e4e6e9;
}
</style>
