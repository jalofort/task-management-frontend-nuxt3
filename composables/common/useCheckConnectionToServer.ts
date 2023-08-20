import isOnline from "is-online";
import { notify } from "./useNotifications";

export const useCheckConnectionToServer = async () => {
   const { $t } = useNuxtApp();
   const internetAvailable = await isOnline();
   if (!internetAvailable)
      notify("danger", [$t('Please, check your internet connection')], 10);
   else notify("danger", [$t("Internal server error")], 10);
};
