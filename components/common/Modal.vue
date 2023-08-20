<template>
   <div class="modal" :id="modalID">
      <div class="modal-dialog">
         <h4 class="my-5 text-center text-xl">{{ title }}</h4>
         <hr>
         <div class="modal-body">
            <slot />
         </div>
      </div>
   </div>
</template>

<script setup>
defineProps(['modalID', 'title'])
</script>

<style scoped>
.modal {
   background-color: rgb(0 0 0 / 0.5);
   justify-content: center;
   align-items: center;
   display: none;
   z-index: 50;
   inset: 0px;
   position: fixed;
}

.modal-dialog {
   --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
   --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px -4px var(--tw-shadow-color);
   box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
   --tw-bg-opacity: 1;
   background-color: var(--c3);
   border-width: 1px;
   border-radius: 0.5rem;
   /* overflow: hidden; */
   max-height: calc(100vh - 2rem);
}

.modal-body {
   overflow: auto;
}

.modal-body > :first-child {
   padding: 1.25rem;
   max-height: calc(100vh - 7rem);
}
</style>