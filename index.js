function gravar() {
    let nome = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    
    if (nome && email) {
        let dados = {
            name: nome,
            email: email
        };

        fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao gravar cliente');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cliente gravado:', data);
            limpar(); 
            carregarDados(); 
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
            alert('Erro ao gravar cliente. Verifique o console para mais detalhes.');
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function limpar() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function carregarDados() {
    fetch('http://localhost:3000/customers')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar dados da API');
        }
        return response.json();
    })
    .then(data => {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        data.forEach(cliente => {
            let tr = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = cliente.id; 
            tr.appendChild(tdId);

            let tdNome = document.createElement('td');
            tdNome.textContent = cliente.name; 
            tr.appendChild(tdNome);

            let tdEmail = document.createElement('td');
            tdEmail.textContent = cliente.email; 
            tr.appendChild(tdEmail);

            let tdAcao = document.createElement('td');
            let buttonExcluir = document.createElement('button');
            buttonExcluir.textContent = 'Excluir';
            buttonExcluir.onclick = function() {
                excluir(cliente.id); 
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
    fetch(`http://localhost:3000/customers/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir cliente');
        }
        carregarDados();
    })
    .catch(error => {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Verifique o console para mais detalhes.');
    });
}
