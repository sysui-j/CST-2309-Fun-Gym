const form = document.querySelector(".register-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("You submitted the form successfully!");

  if (confirm("Do you want to clear the form?")) {
    form.reset();
  }
});