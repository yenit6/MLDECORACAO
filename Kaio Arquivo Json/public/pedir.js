document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value;
  
    if (cep.length === 8) {
      fetch(`/buscar-endereco/${cep}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('CEP não encontrado');
          }
          return response.json();
        })
        .then(data => {
          document.getElementById('adress').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
        })
        .catch(error => {
          console.error('Erro:', error);
          alert('CEP não encontrado ou inválido');
        });
    } else {
      alert('CEP inválido. Deve conter 8 dígitos.');
    }
  });
  