import { authenticated } from "~/composables/user/useUser";
export default defineNuxtRouteMiddleware((to, from) => {
   const unProtectedPaths = ["auth-login", "auth-register"];

   if (authenticated == "true" && unProtectedPaths.includes(to.name))
      return navigateTo("/");
   if (!authenticated && !unProtectedPaths.includes(to.name))
      return navigateTo("/auth/login");
});
