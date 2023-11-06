// https://nuxt.com/docs/api/configuration/nuxt-config
// import dotenv from "dotenv";
// dotenv.config();
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  runtimeConfig: {
    public: {
      BaseUrl: "https://localhost:50270/",
    },
  },
});
