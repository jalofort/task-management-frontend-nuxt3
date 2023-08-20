import { lang } from "@/composables/user/useUser";
import { ar } from "@/lang/ar";
import { en } from "@/lang/en";

export default defineNuxtPlugin((nuxtApp) => {
   return {
      provide: {
         t: (text: string) => {
            if (lang == "ar") {
               if (ar[text]) return ar[text];
            } else if (lang == "en") {
               if (en[text]) return en[text];
            }
            return text;
         },
      },
   };
});
