async function carregarReuniao() {
  const params = new URLSearchParams(window.location.search);
  const meeting_id = params.get("id");

  try {
    const response = await fetch(
      "../api/meeting/get_meeting.php?meeting_id=" +
        encodeURIComponent(meeting_id),
    );

    const data = await response.json();

    if (data.success) {
      document.getElementById("companyname").value = data.meeting.customer_id;

      document.getElementById("meetingdate").value = data.meeting.data_hora;

      document.getElementById("online").checked =
        Number(data.meeting.online) === 1;

      document.getElementById("link").value = data.meeting.link || "";

      document.getElementById("observacao").value =
        data.meeting.observacao || "";

      atualizarCampoLink();
    } else {
      document.getElementById("mensagem-erro").textContent = data.message;
    }
  } catch (error) {
    console.error("Erro ao carregar reunião:", error);

    document.getElementById("mensagem-erro").textContent =
      "Erro ao carregar a reunião.";
  }
}

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

    select.appendChild(optionInicial);

    data.customers.forEach((customer) => {
      const option = document.createElement("option");

      option.value = customer.id;
      option.textContent = customer.company_name;

      select.appendChild(option);
    });

    return true;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    return false;
  }
}

function atualizarCampoLink() {
  const switchOnline = document.getElementById("online");
  const campoLink = document.getElementById("campo-link");

  if (switchOnline.checked) {
    campoLink.classList.remove("d-none");
  } else {
    campoLink.classList.add("d-none");
  }
}

function salvarEdicao() {
  const params = new URLSearchParams(window.location.search);

  const meeting_id = params.get("id");

  const customer_id = document.getElementById("companyname").value.trim();

  const data_hora = document.getElementById("meetingdate").value.trim();

  const online = document.getElementById("online").checked;

  const link = online ? document.getElementById("link").value.trim() : "";

  const observacao = document.getElementById("observacao").value.trim();

  const mensagemErro = document.getElementById("mensagem-erro");

  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  mensagemErro.textContent = "";
  mensagemSucesso.textContent = "";

  if (!customer_id || !data_hora) {
    mensagemErro.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  fetch("../api/meeting/update_meeting.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meeting_id,
      customer_id,
      data_hora,
      online,
      link,
      observacao,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mensagemSucesso.textContent = "Reunião atualizada com sucesso.";
      } else {
        mensagemErro.textContent = data.message;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao conectar com o servidor.";
    });
}

document
  .getElementById("online")
  .addEventListener("change", atualizarCampoLink);

async function inicializar() {
  const clientesCarregados = await carregarClientes();

  if (clientesCarregados) {
    await carregarReuniao();
  }
}

inicializar();
