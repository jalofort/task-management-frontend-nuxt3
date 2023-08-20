import { useCustomAxios } from "~/composables/common/useCustomAxios";

export const useGetGroups = (initialData: any) => {
   return useCustomAxios("groups", undefined, initialData);
};
