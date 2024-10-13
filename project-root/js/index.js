
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
    window.location.href = '../html/voluntario.html'; 
  });
});

document.querySelectorAll('a[href="#terms"]').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '../html/termos-de-uso.html'; 
  });
});


