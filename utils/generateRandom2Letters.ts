export const generateRandom2Letters = () => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const randomIndex1 = Math.floor(Math.random() * characters.length);
   const randomIndex2 = Math.floor(Math.random() * characters.length);
   return characters.charAt(randomIndex1) + characters.charAt(randomIndex2);
 }