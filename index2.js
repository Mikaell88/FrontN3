function gravar() {
    let name = document.getElementById('namedentista').value;
    let cro = document.getElementById('cro').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (name && cro) {
        let dados = {
            name: name,
            cro: cro
        };

        let url = 'http://localhost:3000/dentists';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Dentista gravado/atualizado:', data);
            limpar(); // Limpa o formulário após gravar com sucesso
            carregarDados(); // Recarrega os dados após gravar
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
            alert('Erro ao gravar dentista. Verifique o console para mais detalhes.');
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function limpar() {
    document.getElementById('namedentista').value = '';
    document.getElementById('cro').value = '';
}

function carregarDados() {
    fetch('http://localhost:3000/dentists')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        return response.json();
    })
    .then(data => {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        data.forEach(dentista => {
            let tr = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = dentista.id; // Ajustado para 'id'
            tr.appendChild(tdId);

            let tdCro = document.createElement('td');
            tdCro.textContent = dentista.cro;
            tr.appendChild(tdCro);

            let tdName = document.createElement('td');
            tdName.textContent = dentista.name;
            tr.appendChild(tdName);

            let tdAcao = document.createElement('td');
            let buttonExcluir = document.createElement('button');
            buttonExcluir.textContent = 'Excluir';
            buttonExcluir.onclick = function() {
                excluir(dentista.id);
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
    fetch(`http://localhost:3000/dentists/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        carregarDados();
    })
    .catch(error => {
        console.error('Erro ao excluir dentista:', error.message);
        alert('Erro ao excluir dentista. Verifique o console para mais detalhes.');
    });
}


