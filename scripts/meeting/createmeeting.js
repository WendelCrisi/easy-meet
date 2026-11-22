async function carregarClientes() {
  const select = document.getElementById("companyname");

  try {
    const response = await fetch("../api/customer/list_customers.php");

    const data = await response.json();

    if (!data.success) {
      console.error("Erro ao buscar clientes:", data.message);
      return;
    }

    select.innerHTML = "";

    const optionInicial = document.createElement("option");
    optionInicial.value = "";
    optionInicial.textContent = "Selecione uma empresa";
    optionInicial.disabled = true;
    optionInicial.selected = true;

    select.appendChild(optionInicial);

    data.customers.forEach((customer) => {
      const option = document.createElement("option");

      option.value = customer.id;
      option.textContent = customer.company_name;

      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

const switchOnline = document.getElementById("online");
const campoLink = document.getElementById("campo-link");

switchOnline.addEventListener("change", function () {
  if (this.checked) {
    campoLink.classList.remove("d-none");
  } else {
    campoLink.classList.add("d-none");
  }
});

function criarReuniao() {
  const customer_id = document.getElementById("companyname").value.trim();
  const data_hora = document.getElementById("meetingdate").value.trim();
  const online = document.getElementById("online").checked;
  const link = document.getElementById("link").value.trim();
  const observacao = document.getElementById("observacao").value.trim();
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  if (!customer_id || !data_hora) {
    mensagemErro.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  fetch("../api/meeting/create_meeting.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer_id, data_hora, online, link, observacao }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mensagemSucesso.textContent = "Reunião criada com sucesso.";
        document.getElementById("companyname").value = "";
        document.getElementById("meetingdate").value = "";
        document.getElementById("online").checked = false;
        document.getElementById("link").value = "";
        document.getElementById("observacao").value = "";
      } else {
        mensagemErro.textContent = data.message;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao conectar com o servidor.";
    });
}

carregarClientes();
