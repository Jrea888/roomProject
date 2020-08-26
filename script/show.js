//请求IP
function getUrl() {
    var url;
    url = 'http://localhost:8888';
    return url;
}
var userInfoElement = document.getElementById("username");
var token = localStorage.getItem("token");
function show() {
    if (!token) {
        userInfoElement.style.display = "none";
    } else {
        userInfoElement.style.display = "block";
    }
}

var user = document.querySelector("#realUser");
if (localStorage.getItem("username")){
    show();
    user.innerText = localStorage.getItem("username");
}else{
    localStorage.setItem("username","");
}
function cancelExit() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    parent.location.href = "./userLogin.html"
}
