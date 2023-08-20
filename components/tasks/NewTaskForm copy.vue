<template>
   <form @submit.prevent="createTask()">
      <div class="mb-3">
         <input
            type="text"
            class="w-full"
            :placeholder="$t('Title')"
            v-model="task.title"
         />
      </div>
      <div class="mb-3">
         <textarea
            class="w-full"
            :placeholder="$t('Description')"
            v-model="task.description"
         ></textarea>
      </div>
      <div>
         <ButtonsSubmit
            class="me-1 text-sm w-14"
            :isLoading="createTaskRequest?.isLoading"
         >
            {{ $t("Save") }}
         </ButtonsSubmit>
         <ButtonsPrimary
            class="text-sm w-14"
            @click="removeNewTaskForm(groupIndex, taskIndex)"
         >
            {{ $t("Cancel") }}
         </ButtonsPrimary>
      </div>
   </form>
</template>

<script setup>
import { useCreateTask } from "@/composables/tasks/useCreateTask";

const props = defineProps(["task"]);
const emit = defineEmits(["getGroups", "removeNewTaskForm"]);

const removeNewTaskForm = (groupIndex, taskIndex) => {
   emit("removeNewTaskForm", groupIndex, taskIndex);
};

const createTaskRequest = ref();
const createTask = () => {
   createTaskRequest.value = useCreateTask({ ...props.task });
};

watch(
   () => createTaskRequest.value?.isFinished,
   () => {
      if (createTaskRequest.value.isFinished && !createTaskRequest.value.error)
         emit("getGroups");
   }
);
</script>
