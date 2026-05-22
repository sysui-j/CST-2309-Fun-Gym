const form = document.querySelector(".register-form");

form.addEventListener("submit", function (e) {

  const firstName = document.getElementById("fname");
  const lastName = document.getElementById("lname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const age = document.getElementById("age");
  const goals = document.querySelector("textarea");
  const membership = document.querySelector('input[name="membership"]:checked');

  // Validation
  if (
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === "" ||
    age.value.trim() === "" ||
    goals.value.trim() === "" ||
    !membership
  ) {

    e.preventDefault();

    alert("Please complete all required fields.");

    return;
  }

  e.preventDefault();

  alert("You submitted the form successfully!");

  form.reset();

});