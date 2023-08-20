<template>
   <button type="button"
      class="py-1 px-2 h-9 w-16 rounded bg-[var(--c7)] hover:bg-[var(--c8)] text-[var(--c3)] shadow-lg print:hidden overflow-hidden"
      :disabled="isLoading">
      <slot v-if="!isLoading" />
      <CommonSmallSpinner class="inline" v-else />
   </button>
</template>
<script setup>
defineProps(['isLoading'])
</script>
<style scoped>
:disabled {
   cursor: not-allowed;
}
</style>