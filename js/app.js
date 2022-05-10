const contentPage = document.querySelector(".content-page");
const wraperPage = document.querySelector(".wraper-page");

const btnsPage = document.querySelector(".pages");
const wraperPages = document.querySelector(".wraper-pages");
const contentBtnsPage = document.querySelector(".content-pages-btns");
const btnPagePrev = document.querySelector(".btn-nav-page-prev");
const btnPageNext = document.querySelector(".btn-nav-page-next");

const select_has_electronic_view = document.querySelector(".select_has_electronic_view");
const options_select_has_electronic_view = select_has_electronic_view.querySelectorAll("option");

const formLoad = document.querySelector(".form-load");
const resursInput = formLoad.querySelector(".resurs-input");

let url;
let has_electronic_view;

window.addEventListener("load", ()=>{
    let data = localStorage.getItem("data");
    let _url = JSON.parse(localStorage.getItem("url"));
    let _has_electronic_view = JSON.parse(localStorage.getItem("has_electronic_view"));
    let _currentPage = JSON.parse(localStorage.getItem("current_page"));
    let scroll_nav = JSON.parse(localStorage.getItem("scroll_nav"));
    if(data && _url && _has_electronic_view && _currentPage){
        url = _url.url;
        has_electronic_view = _has_electronic_view.has_electronic_view;
        currentPage = _currentPage;
        resursInput.value = url;
        RenderData(JSON.parse(data), itemInPage, has_electronic_view);

        const _pageBtns = document.querySelectorAll(".page-btn");
        btnsRemoveActive(_pageBtns);
        _pageBtns[currentPage - 1].classList.add("active");
        changePage();
        btnsPage.style.transform = `translateX(${scroll_nav ?? 0}px) translateY(-50%)`;
    }
});

formLoad.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData = new FormData(formLoad);
    url = formData.get("resurs_input");
    has_electronic_view = formData.get("has_electronic_view");
    getData(formData, url, has_electronic_view);
});


let itemInPage = 30;
let defaultWidthContainer = 500;
let currentPage = 1;
let btnsPageX = 0;

async function getData(formData, url, has_electronic_view){
    wraperPage.classList.add("loading");
    let resp = await fetch("../phpFiles/getData.php", {
        method: 'POST',
        body: formData
    });
    if(resp.status == 200){
        getErrors();
        getLastXmlFile();
        currentPage = 1;
        localStorage.setItem("current_page", currentPage);

        localStorage.setItem("scroll_nav", 0);
        btnsPage.style.transform = `translateX(0) translateY(-50%)`;

        wraperPage.classList.remove("loading");
        let data = await resp.json();
        setDataLocalStorage(data, url, has_electronic_view);
        RenderData(data, itemInPage, has_electronic_view);
    }
    else{
        getErrors();
        let resp_json = await resp.json();
        wraperPage.classList.remove("loading");
        swal("", resp_json.message, "error");
    }
}

function Reset(){
    const pageBtns = document.querySelectorAll(".page-btn");
    const pageItems = document.querySelectorAll(".page-item");
    btnPagePrev.classList.remove("hidden");
    btnPageNext.classList.remove("hidden");
    
    btnsRemoveActive(pageBtns);
    elemetsRemove(pageBtns);
    elemetsRemove(pageItems);
}

function setSelectOption(index){
    options_select_has_electronic_view.forEach(option => {
        option.removeAttribute("selected");
    });
    let selectOption = select_has_electronic_view.querySelector(`#has_electronic_view_${index}`);
    selectOption.setAttribute("selected", "selected");
}

function elemetsRemove(nodeList){
    nodeList.forEach(element => {
        element.remove();
    });
}

function setDataLocalStorage(data, url, has_electronic_view){
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("url", JSON.stringify({url: url}));
    localStorage.setItem("has_electronic_view", JSON.stringify({has_electronic_view: has_electronic_view}));
}

function RenderData(promis, itemInPage, has_electronic_view){
    Reset();
    setSelectOption(has_electronic_view);
    wraperPages.classList.remove("hidden");
    data = promis;
    for (let index = 0; index < itemInPage; index++) {
        let temp = `<li class="page-item"><a href="viewUsluga.php?id=${data[index].id}&url=${url.split("?", 1)[0]}" class="page-item-link">${data[index].name}</a></li>`;
        contentPage.insertAdjacentHTML("beforeend", temp);
    }
    RenderBtns(data);
}

function RenderBtns(data){
    let length = data.length;
    let countPages = Math.ceil(length / itemInPage);
    for (let index = 1; index <= countPages; index++) {
        temp = index == currentPage ? `<div class="page-btn active" data-page="${index}">${index}</div>` : `<div class="page-btn" data-page="${index}">${index}</div>`;
        btnsPage.insertAdjacentHTML("beforeend", temp);
    }
    if (btnsPage.offsetWidth >= defaultWidthContainer){
        contentBtnsPage.style.width = `${defaultWidthContainer}px`;
    }
    else{
        contentBtnsPage.style.width = `${btnsPage.offsetWidth}px`;
        btnPagePrev.classList.add("hidden");
        btnPageNext.classList.add("hidden");
    }
    eventClickBtns();
}

function eventClickBtns(){
    let btns = document.querySelectorAll(".page-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", ()=>{
            btnsRemoveActive(btns);
            btn.classList.add("active");
            currentPage = btn.dataset.page;
            localStorage.setItem("current_page", currentPage);
            changePage();
        });
    });
}

function btnsRemoveActive(btns){
    btns.forEach(btn => {
        btn.classList.remove("active");
    });
}

function changePage(){
    removeItemData();
    for (let index = (currentPage - 1) * itemInPage; index <= currentPage * itemInPage - 1 && index < data.length; index++) {
        let temp = `<li class="page-item"><a href="viewUsluga.php?id=${data[index].id}&url=${url.split("?", 1)[0]}" class="page-item-link">${data[index].name}</a></li>`;
        contentPage.insertAdjacentHTML("beforeend", temp);
    }
}

function removeItemData(){
    let pageItems = document.querySelectorAll(".page-item");
    pageItems.forEach(pageItem=> {
        pageItem.remove();
    });
}

btnPagePrev.addEventListener("click", prevNavPages);
btnPageNext.addEventListener("click", nextNavPages);

function prevNavPages(){
    if(btnsPageX + 100 < 0){
        btnsPageX += 100;
    }
    else{
        btnsPageX = 0;
    }
    localStorage.setItem("scroll_nav", btnsPageX);
    btnsPage.style.transform = `translateX(${btnsPageX}px) translateY(-50%)`;
}
function nextNavPages(){
    if(Math.abs(btnsPageX - 100 - (contentBtnsPage.offsetWidth - 30 - 30 - 10)) >= btnsPage.offsetWidth){
        btnsPageX = -(btnsPage.offsetWidth - (contentBtnsPage.offsetWidth  - 10));
    }
    else{
        btnsPageX -= 100;
    }
    localStorage.setItem("scroll_nav", btnsPageX);
    btnsPage.style.transform = `translateX(${btnsPageX}px) translateY(-50%)`;
}