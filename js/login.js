// Mostrar modal login
function showLogin() {
  document.getElementById("login-modal").classList.add("show");
  document.getElementById("register-modal").classList.remove("show");
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "block";
  setTimeout(() => overlay.style.opacity = 1, 10);
}

// Mostrar modal registro
function showRegister() {
  document.getElementById("register-modal").classList.add("show");
  document.getElementById("login-modal").classList.remove("show");
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "block";
  setTimeout(() => overlay.style.opacity = 1, 10);
}

// Cerrar cualquier modal
function closeForms() {
  document.getElementById("login-modal").classList.remove("show");
  document.getElementById("register-modal").classList.remove("show");
  const overlay = document.getElementById("modal-overlay");
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = "none", 300);
}
