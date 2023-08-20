<template>
   <nav
      class="fixed z-10 h-24 top-0 right-0 w-full print:hidden border border-b"
   >
      <div
         class="container mx-auto px-4 sm:px-8 flex justify-between items-center h-full"
      >
         <div class="flex items-center gap-2">
            <IconsTasksList />
            <h3 class="text-3xl">{{ $t("Tasks") }}</h3>
         </div>
         <div>
            <h4 class="text-sm mb-2">{{ $t("Hi") }} , {{ username }}</h4>
            <span
               class="flex gap-4 items-center justify-center"
               v-if="lang == 'ar'"
            >
               <a
                  class="text-xs"
                  href="javascript:;"
                  @click="changeLanguage('en')"
               >
                  <span class="text-sm">English</span>
                  <span class="ms-1">
                     <IconsLanguage />
                  </span>
               </a>
               <a href="javascript:;" class="text-sm" @click="logout">
                  <IconsLogoutLeft />
               </a>
            </span>
            <span class="flex gap-4 items-center justify-center" v-else>
               <a href="javascript:;" @click="changeLanguage('ar')">
                  <span class="text-sm">العربية</span>
                  <span class="ms-1">
                     <IconsLanguage />
                  </span>
               </a>
               <a href="javascript:;" class="text-sm" @click="logout">
                  <IconsLogoutRight />
               </a>
            </span>
         </div>
      </div>
   </nav>
</template>

<script setup>
import { username, logout, lang } from "@/composables/user/useUser";
</script>
