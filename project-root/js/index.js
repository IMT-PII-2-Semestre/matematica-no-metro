
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('a[href="#volunteer"]').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'voluntario.html'; 
  });
});

document.querySelector('#feedback form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('feedbackName').value;
  const email = document.getElementById('feedbackEmail').value;
  const message = document.getElementById('feedbackMessage').value;

  if (name && email && message) {
    alert('Obrigado pelo seu feedback, ' + name + '!');
    // adicionar código para enviar o feedback para um servidor ou API
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});




