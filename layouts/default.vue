<template>
   <main :dir="lang == 'en' ? 'ltr' : 'rtl'">
      <!-- Navbar -->
      <CommonNavbar />

      <div class="mt-24 h-[calc(100vh-6rem)] print:m-0">

         <!-- Page container -->
         <div
            id="page-container"
            class="p-10 h-full print:h-auto overflow-y-auto transition-all duration-300 print:m-0 print:p-0"
         >
            <!-- Page content -->
            <slot />

         </div>

      </div>
      <CommonNotifications />
   </main>
</template>

<script setup>
import { lang } from "@/composables/user/useUser";
</script>
