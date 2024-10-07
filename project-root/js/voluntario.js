document.querySelector('form').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Por favor, verifique.');
      event.preventDefault(); // Previne o envio do formulário se as senhas não coincidirem
    }
  });