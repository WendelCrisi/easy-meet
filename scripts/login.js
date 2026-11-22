function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggle-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("bi-eye");
    toggleIcon.classList.add("bi-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("bi-eye-slash");
    toggleIcon.classList.add("bi-eye");
  }
}

function fazerLogin() {
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("mensagem-erro");

  errorMessage.textContent = "";

  if (!user || !password) {
    errorMessage.textContent = "Preencha usuário e senha.";
    return;
  }

  fetch("api/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        salvarUsuarioLogado(data.user);
        window.location.href = "meeting/meetings.html";
      } else {
        errorMessage.textContent = data.message;
      }
    })
    .catch(() => {
      errorMessage.textContent = "Erro ao conectar com o servidor.";
    });
}

document.getElementById("user").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fazerLogin();
  }
});

document
  .getElementById("password")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      fazerLogin();
    }
  });
