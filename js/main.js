const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  const feedback = document.querySelector("#formFeedback");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    feedback.textContent = `Thank you, ${nome}! Your message has been validated in this demonstration.`;
  });
  contactForm.addEventListener("reset", () => {
    if (feedback) feedback.textContent = "";
  });
}
