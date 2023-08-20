import { useCustomAxios } from "~/composables/common/useCustomAxios";

export const useUpdateTask = (taskID: number, task: any) => {
   return useCustomAxios(`tasks/${taskID}`, { method: "PUT", data: task });
};
