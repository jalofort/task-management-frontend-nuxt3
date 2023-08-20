import { useCustomAxios } from "@/composables/common/useCustomAxios";
import { notify } from "@/composables/common/useNotifications";

export const useCreateTask = (task: any) => {
   const { $t } = useNuxtApp();
   if (task.title == "") return notify("danger", [$t("Please, enter a title")]);
   if (task.groupID == "")
      return notify("danger", [$t("Group is not available")]);
   return useCustomAxios("tasks", {
      method: "POST",
      data: task,
   });
};
