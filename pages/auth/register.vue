<template>
   <div>
      <h3 class="text-2xl text-center mb-8">
         {{ $t('New account') }}
      </h3>

      <form action="javascript:;" @submit.prevent="registerClicked">
         <div class="form-group mb-2">
            <input type="text" class="w-full h-12" :placeholder="$t('First name')" v-model.trim="newUser.firstName" autofocus />
         </div>
         <div class="form-group mb-2">
            <input type="text" class="w-full h-12" :placeholder="$t('Last name')" v-model.trim="newUser.lastName" />
         </div>
         <div class="form-group mb-2">
            <input type="text" class="w-full h-12" :placeholder="$t('Email')" v-model.trim="newUser.email" />
         </div>
         <div class="form-group mb-2">
            <input type="password" class="w-full h-12" :placeholder="$t('Password')" v-model="newUser.password" />
         </div>
         <div class="mb-8">
            <ButtonsSubmit class="!w-full block min-h-[3rem] h-auto" :isLoading="registerRequest?.isLoading">
               {{ $t('Register') }}
            </ButtonsSubmit>
         </div>
         <div class="text-center">
            <nuxt-link to="/auth/login" class="text-sm">
               {{ $t('Back to login') }}
            </nuxt-link>
         </div>
      </form>
   </div>
</template>

<script setup>
import { useRegister } from "~/composables/user/useRegister";
import { login, saveLoginData } from "~/composables/user/useUser";

definePageMeta({ layout: "auth" });

const newUser = ref({
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   token: "",
});

const registerRequest = ref();
const registerClicked = () => {
   registerRequest.value = useRegister(newUser.value)
};

const loginRequest = ref();
watch(
   computed(() => registerRequest.value?.isFinished),
   () => {
      if (registerRequest.value.isFinished && !registerRequest.value.error) {
         loginRequest.value = login({ email: newUser.value.email, password: newUser.value.password })
      }
   }
)

watch(
   computed(() => loginRequest.value?.isFinished),
   () => {
      if (loginRequest.value.isFinished && !loginRequest.value.error) {
         saveLoginData(loginRequest.value.data)
      }
   }
)
</script>