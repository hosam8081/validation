document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("user")) {
    location.href = "validation/register.html"
  }
  let userInfo = document.getElementById('user-info');
  let userData = JSON.parse(localStorage.getItem("user"))
  userInfo.innerHTML = userData.email  
})