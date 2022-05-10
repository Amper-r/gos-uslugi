const cookieWraper = document.querySelector(".cookie");
const btnUpdateSession = document.querySelector(".btn-update-session");
PrintCookie();

if(get_cookie("session_id")){
  getErrors();
}
else{
  updateCookie(true);
  addMessageErrorNotFound();
}

btnUpdateSession.addEventListener("click", ()=>{
  updateCookie(false);
  removeItemsErrorList();
  addMessageErrorNotFound();
});

function PrintCookie(){
    const cookie = get_cookie("session_id");
    cookieWraper.innerHTML = `<b>Текущая сессия:</b> ${cookie}`;
}


function get_cookie(cookie_name)
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

async function updateCookie(i){
  let resp = await fetch("../phpFiles/session.php");
  PrintCookie();
  if(resp.ok){
    if(!i){
      getLastXmlFile();
      swal("Сессия обновлена", "", "success");
    }
  }
}