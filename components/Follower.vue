<template>
  <div class="w-100 p-2">
    <div>
      <div class="mb-4 d-flex justify-content-center" style="color: 18px">
        Người theo dõi
      </div>
      <div
        class="d-flex justify-content-between mb-2 p-2"
        v-for="user in followerInf"
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
            <button href="">Huỷ theo dõi</button>
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
    await this.getFollower();
    await this.getFollowerInf();
  },
  data() {
    return {
      follower: [],
      followerInf: [],
    };
  },
  methods: {
    async getFollower() {
      var data = await this.Get("api/Follow/GetFollower", {});
      if (data.code == "Ok") {
        this.follower = data.data;
      } else {
        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
    async getFollowerInf() {
      for (let i = 0; i < this.follower.length; i++) {
        var data = await this.Get(
          `api/Account/GetUserInf?userId=${this.follower[i].userId}`,
          {}
        );
        if (data.code == "Ok") {
          this.followerInf[i] = data.data;
        } else {
          this.$toast.error(`${data.des}`, {
            autoClose: 1000,
          });
        }
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

/* .drop-down-detail-follow:hover .drop-down-content-detail-follow {
  display: block;
} */
.drop-down-content-detail-follow {
  position: absolute;
  display: none;
  z-index: 6;
  left: 575px;
}

/* .drop-down-content-detail-follow button {
  background-color: #f0f2f5;
  border: 0;
  padding: 10px 25px 10px 25px;
  text-decoration: none;
  color: #000;
  font-size: 13px;
}

.drop-down-content-detail-follow button:hover {
  background-color: #e4e6e9;
} */
</style>
