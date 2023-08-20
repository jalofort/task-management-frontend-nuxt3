import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { accessToken, logout } from "~/composables/user/useUser";
import { useCheckConnectionToServer } from "~/composables/common/useCheckConnectionToServer";
import { notify } from "~/composables/common/useNotifications";

type axiosConfig = {
   method?: string;
   params?: {};
   data?: {};
};

export const useCustomAxios = (
   url: string,
   axiosConfig: axiosConfig = {},
   initialData: any = null
) => {
   const { $t } = useNuxtApp();
   const config = useRuntimeConfig();
   const instance = axios.create({
      // setting backend server base URL
      baseURL: config.public.baseURL,
      // setting user access token to be passed in all requests headers
      headers: { Authorization: "Bearer " + accessToken },
   });

   instance.interceptors.response.use(
      function (response) {
         // showing messages according to status code and request method
         if (response.config.method == "post" && response.status == 201) {
            notify("success", [$t("Saved")]);
         } else if (response.config.method == "put" && response.status == 204) {
            notify("success", [$t("Saved")]);
         } else if (
            response.config.method == "delete" &&
            response.status == 204
         ) {
            notify("success", [$t("Deleted")]);
         }
         return response;
      },
      function (error) {
         // If the response contains an error, check the internet connection
         if (!error.response) useCheckConnectionToServer();
         // if a request was sent without an access token or invalid one, logout the user. 
         else if (error.response?.status == 401) logout();
         // other than that the case my be an internal server error
         else if (error.response?.status == 500)
            notify("danger", [$t("Internal server error")]);

         return Promise.reject(error);
      }
   );

   return useAxios(url, axiosConfig, instance, {
      immediate: true,
      initialData: initialData,
   });
};
