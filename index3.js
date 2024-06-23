function gravar() {
    let data = document.getElementById('consultaData').value;

    
    if (data) {
        let dados = {
            Data: data
        };

        fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gravar consulta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Consulta gravada:', data);
            limpar(); 
            carregarDados(); 
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
            alert('Erro ao gravar consulta. Verifique o console para mais detalhes.');
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function limpar() {
    document.getElementById('consultaData').value = '';
}

function carregarDados() {
    fetch('http://localhost:3000/appointments')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        return response.json();
    })
    .then(data => {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        data.forEach(consulta => {
            let tr = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = consulta.ID;
            tr.appendChild(tdId);

            let tdData = document.createElement('td');
            tdData.textContent = consulta.Data;
            tr.appendChild(tdData);

            let tdAcao = document.createElement('td');
            let buttonExcluir = document.createElement('button');
            buttonExcluir.textContent = 'Excluir';
            buttonExcluir.onclick = function() {
                excluir(consulta.ID);
            };
            tdAcao.appendChild(buttonExcluir);
            tr.appendChild(tdAcao);

            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados da API:', error);
        alert('Erro ao carregar dados da API. Verifique o console para mais detalhes.');
    });
}

function excluir(id) {
    fetch(`http://localhost:3000/appointments/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir consulta');
        }
        carregarDados();
    })
    .catch(error => {
        console.error('Erro ao excluir consulta:', error);
        alert('Erro ao excluir consulta. Verifique o console para mais detalhes.');
    });
}
