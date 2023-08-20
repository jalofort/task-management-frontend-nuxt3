import { useCustomAxios } from "@/composables/common/useCustomAxios";
import { notify } from "@/composables/common/useNotifications";

export const useCreateGroup = (group: any) => {
   const { $t } = useNuxtApp();
   if (group.name == "") return notify("danger", [$t("Please, enter the group name")]);
   return useCustomAxios("groups", {
      method: "POST",
      data: group,
   });
};
