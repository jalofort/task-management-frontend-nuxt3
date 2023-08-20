export const notifications = ref<{}[]>([]);

export const notify = (
   className: string,
   messagesArray: string[],
   seconds: number = 4
): void => {
   notifications.value.push({
      className: className,
      messagesArray: messagesArray,
   });
   setTimeout(() => {
      notifications.value.shift();
   }, seconds * 1000);
};
