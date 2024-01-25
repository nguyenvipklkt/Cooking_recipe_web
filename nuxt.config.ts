// https://nuxt.com/docs/api/configuration/nuxt-config
// import dotenv from "dotenv";
// dotenv.config();
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@bootstrap-vue-next/nuxt"],
  bootstrapVueNext: {
    composables: true, // Will include all composables
    // composables: {useBreadcrumb: true, useColorMode: true, all: false}, // Will include only useBreadcrumb & useColorMode
    // composables: {useBreadcrumb: false, useColorMode: false, all: true} // Will include everything except useBreadcrumb & useColorMode
  },
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
