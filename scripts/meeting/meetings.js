const usuarioLogado = protegerPagina();

if (usuarioLogado) {
  document.getElementById("nome-usuario-logado").textContent =
    usuarioLogado.name;
}

function carregarReunioes(search = "") {
  fetch("../api/meeting/list_meeting.php?search=" + encodeURIComponent(search))
    .then((response) => response.json())
    .then((data) => {
      const tabela = document.getElementById("tabela-reunioes");

      tabela.innerHTML = "";

      data.meetings.forEach((meeting) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${meeting.customer_name}</td>

          <td>${meeting.company_name}</td>

          <td>${formatarData(meeting.data_hora)}</td>

          <td>${formatarTipoReuniao(meeting.online)}</td>

          <td class="text-end">
            <a
              href="editmeeting.html?id=${meeting.id}"
              class="btn btn-sm btn-outline-primary me-1"
            >
              <i class="bi bi-pencil"></i>
            </a>

            <button
              class="btn btn-sm btn-outline-danger btn-excluir"
              data-id="${meeting.id}"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;

        tabela.appendChild(linha);
      });
    });
}

function formatarData(data) {
  const [dataParte, horaParte] = data.split("T");

  const [ano, mes, dia] = dataParte.split("-");

  return `${dia}/${mes}/${ano} às ${horaParte}`;
}

function formatarTipoReuniao(online) {
  return Number(online) === 1 ? "Online" : "Presencial";
}

function excluirReuniao(meeting_id) {
  fetch("../api/meeting/delete_meeting.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meeting_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        carregarReunioes(document.getElementById("busca-name").value);
      } else {
        alert(data.message);
      }
    });
}

document.getElementById("busca-name").addEventListener("input", function () {
  carregarReunioes(this.value);
});

document
  .getElementById("tabela-reunioes")
  .addEventListener("click", function (event) {
    const botaoExcluir = event.target.closest(".btn-excluir");

    if (botaoExcluir) {
      const meeting_id = botaoExcluir.dataset.id;

      if (confirm("Deseja excluir a reunião?")) {
        excluirReuniao(meeting_id);
      }
    }
  });

carregarReunioes();
