import { validatePassword } from "@/utils/validatePassword";
import { useCustomAxios } from "@/composables/common/useCustomAxios";
import { notify } from "@/composables/common/useNotifications";

type newUser = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

export const useRegister = (newUser: newUser) => {
   const { $t } = useNuxtApp();

   if (newUser.firstName == "")
      return notify("danger", [$t("Please, enter your first name")]);

   if (newUser.lastName == "")
      return notify("danger", [$t("Please, enter your last name")]);

   if (newUser.email == "")
      return notify("danger", [$t("Please, enter your email")]);

   if (!validateEmail(newUser.email))
      return notify("danger", [$t("Please, enter a valid email")]);

   if (!validatePassword(newUser.password)) return;

   return useCustomAxios("auth/register", {
      method: "POST",
      data: newUser,
   });
};
