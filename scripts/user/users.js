const usuarioLogado = protegerPagina();

if (usuarioLogado) {
  document.getElementById("nome-usuario-logado").textContent =
    usuarioLogado.name;
}

function carregarUsuarios(search = "") {
  fetch("../api/user/list_users.php?search=" + encodeURIComponent(search))
    .then((response) => response.json())
    .then((data) => {
      const tabela = document.getElementById("tabela-usuarios");
      tabela.innerHTML = "";

      data.users.forEach((user) => {
        const linha = document.createElement("tr");
        const ehUsuarioLogado =
          usuarioLogado && user.username === usuarioLogado.username;

        linha.innerHTML = `
          <td>${user.username}</td>
          <td>${user.name}</td>
          <td class="text-end">
            <a href="edituser.html?username=${user.username}" class="btn btn-sm btn-outline-primary me-1">
              <i class="bi bi-pencil"></i>
            </a>
            <button
              class="btn btn-sm btn-outline-danger btn-excluir"
              data-username="${user.username}"
              ${ehUsuarioLogado ? 'disabled title="Você não pode excluir seu próprio usuário"' : ""}
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;

        tabela.appendChild(linha);
      });
    });
}

function excluirUsuario(username) {
  fetch("../api/user/delete_user.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      usuario_logado: usuarioLogado ? usuarioLogado.username : "",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        carregarUsuarios(document.getElementById("busca-username").value);
      } else {
        alert(data.message);
      }
    });
}

document
  .getElementById("busca-username")
  .addEventListener("input", function () {
    carregarUsuarios(this.value);
  });

document
  .getElementById("tabela-usuarios")
  .addEventListener("click", function (event) {
    const botaoExcluir = event.target.closest(".btn-excluir");

    if (botaoExcluir) {
      const username = botaoExcluir.dataset.username;

      if (usuarioLogado && username === usuarioLogado.username) {
        alert("Você não pode excluir seu próprio usuário.");
        return;
      }

      if (confirm("Deseja excluir o usuário " + username + "?")) {
        excluirUsuario(username);
      }
    }
  });

carregarUsuarios();
