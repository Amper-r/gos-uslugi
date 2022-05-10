const contentErrorList = document.querySelector(".content-error-list");

async function getErrors(){
    let resp = await fetch("../phpFiles/getErrors.php");
    if(resp.status == 200){
        let data = await resp.json();
        removeItemsErrorList();
        renderErrors(data);
    }
    else{
        removeItemsErrorList();
        addMessageErrorNotFound();
    }
}

function addMessageErrorNotFound(){
    contentErrorList.insertAdjacentHTML("afterbegin", '<li class="errors-not-found">Ошибки не найдены</li>');
}

function renderErrors(data){
    data.forEach(data_item => {
        let temp = `<li class="item-error-list">
        <div class="prop-error-list">
            <span class="name_prop-error-list">DateTime:</span>
            <span class="value_prop-error-list">${data_item.date_time}</span>
        </div>
        <div class="prop-error-list">
            <span class="name_prop-error-list">Error:</span>
            <span class="value_prop-error-list">${data_item.info}</span>
        </div>
    </li>`;
    contentErrorList.insertAdjacentHTML("afterbegin", temp);
    });
}

function removeItemsErrorList(){
    const items = contentErrorList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
}
