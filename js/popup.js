const wraperBtnHeaderFixed = document.querySelector(".wraper-btn-header-fixed");
const headerFixed = document.querySelector(".header-fixed");


wraperBtnHeaderFixed.addEventListener("click", ()=>{
    headerFixed.classList.toggle("active");
});