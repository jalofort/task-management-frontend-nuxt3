import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useDeleteGroup = (groupID: number, newName: string) => {
   return useCustomAxios("groups/" + groupID, {
      method: "DELETE",
   });
};
