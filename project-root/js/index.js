// Smooth Scroll para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const backToTopButton = document.createElement('button');
backToTopButton.innerText = "↑ HOME";
backToTopButton.classList.add('btn', 'btn-light', 'back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


document.querySelectorAll('a[href="#volunteer"]').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'voluntario.html'; 
  });
});
