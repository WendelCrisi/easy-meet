const phoneInput = document.getElementById("phonenumber");

phoneInput.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.substring(0, 11);
  }

  if (valor.length <= 2) {
    this.value = `(${valor}`;
  } else if (valor.length <= 7) {
    this.value = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
  } else {
    this.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
  }
});

function criarCliente() {
  const companyname = document.getElementById("companyname").value.trim();
  const name = document.getElementById("name").value.trim();
  const phonenumber = document.getElementById("phonenumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  if (!companyname || !name) {
    mensagemErro.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  fetch("../api/customer/create_customer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ companyname, name, phonenumber, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mensagemSucesso.textContent = "Cliente criado com sucesso.";
        document.getElementById("companyname").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phonenumber").value = "";
        document.getElementById("email").value = "";
      } else {
        mensagemErro.textContent = data.message;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao conectar com o servidor.";
    });
}
