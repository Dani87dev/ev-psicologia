// ===== Acceso con PIN =====
// Pantalla sencilla para que nadie ajeno vea la web en construcción.
// No es seguridad de verdad: solo evita que un visitante cualquiera vea los prototipos.
// Para cambiar el número, cámbialo aquí (a quien ya había entrado se lo volverá a pedir).
// Se carga en el <head> de todas las páginas, antes de que se pinte nada.
(function () {
  var PIN = '1987';
  var CLAVE = 'acceso-pin';

  try {
    if (localStorage.getItem(CLAVE) === PIN) return;
  } catch (e) {}

  var raiz = document.documentElement;
  raiz.classList.add('bloqueado');

  var estilos = document.createElement('style');
  estilos.textContent =
    'html.bloqueado body > *:not(.acceso) { display: none !important; }' +
    'html.bloqueado body { overflow: hidden; }' +
    '.acceso { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 16px;' +
    '  background: #fbf8f4; color: #3a3a3a; font-family: "Nunito Sans", sans-serif; text-align: center; }' +
    '.acceso__caja { width: 100%; max-width: 340px; }' +
    '.acceso__logo { font-family: "Lora", serif; font-size: 1.4rem; color: #5d8172; line-height: 1.3; }' +
    '.acceso__logo span { display: block; font-size: .8rem; letter-spacing: .2em; text-transform: uppercase; color: #6b6b6b; margin-top: .3rem; }' +
    '.acceso__texto { margin: 1.8rem 0 1rem; color: #6b6b6b; }' +
    '.acceso input { width: 100%; padding: .8rem 1rem; font: inherit; font-size: 1.3rem; letter-spacing: .4em; text-align: center;' +
    '  border: 2px solid #d9d1c7; border-radius: 12px; background: #fff; color: inherit; outline: none; }' +
    '.acceso input:focus { border-color: #7a9e8e; }' +
    '.acceso button { width: 100%; margin-top: .8rem; padding: .8rem 1.8rem; border: 0; border-radius: 999px; cursor: pointer;' +
    '  background: #7a9e8e; color: #fff; font: inherit; font-weight: 600; transition: background .2s; }' +
    '.acceso button:hover { background: #5d8172; }' +
    '.acceso__error { min-height: 1.5em; margin-top: .8rem; color: #b05a4a; font-size: .9rem; }' +
    '.acceso--mal input { animation: acceso-temblor .3s; border-color: #b05a4a; }' +
    '@keyframes acceso-temblor { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }';
  document.head.appendChild(estilos);

  document.addEventListener('DOMContentLoaded', function () {
    var capa = document.createElement('div');
    capa.className = 'acceso';
    capa.innerHTML =
      '<form class="acceso__caja">' +
      '  <div class="acceso__logo">María del Diego Barquín <span>Psicóloga</span></div>' +
      '  <p class="acceso__texto">Web en construcción.<br>Introduce el código para entrar.</p>' +
      '  <input type="password" inputmode="numeric" autocomplete="off" aria-label="Código de acceso" autofocus>' +
      '  <button type="submit">Entrar</button>' +
      '  <p class="acceso__error" aria-live="polite"></p>' +
      '</form>';
    document.body.appendChild(capa);

    var form = capa.querySelector('form');
    var campo = capa.querySelector('input');
    var error = capa.querySelector('.acceso__error');
    campo.focus();

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (campo.value.trim() === PIN) {
        try { localStorage.setItem(CLAVE, PIN); } catch (e) {}
        capa.remove();
        raiz.classList.remove('bloqueado');
      } else {
        error.textContent = 'Código incorrecto';
        campo.value = '';
        capa.classList.remove('acceso--mal');
        void capa.offsetWidth;
        capa.classList.add('acceso--mal');
        campo.focus();
      }
    });
  });
})();
