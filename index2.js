function gravar() {
    let nome = document.getElementById('namedentista').value;
    let cro = document.getElementById('cro').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (nome && cro) {
        let dados = {
            Nome: nome,
            CRO: cro
        };

        let url = 'http://localhost:3000/dentists';

        // Determina se a requisição é POST (inserção) ou PUT (atualização)
        let method = cro ? 'PUT' : 'POST'; // Se 'cro' estiver preenchido, é uma atualização (PUT), senão é uma inserção (POST)
        if (method === 'PUT') {
            url += `/${cro}`;
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gravar dentista');
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

            let tdCRO = document.createElement('td');
            tdCRO.textContent = dentista.CRO;
            tr.appendChild(tdCRO);

            let tdNome = document.createElement('td');
            tdNome.textContent = dentista.Nome;
            tr.appendChild(tdNome);

            let tdAcao = document.createElement('td');
            let buttonExcluir = document.createElement('button');
            buttonExcluir.textContent = 'Excluir';
            buttonExcluir.onclick = function() {
                excluir(dentista.CRO);
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

function excluir(cro) {
    fetch(`http://localhost:3000/dentists/${cro}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir dentista');
        }
        carregarDados();
    })
    .catch(error => {
        console.error('Erro ao excluir dentista:', error);
        alert('Erro ao excluir dentista. Verifique o console para mais detalhes.');
    });
}


