function IsEntered() {
  const emailValue = document.getElementById("email-input").value;
  const passwordValue = document.getElementById("password-input").value;
  if (emailValue === "") {
    alert("Please enter your email");
  } else if (passwordValue === "") {
    alert("Please enter a password");
  } else {
    IsEmail();
  }
}

function IsEmail() {
  const emailValue = document.getElementById("email-input").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(emailValue)) {
    IsLogin();
  } else {
    alert("Please enter valid email");
  }
}

function IsLogin() {
  const emailValue = document.getElementById("email-input").value;
  const passwordValue = document.getElementById("password-input").value;

  userList = JSON.parse(localStorage.getItem("userList")) || [];

  const isRegistered = userList.find((user) => user.email === emailValue);
  if (!isRegistered) {
    alert("This email is not registered. Please sign up.");
    window.location.assign("register.html");
  } else {
    const isMatch = userList.some(
      (user) => user.email === emailValue && user.password === passwordValue
    );
    if (!isMatch) {
      alert("Password is incorrect. Please try again.");
    } else {
      alert("Successfully Logged in!");
      localStorage.setItem("isLogin" , JSON.stringify(true));
      window.location.assign("index.html");
    }
  }
}
