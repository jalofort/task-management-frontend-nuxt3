<template>
   <main class="container mx-auto px-4" :dir="lang == 'en' ? 'ltr' : 'rtl'">
      <div class="grid place-items-center h-screen">
         <div>
            <slot />
            <div class="mt-12 text-center text-xs">
               <a
                  class="text-xs"
                  href="javascript:;"
                  @click="changeLanguage('en')"
                  v-if="lang == 'ar'"
               >
                  <span class="text-sm">English</span>
                  <span class="ms-1">
                     <IconsLanguage class="w-4" />
                  </span>
               </a>
               <a href="javascript:;" @click="changeLanguage('ar')" v-else>
                  <span class="text-sm">العربية</span>
                  <span class="ms-1">
                     <IconsLanguage class="w-4" />
                  </span>
               </a>
            </div>
         </div>
      </div>
      <CommonNotifications />
   </main>
</template>

<script setup>
import { lang } from "@/composables/user/useUser";
import { changeLanguage } from "@/utils/changeLanguage";
</script>
