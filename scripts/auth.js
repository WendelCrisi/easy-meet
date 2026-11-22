function salvarUsuarioLogado(user) {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(user));
}

function obterUsuarioLogado() {
  const dados = sessionStorage.getItem("usuarioLogado");
  return dados ? JSON.parse(dados) : null;
}

function logout() {
  sessionStorage.removeItem("usuarioLogado");
  window.location.href = "../login.html";
}

function protegerPagina() {
  const user = obterUsuarioLogado();

  if (!user) {
    window.location.href = "../login.html";
  }

  return user;
}
