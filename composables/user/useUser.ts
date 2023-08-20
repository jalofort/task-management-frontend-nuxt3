import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { notify } from "../common/useNotifications";
import { useCheckConnectionToServer } from "~/composables/common/useCheckConnectionToServer";

export const lang = localStorage.getItem("lang") || "en";
export const authenticated = localStorage.getItem("authenticated");
export const username = localStorage.getItem("username");
export const accessToken = localStorage.getItem("accessToken");

type user = {
   email: string;
   password: string;
};

// export const loginRequest = ref();
export const login = (user: user) => {
   const { $t } = useNuxtApp();

   if (user.email == "")
      return notify("danger", [$t("Please, enter your email")]);
   if (user.password == "")
      return notify("danger", [$t("Please, enter your password")]);

   const config = useRuntimeConfig();
   const instance = axios.create();

   instance.interceptors.response.use(
      function (response) {
         return response;
      },
      function (error) {
         if (!error.response) useCheckConnectionToServer();
         else if (error.response?.status == 401)
            notify("danger", [
               $t("Login failed"),
               $t("Please, check your email and password"),
            ]);
         else if (error.response?.status == 500) {
            notify("danger", [$t("Internal server error")]);
         }
         return Promise.reject(error);
      }
   );

   return useAxios(
      config.public.baseURL + "auth/login",
      { method: "POST", data: user },
      instance,
      { immediate: true }
   );
};

export const saveLoginData = (data: any) => {
   localStorage.setItem("authenticated", "true");
   localStorage.setItem("username", data.user.fullName);
   localStorage.setItem("accessToken", data.user.accessToken);
   location.reload();
};

export const logout = () => {
   localStorage.clear();
   location.reload();
};
