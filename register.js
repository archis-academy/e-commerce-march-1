function IsEntered() {
  const fullnameValue = document.getElementById("fullname-input").value;
  const emailValue = document.getElementById("email-input").value;
  const passwordValue = document.getElementById("password-input").value;
  if (fullnameValue === "") {
    alert("Please enter your name");
  } else if (emailValue === "") {
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
    AddNewUser();
  } else {
    alert("Please enter valid email");
  }
}

function AddNewUser() {
  const fullnameValue = document.getElementById("fullname-input").value;
  const emailValue = document.getElementById("email-input").value;
  const passwordValue = document.getElementById("password-input").value;

  userList = JSON.parse(localStorage.getItem("userList")) || [];
  const isMatch = userList.some((user) => user.email === emailValue);
  if (!isMatch) {
    const newUser = {
      fullname: fullnameValue,
      email: emailValue,
      password: passwordValue,
    };
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("Successfully registered. Please log in.");
    window.location.assign("login.html");
  } else {
    alert("This email is already in use. Please log in.");
    window.location.assign("login.html");
  }
}
