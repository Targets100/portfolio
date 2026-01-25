// Initialize EmailJS
(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // <-- replace
})();

const form = document.getElementById("contact-form");
const button = document.getElementById("submit-btn");
const buttonText = button.querySelector(".btn-text");

const toastEl = document.getElementById("form-toast");
const toastBody = document.getElementById("toast-body");
const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Honeypot spam check
  if (form.company.value !== "") {
    return;
  }

  // Loading state
  button.disabled = true;
  buttonText.textContent = "Sending...";

  emailjs
    .sendForm(
      "YOUR_SERVICE_ID",   // <-- replace
      "YOUR_TEMPLATE_ID",  // <-- replace
      form
    )
    .then(() => {
      showToast("Message sent successfully ✓", "success");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      showToast("Something went wrong. Please try again.", "danger");
    })
    .finally(() => {
      button.disabled = false;
      buttonText.textContent = "Send";
    });
});

function showToast(message, type) {
  toastBody.textContent = message;

  toastEl.classList.remove("text-bg-success", "text-bg-danger");
  toastEl.classList.add(`text-bg-${type}`);

  toast.show();
}
