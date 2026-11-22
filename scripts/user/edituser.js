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

function carregarUsuario() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  fetch("../api/user/get_user.php?username=" + encodeURIComponent(username))
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("username-original").value = data.user.username;
        document.getElementById("name").value = data.user.name;
        document.getElementById("username").value = data.user.username;
      } else {
        document.getElementById("mensagem-erro").textContent = data.message;
      }
    });
}

function salvarEdicao() {
  const usernameOriginal = document.getElementById("username-original").value;
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  if (!name || !username) {
    mensagemErro.textContent = "Preencha nome e nome de usuário.";
    return;
  }

  fetch("../api/user/update_user.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username_original: usernameOriginal,
      name,
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mensagemSucesso.textContent = "Usuário atualizado com sucesso.";
        document.getElementById("username-original").value = username;
      } else {
        mensagemErro.textContent = data.message;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao conectar com o servidor.";
    });
}

carregarUsuario();
