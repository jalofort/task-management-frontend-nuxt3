import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useDeleteTask = (taskID: number) => {
   return useCustomAxios("tasks/" + taskID, {
      method: "DELETE",
   });
};
