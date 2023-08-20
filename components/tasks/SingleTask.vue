<template>
   <div class="rounded-lg p-3 mt-3 bg-[var(--c6)]">
      <TasksTaskForm
         v-if="task.new"
         :task="task"
         case="create"
         @getGroups="emit('getGroups')"
         @removeNewTaskForm="removeNewTaskForm(groupIndex, taskIndex)"
      />

      <TasksTaskForm
         v-else-if="task.edit"
         :task="task"
         case="update"
         @getGroups="emit('getGroups')"
         @removeNewTaskForm="removeNewTaskForm(groupIndex, taskIndex)"
      />

      <div v-else>
         <p class="mb-2" @dblclick="enableEditingTask()">{{ task.title }}</p>
         <p class="text-sm italic" @dblclick="enableEditingTask()">
            {{ task.description }}
         </p>
         <hr class="my-3 border border-[var(--c6)] shadow" />
         <div class="flex justify-between items-center mb-3">
            <span>
               <span
                  v-if="task.is_completed"
                  class="text-xs text-[var(--c3)] bg-[var(--c9)] px-2 py-1 rounded-lg"
               >
                  {{ $t("Completed") }}
               </span>
            </span>
            <span class="text-xs">
               {{ useTimeAgo(task.created_at * 1000) }}
            </span>
         </div>
         <div class="text-end">
            <a
               href="javascript:;"
               class="me-1"
               @click="updateTaskCompletionStatus(task)"
            >
               <IconsPending
                  class="text-[var(--c4)]"
                  v-if="task.is_completed"
               />
               <IconsCheckCircle class="text-[var(--c9)]" v-else />
            </a>
            <a
               href="javascript:;"
               class="me-1 text-[var(--c7)]"
               @click="deleteTask(task.id)"
            >
               <IconsTrash />
            </a>
         </div>
      </div>
   </div>
</template>
<script setup>
import { useTimeAgo } from "@vueuse/core";
import { useDeleteTask } from "@/composables/tasks/useDeleteTask";
import { useUpdateTask } from "@/composables/tasks/useUpdateTask";

const props = defineProps(["task", "taskIndex", "groupIndex"]);
const emit = defineEmits(["getGroups", "removeNewTaskForm"]);

const deleteTaskRequest = ref();
const deleteTask = (taskID) => {
   deleteTaskRequest.value = useDeleteTask(taskID);
};

watch(
   () => deleteTaskRequest.value?.isFinished,
   () => {
      if (
         deleteTaskRequest.value.isFinished &&
         !deleteTaskRequest.value.error
      ) {
         emit("getGroups");
      }
   }
);

const updateTaskRequest = ref();
const updateTaskCompletionStatus = (task) => {
   updateTaskRequest.value = useUpdateTask(task.id, {
      isCompleted: !task.is_completed,
   });
};

// const updateTask = (taskID) => {
//    updateTaskRequest.value = useUpdateTask(taskID);
// };

watch(
   () => updateTaskRequest.value?.isFinished,
   () => {
      if (
         updateTaskRequest.value.isFinished &&
         !updateTaskRequest.value.error
      ) {
         emit("getGroups");
      }
   }
);

const removeNewTaskForm = (groupIndex, taskIndex) => {
   emit("removeNewTaskForm", groupIndex, taskIndex);
};

const enableEditingTask = () => {
   props.task.edit = true;
};
</script>
