document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;

      const feedback = document.createElement("div");
      feedback.innerHTML = `<h4>El Emperador se pondrá en contacto contigo, ${name}!</h4>`;

      document.getElementById("contactoForm").appendChild(feedback);

      setTimeout(() => {
        document.getElementById("contactoForm").removeChild(feedback);
      }, 2000);

      event.target.reset();
    });
});
