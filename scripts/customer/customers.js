const usuarioLogado = protegerPagina();

if (usuarioLogado) {
  document.getElementById("nome-usuario-logado").textContent =
    usuarioLogado.name;
}

function carregarClientes(search = "") {
  fetch(
    "../api/customer/list_customers.php?search=" + encodeURIComponent(search),
  )
    .then((response) => response.json())
    .then((data) => {
      const tabela = document.getElementById("tabela-clientes");
      tabela.innerHTML = "";

      data.customers.forEach((customer) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${customer.name}</td>
          <td>${customer.company_name}</td>
          <td class="text-end">
            <a href="editcustomer.html?id=${customer.id}" class="btn btn-sm btn-outline-primary me-1">
              <i class="bi bi-pencil"></i>
            </a>
            <button
              class="btn btn-sm btn-outline-danger btn-excluir"
              data-id="${customer.id}"}
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;

        tabela.appendChild(linha);
      });
    });
}

function excluirCliente(customer_id) {
  fetch("../api/customer/delete_customer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        carregarClientes(document.getElementById("busca-name").value);
      } else {
        alert(data.message);
      }
    });
}

document.getElementById("busca-name").addEventListener("input", function () {
  carregarClientes(this.value);
});

document
  .getElementById("tabela-clientes")
  .addEventListener("click", function (event) {
    const botaoExcluir = event.target.closest(".btn-excluir");

    if (botaoExcluir) {
      const customer_id = botaoExcluir.dataset.id;

      if (confirm("Deseja excluir o cliente?")) {
        excluirCliente(customer_id);
      }
    }
  });

carregarClientes();
