<template>
  <div class="w-100 row">
    <div class="col-7 p-0 d-none d-lg-block">
      <div class="w-100 vh-100 bg-register"></div>
    </div>
    <div class="col-12 col-lg-5 p-0" style="background-color: #faf3e3">
      <div
        class="w-100 vh-100 d-flex justify-content-center align-items-center"
      >
        <form v-on:submit.prevent="getNewPassword()">
          <div class="w-100 d-flex justify-content-center">
            <div class="col-12 d-flex justify-content-end">
              <NuxtLink
                :to="{ path: '/login' }"
                class="btn-signup text-decoration-none"
                >Login
              </NuxtLink>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center my-2">
            <h2 style="font-family: Florence, cursive; color: #be895b">
              Forgot your password ?
            </h2>
          </div>
          <div class="w-100 d-flex justify-content-center">
            <div class="col-12">
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter the new password"
                  id="newPassword"
                  aria-describedby="emailHelp"
                  v-model="newPassword"
                  required
                />
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center">
            <div class="col-12">
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter the new password again"
                  id="reNewPassword"
                  aria-describedby="emailHelp"
                  v-model="reNewPassword"
                  required
                />
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center">
            <div class="col-12">
              <button
                class="btn-login mt-3"
                style="
                  font-size: 20px;
                  font-family: 'Courier New', Courier, monospace;
                "
                type="submit"
              >
                Change password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";
definePageMeta({
  layout: "noneLayout",
});
export default {
  mixins: [CookingRecipeAxios, Utility],

  components: {},
  async beforeMount() {},

  data() {
    return {
      userName: useCookie("cooking-email"),
      keySecret: useCookie("cooking-key-secret"),
      newPassword: "",
      reNewPassword: "",
    };
  },

  methods: {
    async getNewPassword() {
      if (this.newPassword === this.reNewPassword) {
        const GetNewPasswordRequest = {
          userName: this.userName,
          keySecret: this.keySecret,
          newPassword: this.newPassword,
        };
        const data = await this.Put(
          "api/UserAuthenticate/ResetPassword",
          GetNewPasswordRequest
        );
        if (data.code === "Ok") {
          this.$toast.success("Reset password successfull !", {
            autoClose: 2000,
          });
          this.deleteAllCookies();
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1000);
        } else {
          this.$toast.error(data.des, {
            autoClose: 2000,
          });
        }
      } else {
        this.$toast.error("New password is not duplicate", {
          autoClose: 2000,
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-login {
  border-radius: 8px;
  font-size: 18px;
  background-color: #dcc0a8;
  width: 100%;
}
.btn-login:hover {
  background-color: #d3b092;
}

.btn-signup {
  border-radius: 10px;
  padding: 6px 8px;
  border: 1px solid #fff;
  color: #72777c;
  background-color: #e5eff8;
}

.btn-signup:hover {
  background-color: #d7e6f4;
}

.log-google:hover {
  background-color: red;
}

.bg-register {
  background-image: url("~/assets/images/cooking-background-login.webp");
  background-size: 100% 100%;
}
</style>
