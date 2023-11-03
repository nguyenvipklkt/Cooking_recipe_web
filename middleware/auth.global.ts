export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("cooking-recipe-token");
  const serectKey = useCookie("cooking-key-secret");
  const emailInForgotPassword = useCookie("cooking-email");
  if (token.value) {
    if (to.path == "/login" || to.path == "/signup") {
      return navigateTo("/");
    }
  } else {
    if (
      to.path != "/login" &&
      to.path != "/signup" &&
      to.path != "/forgot-password" &&
      to.path != "/get-new-password"
    ) {
      return navigateTo("/login");
    }
    if (to.path == "/get-new-password") {
      if (!serectKey.value || !emailInForgotPassword.value) {
        return navigateTo("/login");
      }
    }
  }
});
