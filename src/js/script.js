document
  .getElementById("reviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const review = document.getElementById("review").value;

    const feedback = document.createElement("div");
    feedback.innerHTML = `<h4>Gracias por tu reseña, ${name}!</h4>`;

    document.getElementById("reviewForm").appendChild(feedback);

    // const remove = document.getElementById("reviewForm").removeChild(feedback);

    setTimeout(() => {
      document.getElementById("reviewForm").removeChild(feedback);
    }, 1500);

    event.target.reset();
  });

