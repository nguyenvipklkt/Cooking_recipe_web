export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("cooking-recipe-token");
  if (token.value) {
    if (to.path == "/login" || to.path == "/signup") {
      return navigateTo("/");
    }
  } else {
    if (to.path != "/login" && to.path != "/signup") {
      return navigateTo("/login");
    }
  }
});
