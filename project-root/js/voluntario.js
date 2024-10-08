document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  senha !== confirmarSenha
  ? new bootstrap.Modal(document.getElementById('senhaModal')).show()
  : alert('Formulário enviado com sucesso!');
});
