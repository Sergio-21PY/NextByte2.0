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

// Función de login con roles
function loginUser() {
  const usuario = document.getElementById("login-usuario").value;
  const password = document.getElementById("login-password").value;

  // Usuarios de prueba
  const admin = { usuario: "admin@admin.cl", password: "1234", rol: "ADMIN", nombre: "Administrador" };
  const user = { usuario: "user@user.cl", password: "1234", rol: "USER", nombre: "Usuario Normal" };

  let currentUser = null;

  if (usuario === admin.usuario && password === admin.password) {
    currentUser = admin;
  } else if (usuario === user.usuario && password === user.password) {
    currentUser = user;
  }

  if (currentUser) {
    alert(`Bienvenido ${currentUser.rol}`);
    closeForms(); // cierra modal login

    // Guardar sesión en localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Mostrar usuario en header con dropdown
    mostrarUsuario(currentUser);

    // Mostrar panel según rol
    mostrarPanel(currentUser.rol);

  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// Mostrar usuario en cabecera con dropdown
function mostrarUsuario(user) {
  const userActions = document.querySelector(".user-actions");
  if (!userActions) return;

  if (user.rol === "ADMIN") {
    // Dropdown para administrador
    userActions.innerHTML = `
      <div class="user-dropdown">
        <span class="user-badge" onclick="toggleDropdown('admin-menu')">👤 ${user.nombre} <i class="bi bi-caret-down-fill"></i></span>
        <div class="dropdown-menu" id="admin-menu">
          <a href="admin.html">Panel Administrador</a>
          <a href="envios.html">Envios realizados</a>
          <a href="historial.html">Historial de ventas</a>
          <a href="#" onclick="logout()">Cerrar Sesión</a>
        </div>
      </div>
    `;
  } else {
    // Dropdown para usuario normal
    userActions.innerHTML = `
      <div class="user-dropdown">
        <span class="user-badge" onclick="toggleDropdown('user-menu')">👤 ${user.nombre} (${user.rol}) <i class="bi bi-caret-down-fill"></i></span>
        <div class="dropdown-menu" id="user-menu">
          <a href="#">Perfil</a>
          <a href="#">Configuración</a>
          <a href="#" onclick="logout()">Cerrar sesión</a>
        </div>
      </div>
    `;
  }
}

// Mostrar/Ocultar dropdown
function toggleDropdown(menuId) {
  const menu = document.getElementById(menuId);
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

// Mostrar panel según rol
function mostrarPanel(rol) {
  if (document.getElementById("admin-panel") && document.getElementById("user-panel")) {
    if (rol === "ADMIN") {
      document.getElementById("admin-panel").style.display = "block";
      document.getElementById("user-panel").style.display = "none";
    } else {
      document.getElementById("user-panel").style.display = "block";
      document.getElementById("admin-panel").style.display = "none";
    }
  }
}

// Recuperar usuario al cargar la página
window.onload = function () {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    const currentUser = JSON.parse(savedUser);

    // Mostrar usuario en header
    mostrarUsuario(currentUser);

    // Mostrar panel (si la página tiene paneles)
    mostrarPanel(currentUser.rol);
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("currentUser");
  alert("Sesión cerrada");

  // Restaurar botones originales
  const userActions = document.querySelector(".user-actions");

  if (userActions) {
    userActions.innerHTML = `
      <button class="user-link" onclick="showLogin()">Iniciar sesión</button>
      <span class="separator">|</span>
      <button class="user-link" onclick="showRegister()">Registrarse</button>
    `;
  }

  // Ocultar paneles si existen
  if (document.getElementById("admin-panel") && document.getElementById("user-panel")) {
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("user-panel").style.display = "none";
  }
}
