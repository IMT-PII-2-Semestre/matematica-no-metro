document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    alert(`Obrigado, ${name}! Entraremos em contato pelo email ${email}.`);

    form.reset();
  });
});
