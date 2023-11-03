<template>
  <div class="w-100 row">
    <div class="col-7 p-0 d-none d-lg-block">
      <div class="w-100 vh-100 bg-register"></div>
    </div>
    <div class="col-12 col-lg-5 p-0" style="background-color: #faf3e3">
      <div
        class="w-100 vh-100 d-flex justify-content-center align-items-center"
      >
        <form v-on:submit.prevent="submitPage()">
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
          <div class="w-100 d-flex justify-content-center my-2">
            <div>
              <h5 style="font-family: Florence, cursive; color: #be895b">
                Follow these simple steps to reset your account:
              </h5>
              <div>
                <ol style="font-family: Florence, cursive; color: #be895b">
                  <li>Enter your username or email.</li>
                  <li>
                    Visit your email account, open the email sent by Cooking.
                  </li>
                  <li>
                    Follow the instruction in the mail to change password.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center">
            <div class="col-12">
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  id="email"
                  :disabled="isStatusVerifyOTP"
                  aria-describedby="emailHelp"
                  v-model="email"
                  required
                />
              </div>
            </div>
          </div>
          <div
            v-if="isStatusVerifyOTP"
            class="w-100 d-flex justify-content-center"
          >
            <div class="col-12">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="OTP"
                  id="otp"
                  minlength="4"
                  aria-describedby="emailHelp"
                  v-model="otp"
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
                {{ !isStatusVerifyOTP ? "Send OTP" : "Verify OTP" }}
              </button>
            </div>
          </div>
        </form>
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
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";

definePageMeta({
  layout: "noneLayout",
});
export default {
  mixins: [CookingRecipeAxios],

  components: {},
  async beforeMount() {},

  data() {
    return {
      email: "",
      otp: "",
      isStatusVerifyOTP: false,
      loading: false,
    };
  },

  methods: {
    async submitPage() {
      this.loading = true;
      if (!this.isStatusVerifyOTP) {
        const data = await this.Put(
          "api/UserAuthenticate/ForgotPassword?username=" + this.email,
          {}
        );
        this.loading = false;
        if (data.code === "Ok") {
          this.isStatusVerifyOTP = true;
          //save data to cookie
          const d = new Date();
          d.setTime(d.getTime() + 10 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "cooking-email" + "=" + this.email + ";" + expires + ";path=/";
          this.$toast.success("System sent OTP, check email !", {
            autoClose: 2000,
          });
        } else {
          this.$toast.error(data.des, {
            autoClose: 2000,
          });
        }
      } else {
        const OTPRequest = {
          username: this.email,
          otp: this.otp,
        };
        const data = await this.Post(
          "api/UserAuthenticate/VerifyOTP",
          OTPRequest
        );
        this.loading = false;
        if (data.code === "Ok") {
          //save data to cookie
          const d = new Date();
          d.setTime(d.getTime() + 10 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "cooking-key-secret" + "=" + data.data + ";" + expires + ";path=/";
          this.$router.push({ path: "/get-new-password" });
        } else {
          this.$toast.error(data.des, {
            autoClose: 2000,
          });
        }
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

.loading-customer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
