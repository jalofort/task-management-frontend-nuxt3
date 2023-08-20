<template>
   <div class="one">
      <div class="two">
         <div class="three">
            <div class="lds-ripple">
               <div></div>
               <div></div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.one {
   /* height: 100%; */
   /* margin: 26px 0; */
}
.two {
   align-items: center; /* For vertical align */
   display: flex;
   height: 100%;
   justify-content: center; /* for horizontal align*/
}
.three {
   vertical-align: middle;
   height: 79px;
}
.lds-ripple {
   display: inline-block;
   position: relative;
   width: 79px;
   height: 79px;
}
.lds-ripple div {
   position: absolute;
   border: 4px solid var(--c1);
   opacity: 1;
   border-radius: 50%;
   animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
   animation-delay: -0.5s;
}
@keyframes lds-ripple {
   0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
   }
   100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
   }
}
</style>
