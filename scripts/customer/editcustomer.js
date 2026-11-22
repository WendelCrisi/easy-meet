function carregarCliente() {
  const params = new URLSearchParams(window.location.search);
  const customer_id = params.get("id");

  fetch(
    "../api/customer/get_customer.php?customer_id=" +
      encodeURIComponent(customer_id),
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("name").value = data.customer.name;
        document.getElementById("companyname").value =
          data.customer.company_name;
        document.getElementById("phonenumber").value =
          data.customer.phone_number;
        document.getElementById("email").value = data.customer.email;
      } else {
        document.getElementById("mensagem-erro").textContent = data.message;
      }
    });
}

function salvarEdicao() {
  const params = new URLSearchParams(window.location.search);
  const customer_id = params.get("id");

  const name = document.getElementById("name").value.trim();
  const companyname = document.getElementById("companyname").value.trim();
  const phonenumber = document.getElementById("phonenumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  if (!name || !companyname) {
    mensagemErro.textContent = "Preencha nome e nome da empresa.";
    return;
  }

  fetch("../api/customer/update_customer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id,
      name,
      companyname,
      phonenumber,
      email,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mensagemSucesso.textContent = "Cliente atualizado com sucesso.";
      } else {
        mensagemErro.textContent = data.message;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao conectar com o servidor.";
    });
}

carregarCliente();
