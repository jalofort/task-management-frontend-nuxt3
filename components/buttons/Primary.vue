<template>
   <button type="button"
      class="py-1 px-2 h-9 w-16 rounded bg-[var(--c2)] hover:bg-[var(--c6)] print:hidden shadow-lg overflow-hidden"
      :form="form" :disabled="disabled">
      <slot />
   </button>
</template>
<script setup>
defineProps(['form', 'disabled'])
</script>