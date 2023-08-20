import { useCustomAxios } from "~/composables/common/useCustomAxios";

export const useFindGroups = (searchValue: any) => {
   return useCustomAxios(`groups/find/${searchValue}`);
};
