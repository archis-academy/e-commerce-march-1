const login = document.getElementById("login-input");

console.log(login.ariaValueText);
const password = document.getElementById("password-input");

console.log(login);
console.log(password);

const button = document.getElementById("login-button");
console.log(button);

const userName = "admin";
const userNamePassword = "admin";

function controlUser() {
  if (login.value === userName && password.value === userNamePassword) {
    alert("başarıyla bağlandı");
  } else {
    alert("kullanıcı adı veya şifre hatalı");
  }
}

button.addEventListener("click", controlUser);
