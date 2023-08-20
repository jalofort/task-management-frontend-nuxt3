<template>
   <ButtonsPrimary class="ms-2" @click="closeModal">
      {{ $t("Cancel") }}
   </ButtonsPrimary>
</template>
<script setup>
const closeModal = () => {
   window.closeModal();
};
</script>
