<template>
  <div>
    <div class="row">
      <div class="col-7 p-0 d-none d-lg-block">
        <div class="w-100 vh-100 bg-login"></div>
      </div>
      <div
        class="col-12 col-lg-5 p-0"
        style="background-color: #faf3e3; font-family: Florence, cursive"
      >
        <div
          class="w-100 vh-100 d-flex justify-content-center align-items-center"
        >
          <form action="" v-on:submit.prevent="login()">
            <!-- <div class="d-flex justify-content-between">
              <div></div>
              <NuxtLink
                :to="{ path: '/signup' }"
                class="btn-sign-up p-2 text-decoration-none"
                >Signup for free</NuxtLink
              >
            </div> -->
            <div
              class="d-flex justify-content-center my-3"
              style="font-size: 25px; font-weight: 540; color: #be895b"
            >
              Cooking - Socializing and sharing
            </div>
            <div
              class="d-flex justify-content-center mb-3"
              style="font-size: 22px; font-weight: 500"
            >
              Login
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                aria-describedby="emailHelp"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                id="exampleInputPassword1"
                v-model="password"
                required
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <div class="d-flex justify-content-between mb-4">
                <label class="form-check-label" for="exampleCheck1"
                  >Stay logged in</label
                >
                <NuxtLink :to="{ path: '/forgot-password' }"
                  >Forgot password ?</NuxtLink
                >
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn-login p-2 mb-2">
                Let's explore the world of food
              </button>
            </div>
            <div class="my-4">
              <div class="border-top"></div>
            </div>
            <div class="d-flex justify-content-center" style="font-size: 17px">
              <NuxtLink :to="{ path: '/signup' }"
                >Do not have an account ? Please register!</NuxtLink
              >
            </div>
            <!-- <div class="w-100 d-flex justify-content-center mb-3">
              <div class="col-12">
                <a href="#" class="d-flex text-decoration-none">
                  <img
                    src="~/assets/images/fb_logo.png"
                    alt="facebook"
                    style="
                      height: 40px;
                      padding: 6px;
                      background-color: #fff;
                      border: 1px solid #4285f4;
                    "
                  />
                  <div
                    class="w-100 d-flex justify-content-center align-items-center"
                    style="background-color: #4285f4; height: 40px; color: #fff"
                  >
                    Login with Facebook
                  </div>
                </a>
              </div>
            </div> -->
            <!-- <div class="w-100 d-flex justify-content-center">
              <div class="col-12">
                <a href="#" class="d-flex text-decoration-none">
                  <img
                    src="~/assets/images/google_logo.png"
                    alt="google"
                    style="
                      height: 40px;
                      padding: 10px;
                      background-color: #fff;
                      border: 1px solid #4285f4;
                    "
                  />
                  <div
                    class="w-100 d-flex justify-content-center align-items-center"
                    style="background-color: #4285f4; height: 40px; color: #fff"
                  >
                    Login with Google
                  </div>
                </a>
              </div>
            </div> -->
          </form>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-customer p-0">
      <div class="w-100 row">
        <div class="col-7 p-0 d-none d-lg-block"></div>
        <div class="col-12 col-lg-5 p-0">
          <div
            class="w-100 vh-100 d-flex justify-content-center align-items-center"
            style="background-color: rgba(0, 0, 0, 0.3)"
          >
            <div
              class="spinner-border text-warning"
              role="status"
              style="width: 50px; height: 50px; font-size: 20px"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "noneLayout",
});
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
export default {
  mixins: [CookingRecipeAxios],
  components: {},
  async beforeMount() {},

  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      const loginRequest = {
        email: this.email,
        password: this.password,
      };

      var data = await this.Post(
        "api/UserAuthenticate/UserLogin",
        loginRequest
      );
      if (data.code == "Ok") {
        //save data to cookie
        const d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie =
          "cooking-recipe-token" +
          "=" +
          data.data.token +
          ";" +
          expires +
          ";path=/";
        this.loading = false;
        this.$toast.success("Login successfull !", {
          autoClose: 1000,
        });
        setTimeout(() => {
          this.$router.push({ path: "/" });
          reloadNuxtApp();
        }, 1000);
      } else {
        // alert(data.des);
        this.loading = false;

        this.$toast.error(`${data.des}`, {
          autoClose: 1000,
        });
      }
    },
  },
};
</script>

<style scoped>
.bg-login {
  background-image: url("~/assets/images/cooking-background-login.webp");
  background-size: 100% 100%;
}

.btn-sign-up {
  border-radius: 8px;
  background-color: #f6e1c3;
  color: #000;
}

.btn-login {
  border-radius: 8px;
  font-size: 18px;
  background-color: #dcc0a8;
}

.btn-login:hover {
  background-color: #d3b092;
}
.loading-customer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
