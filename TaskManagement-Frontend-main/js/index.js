function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.pathname = "tasks.html";
  } else {
    document.querySelector("body").classList.remove("hidden");
  }
}

isUserLoggedIn();

const checkIfUserIsLoggedInInterval = setInterval(function () {
  isUserLoggedIn();
}, 1000);

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username && password) {
    const requestData = {
      userName: username,
      password: password,
    };

    fetch("https://localhost:7034/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (response) {
        localStorage.setItem("token", response.token);
        window.location.pathname = "tasks.html";
      })
      .catch(function () {
        document.getElementById("login-error").innerText = "Diçka shkoi keq";
      });
  }
}
