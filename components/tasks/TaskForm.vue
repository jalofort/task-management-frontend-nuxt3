<template>
   <form @submit.prevent="submit()">
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
            :isLoading="
               createTaskRequest?.isLoading || updateTaskRequest?.isLoading
            "
         >
            {{ $t("Save") }}
         </ButtonsSubmit>
         <ButtonsPrimary
            class="text-sm w-14"
            @click="cancel(groupIndex, taskIndex)"
         >
            {{ $t("Cancel") }}
         </ButtonsPrimary>
      </div>
   </form>
</template>

<script setup>
import { useCreateTask } from "@/composables/tasks/useCreateTask";
import { useUpdateTask } from "@/composables/tasks/useUpdateTask";

// I am using one form for both creating and updating a task
// So, case means which case create or update
const props = defineProps(["task", "case"]);
const emit = defineEmits(["getGroups", "removeNewTaskForm"]);

const removeNewTaskForm = (groupIndex, taskIndex) => {
   emit("removeNewTaskForm", groupIndex, taskIndex);
};

const submit = () => {
   if (props.case == "create") createTask();
   else if (props.case == "update") updateTask();
};

const cancel = (groupIndex, taskIndex) => {
   if (props.case == "create") removeNewTaskForm(groupIndex, taskIndex);
   else if (props.case == "update") delete props.task.edit;
};

const createTaskRequest = ref();
const createTask = () => {
   let newTask = { ...props.task };
   delete newTask.new;
   createTaskRequest.value = useCreateTask(newTask);
};

watch(
   () => createTaskRequest.value?.isFinished,
   () => {
      if (createTaskRequest.value.isFinished && !createTaskRequest.value.error)
         emit("getGroups");
   }
);

const updateTaskRequest = ref();
const updateTask = () => {
   updateTaskRequest.value = useUpdateTask(props.task.id, { ...props.task });
};

watch(
   () => updateTaskRequest.value?.isFinished,
   () => {
      if (updateTaskRequest.value.isFinished && !updateTaskRequest.value.error)
         emit("getGroups");
   }
);
</script>
