export const changeLanguage = (lang: string) => {
   localStorage.setItem("lang", lang);
   location.reload();
};
