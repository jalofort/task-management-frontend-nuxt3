export const notifications = ref<{}[]>([
   // { className: "success", message: ["message 1"] },
   // { className: "danger", message: ["message 2"] },
   // { className: "success", message: ["message 3"] },
]);
export const notify = (className: string, messagesArray: string[], seconds: number = 4): void => {
   notifications.value.push({
      className: className,
      messagesArray: messagesArray,
   });
   setTimeout(() => {
      notifications.value.shift();
   }, seconds * 1000);
};
