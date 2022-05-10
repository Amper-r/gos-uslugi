const wraperDownloadBtn = document.querySelector(".wraper-download-btn");
const downloadBtn = wraperDownloadBtn.querySelector(".download-btn");
const linkBtn = wraperDownloadBtn.querySelector(".link-btn");

getLastXmlFile();
async function getLastXmlFile(){
    let resp = await fetch("../phpFiles/getLastXmlFile.php");
    if(resp.ok){
        let data = await resp.json();
        if(data){
            UpdateLinkDownloadBtn(await data.file_name);
        }
        else{
            wraperDownloadBtn.classList.add("hidden");
        }
    }
    else{
        wraperDownloadBtn.classList.add("hidden");
    }
}

function UpdateLinkDownloadBtn(file_name){
    if(file_name){
        wraperDownloadBtn.classList.remove("hidden");
        downloadBtn.setAttribute("href", "xmlFiles/" + file_name);
        linkBtn.setAttribute("href", "xmlFiles/" + file_name);
        console.log(file_name);
    }
}