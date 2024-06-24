function gravar() {
  let dateTime = document.getElementById("consultaData").value;
  let idDentista = document.getElementById("idDentista").value;
  let idCliente = document.getElementById("idCliente").value;

  if (dateTime && idCliente && idDentista) {
    let dados = {
      dentistId: idDentista,
      customerId: idCliente,
      dateTime: dateTime,
    };

    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Consulta gravada:", data);
        limpar();
        carregarDados();
      })
      .catch((error) => {
        console.error("Erro ao enviar dados para a API:", error.message);
        alert("Erro ao gravar consulta. Verifique o console para mais detalhes.");
      });
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}

function limpar() {
  document.getElementById("consultaData").value = "";
}

function carregarDados() {
  fetch("http://localhost:3000/appointments")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar dados da API");
      }
      return response.json();
    })
    .then((data) => {
      let tbody = document.getElementById("tbody");
      tbody.innerHTML = "";

      data.forEach((consulta) => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = consulta.id;
        tr.appendChild(tdId);

        const dateTimeFormated = new Date(consulta.dateTime).toLocaleString();

        let tdData = document.createElement("td");
        tdData.textContent = dateTimeFormated;
        tr.appendChild(tdData);

        let tdAcao = document.createElement("td");
        let buttonExcluir = document.createElement("button");
        buttonExcluir.textContent = "Excluir";
        buttonExcluir.onclick = function () {
          excluir(consulta.id);
        };
        tdAcao.appendChild(buttonExcluir);
        tr.appendChild(tdAcao);

        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar dados da API:", error.message);
      alert("Erro ao carregar dados da API. Verifique o console para mais detalhes.");
    });
}

function excluir(id) {
  fetch(`http://localhost:3000/appointments/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      carregarDados();
    })
    .catch((error) => {
      console.error("Erro ao excluir consulta:", error.message);
      alert("Erro ao excluir consulta. Verifique o console para mais detalhes.");
    });
}
