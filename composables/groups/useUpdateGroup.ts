import { useCustomAxios } from "~/composables/common/useCustomAxios";
export const useUpdateGroup = (groupID: number, newName: string) => {
   if (newName == "") return;
   return useCustomAxios("groups/" + groupID, {
      data: { name: newName },
      method: "PUT",
   });
};
