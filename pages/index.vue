<template>
   <div class="flex justify-between item-center gap-5 mb-5">
      <input
         type="text"
         class="block w-full"
         :placeholder="$t('Search')"
         v-model="searchValue"
      />
      <ButtonsSubmit
         class="!h-11 w-40 bg-[var(--c2)] text-[var(--c4)] hover:bg-[var(--c6)] shadow-none"
         @click="createGroup"
         :isLoading="createGroupRequest?.isLoading"
      >
         {{ $t("New group") }}
      </ButtonsSubmit>
   </div>
   <div v-if="groups?.data?.length > 0">
      <p class="mb-3 text-sm text-[var(--c8)]">
         {{ $t('* Double click on elements for editing') }}
      </p>
      <div class="grid grid-cols-3 gap-5">
         <div
            v-for="(group, groupIndex) in groups.data"
            class="rounded-lg bg-[var(--c2)] p-5 shadow"
         >
            <div class="grid items-center">
               <div v-if="!group.edit" class="flex justify-between">
                  <h4
                     class="text-xl break-all"
                     @dblclick="enableEditingGroup(groupIndex)"
                  >
                     {{ group.name }}
                  </h4>
                  <button
                     class="h-7 w-8 text-[var(--c3)] bg-[var(--c6)] rounded-xl inline-grid place-items-center"
                     @click="deleteGroup(groupIndex)"
                  >
                     <IconsTimes />
                  </button>
               </div>
               <form
                  v-else
                  @submit.prevent="handleGroupNameFormSubmission(groupIndex)"
               >
                  <input
                     type="text"
                     class="w-full bg-[var(--c6)]"
                     :id="'group-' + groupIndex"
                     v-on:blur="handleGroupNameInputBlur(groupIndex)"
                  />
               </form>
            </div>
            <hr class="shadow my-5" />
            <div class="grid items-center mb-5">
               <button
                  class="text-[var(--c3)] bg-[var(--c6)] rounded-lg inline-grid place-items-center"
                  @click="showNewTaskForm(groupIndex)"
               >
                  <IconsPlus />
               </button>
            </div>
            <TasksSingleTask
               v-for="(task, taskIndex) in group.tasks"
               :task="task"
               :taskIndex="taskIndex"
               :groupIndex="groupIndex"
               @getGroups="getGroups"
               @removeNewTaskForm="removeNewTaskForm"
            />
         </div>
      </div>
   </div>
   <div v-else class="grid place-items-center h-[calc(100vh-16rem)]">
      <CommonNewSpinner v-if="groups?.isLoading" />
      <CommonNoData v-else-if="groups?.isFinished" />
   </div>
   <CommonModal
      modalID="delete-group-confirmation-modal"
      :title="$t('Delete group')"
   >
      <div class="text-center">
         <p class="mb-3">
            {{ $t("The group will be deleted with all it's tasks!") }}
         </p>
         <p>{{ $t("Are you sure?") }}</p>
         <CommonModalHR />
         <div>
            <ButtonsDelete
               class="w-20"
               @click="deleteGroup(groupToDeleteIndex, true)"
               :isLoading="deleteGroupRequest?.isLoading"
            >
               {{ $t("Delete") }}
            </ButtonsDelete>
            <ButtonsCloseModal class="w-20">
               {{ $t("Delete") }}
            </ButtonsCloseModal>
         </div>
      </div>
   </CommonModal>
</template>

<script setup>
import { useFindGroups } from "@/composables/groups/useFindGroups";
import { useGetGroups } from "@/composables/groups/useGetGroups";
import { useUpdateGroup } from "@/composables/groups/useUpdateGroup";
import { useCreateGroup } from "@/composables/groups/useCreateGroup";
import { useDeleteGroup } from "@/composables/groups/useDeleteGroup";
import { watchDebounced } from "@vueuse/core";

onBeforeMount(() => getGroups());

const groups = ref();
const getGroups = () => {
   groups.value = useGetGroups(groups.value?.data);
};

const enableEditingGroup = (groupIndex) => {
   groups.value.data[groupIndex].edit = true;

   setTimeout(() => {
      let input = document.querySelector("#group-" + groupIndex);
      if (input) input.focus();
      input.value = groups.value.data[groupIndex].name;
   }, 100);
};

const handleGroupNameInputBlur = (groupIndex) => {
   // this condition to stop the steps if it is already done by group name form submission
   // so this function will be called when the input blurs
   if (groups.value.data[groupIndex].edit == false) return;
   let input = document.querySelector("#group-" + groupIndex);
   updateGroupName(groupIndex, input.value);
   groups.value.data[groupIndex].edit = false;
};

const handleGroupNameFormSubmission = (groupIndex) => {
   let input = document.querySelector("#group-" + groupIndex);
   updateGroupName(groupIndex, input.value);
   groups.value.data[groupIndex].edit = false;
};

const updateGroupRequest = ref();
const updateGroupName = (groupIndex, newGroupName) => {
   if (groups.value.data[groupIndex].name == newGroupName) return;
   if (newGroupName == "") return;

   updateGroupRequest.value = useUpdateGroup(
      groups.value.data[groupIndex].id,
      newGroupName
   );
};

watch(
   () => updateGroupRequest.value?.isFinished,
   () => {
      if (
         updateGroupRequest.value.isFinished &&
         !updateGroupRequest.value.error
      ) {
         getGroups();
      }
   }
);

const showNewTaskForm = (groupIndex) => {
   groups.value?.data[groupIndex].tasks.unshift({
      new: true,
      title: "",
      description: "",
      groupID: groups.value?.data[groupIndex].id,
   });
};

const removeNewTaskForm = (groupIndex, taskIndex) => {
   groups.value?.data[groupIndex].tasks.splice(taskIndex, 1);
};

const groupToDeleteIndex = ref();
const deleteGroupRequest = ref();
const deleteGroup = (groupIndex, deletionIsConfirmed = false) => {
   // if there are no tasks in a group, delete it directly (no confirmation needed)
   if (groups.value?.data[groupIndex].tasks.length == 0) {
      deleteGroupRequest.value = useDeleteGroup(
         groups.value?.data[groupIndex].id
      );
      return;
   }

   // if a group contains tasks, show confirmation
   // if the deletion confirmed, run the function again with confirmation
   if (deletionIsConfirmed) {
      deleteGroupRequest.value = useDeleteGroup(
         groups.value?.data[groupToDeleteIndex.value].id
      );
   }
   showDeleteGroupConfirmationModal();
   groupToDeleteIndex.value = groupIndex;
};

const showDeleteGroupConfirmationModal = () => {
   window.openModal("delete-group-confirmation-modal");
};

watch(
   () => deleteGroupRequest.value?.isFinished,
   () => {
      if (
         deleteGroupRequest.value.isFinished &&
         !deleteGroupRequest.value.error
      ) {
         getGroups();
         window.closeModal("delete-group-confirmation-modal");
      }
   }
);

const createGroupRequest = ref();
const createGroup = () => {
   let newGroup = {
      name: "Group " + generateRandom2Letters(),
   };

   createGroupRequest.value = useCreateGroup(newGroup);
};

watch(
   () => createGroupRequest.value?.isFinished,
   () => {
      if (
         createGroupRequest.value.isFinished &&
         !createGroupRequest.value.error
      )
         getGroups();
   }
);

const searchValue = ref();
watchDebounced(
   () => searchValue.value,
   () => {
      if (searchValue.value) groups.value = useFindGroups(searchValue.value);
      else getGroups();
   },
   { debounce: 500 }
);
</script>
