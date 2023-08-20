window.addEventListener("mouseup", (e) => {
   /* open modal */
   if (e.target.attributes["data-toggle"]?.value == "modal") {
      openModal(e.target.attributes["data-target"]?.value);
   }

   /* close modal */
   if (e.target.classList.value.includes("modal")) closeModal();
});

window.addEventListener("keydown", function (e) {
   if (e.key == "Escape") {
      closeModal();
   }
});

function openModal(modalID) {
   const modal = document.getElementById(modalID);
   if (modal) {
      modal.style.display = "flex";
      if (modal.getElementsByTagName("input")[0])
         modal.getElementsByTagName("input")[0].focus();
   } else console.log("cannot find " + modalID);
}

function closeModal() {
   const modals = document.querySelectorAll(".modal");
   modals.forEach((modal) => {
      modal.style.display = "none";
   });
}