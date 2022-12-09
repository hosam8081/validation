// define variables
const registerBtn = document.getElementById("register");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const password_confirmation = document.getElementById("password_confirmation");

const url = "https://goldblv.com/api/hiring/tasks/register";

// check if there is user go to home page
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("user")) {
    location.href = "profile.html"
  }
})

// Handle Submit : Register
registerBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  // values
  const test = {
    username: username.value,
    password: password.value,
    email: email.value,
    password_confirmation: password_confirmation.value,
  };
  // check vaildition
  validation()
  // if validation true register
  if (validation()) {
    postData(test).then((data) => {
      localStorage.setItem("user", JSON.stringify(data))
    });
    setInterval(() => {
      window.location.href = '/profile.html'
    }, 1000)
  } 
});

// validation
let validation = () => {
  let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
  let isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password.value)
  let isUserName= /^[A-Za-z][A-Za-z0-9]{3,15}[A-Za-z]$/.test(username.value)
  let check = true

  // check username
  if (username.value.trim() == '') {
    setMessage(username, "error", "Username cannot be blank")
    check = false 
  } else if (!isUserName) {
    setMessage(username, "error", "Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end")
    check = false
  } 
  else {
    setMessage(username, "success");
  }

  // check email
  if (email.value.trim() == "") {
    setMessage(email, "error", "Email cannot be blank")
    check = false 
  } else if (!isEmail) {
    setMessage(email, "error", "Not a faild Email")
    check = false
  } else {
    setMessage(email, "success")
  }

  // check password
  if (password.value == "") {
    setMessage(password, "error", "password cannot be blank")
    check = false 
  } else if (!isPassword) {
    setMessage(password, "error", "The Password must contain at least one uppercase, one lowercase, number, symbol and minimum 8 characters")
    check = false 
  } else {
    setMessage(password, "success")
  }

  // check
  if (password_confirmation.value == "") {
    setMessage(password_confirmation, "error", "password cannot be blank")
    check = false 
  } else if (password_confirmation.value !== password.value) {
    setMessage(password_confirmation, "Passwords does not match")
    check = false
  } else {
    setMessage(password_confirmation, "success")
  }

  return check
}

// Function : Add Error OR success
let setMessage = (id, type, text) => {
  let formControl = id.parentElement.parentElement;
  let message = formControl.querySelector('.message')
  if (type == "success") {
    formControl.classList = "form-group success"
  } else {
    message.innerHTML = text;
    formControl.className = "form-group error"
  }
}

// Post : Register to Api
async function postData(test) {
  const response = await fetch(url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(test),
  });
  return response.json();
}
