'use strict';

// contact form via EmailJS — used on the homepage and /contact.
// the EmailJS public key is designed to be public; restrict allowed
// origins in the EmailJS dashboard so it only works from this domain.

(function () {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm || typeof emailjs === "undefined") return;

  // Initialize EmailJS with your Public Key
  emailjs.init("c6Vh259Be4de_HjwF");

  // Form submit event
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_71dr4th", "template_a74htz8", this)
      .then(() => {
        alert("Message sent successfully!");
        contactForm.reset();
      }, (error) => {
        console.error("EmailJS error", error);
        alert("Sorry, the message could not be sent. Please email utsavkalathiya0001@gmail.com directly.");
      });
  });
})();
