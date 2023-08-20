<template>
   <div>
      <h3 class="text-2xl text-center mb-8">
         {{ $t("Log in") }}
      </h3>

      <form @submit.prevent="loginClicked">
         <div class="form-group mb-2">
            <input
               type="text"
               class="w-full h-12"
               :placeholder="$t('Email')"
               v-model="user.email"
               autofocus
            />
         </div>
         <div class="form-group mb-2">
            <input
               type="password"
               class="w-full h-12"
               :placeholder="$t('Password')"
               v-model="user.password"
            />
         </div>
         <div class="mb-8">
            <ButtonsSubmit
               class="w-full min-h-[3rem] h-auto"
               :isLoading="loginRequest?.isLoading"
            >
               {{ $t("Log in") }}
            </ButtonsSubmit>
         </div>
         <div class="text-center">
            <nuxt-link to="/auth/register" class="text-sm">
               {{ $t("New account") }}
            </nuxt-link>
         </div>
      </form>
   </div>
</template>

<script setup>
import { login, saveLoginData } from "@/composables/user/useUser";

definePageMeta({ layout: "auth" });

const user = ref({
   email: "",
   password: "",
});

const loginRequest = ref();
const loginClicked = () => {
   loginRequest.value = login(user.value);
};

watch(
   computed(() => loginRequest.value?.isFinished),
   () => {
      if (loginRequest.value.isFinished && !loginRequest.value.error) {
         saveLoginData(loginRequest.value.data);
      }
   }
);
</script>
