import { notify } from "~/composables/common/useNotifications";

export const validatePassword = (password: string) => {
   const { $t } = useNuxtApp();
   const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
   if (passwordRegex.test(password)) return true;
   notify(
      "danger",
      [
         $t("Please, enter a strong password contains the following:"),
         $t("Capital letter"),
         $t("Small letter"),
         $t("Digit"),
         $t("Symbol"),
         $t("Length to be 8 charcters at least"),
      ],
      6
   );
};
