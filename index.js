document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    if (validarFormulario()) {
        let nome = document.getElementById('nome').value;
        let cpf = document.getElementById('cpf').value;
        let email = document.getElementById('email').value;
        let telefone = document.getElementById('telefone').value;
        
        // Cria um objeto com os dados do formulário
        let dados = {
            name: nome,
            email: email,
            cpf: cpf,
            telefone: telefone
        };

        // Envia uma solicitação POST para a sua API
        fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            // Manipula a resposta da API, se necessário
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
        });
    }
});

function validarFormulario() {
    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;
    
    if (nome === '' || cpf === '' || email === '' || telefone === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    return true; 
}

function limparFormulario() {
    document.getElementById('cadastroForm').reset(); 
    document.getElementById('dadosJson').value = ''; 
}
