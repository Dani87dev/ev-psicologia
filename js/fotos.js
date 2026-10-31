// ===== Configuración =====
// Para añadir fotos: cópialas en img/fotos/ y escribe aquí su nombre de archivo.
const FOTOS = [
  // 'consulta-luz.jpg',
  // 'plantas.jpg',
];

// Email al que llega la selección
const EMAIL = 'tu-email@ejemplo.com';

// ===== Galería =====
const galeria = document.getElementById('fotos');
const barra = document.getElementById('fotos-barra');
const contador = document.getElementById('fotos-contador');
const enviar = document.getElementById('fotos-enviar');
const CLAVE = 'fotos-seleccionadas';

// La selección se recuerda en el navegador por si recarga la página
let seleccion = [];
try { seleccion = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch {}
seleccion = seleccion.filter(f => FOTOS.includes(f));

const guardar = () => {
  try { localStorage.setItem(CLAVE, JSON.stringify(seleccion)); } catch {}
};

const actualizar = () => {
  const n = seleccion.length;
  contador.textContent = `${n} seleccionada${n === 1 ? '' : 's'}`;
  barra.hidden = n === 0;
  const cuerpo = 'Estas son las fotos que me gustan:\n\n' + seleccion.join('\n');
  enviar.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Mi selección de fotos')}&body=${encodeURIComponent(cuerpo)}`;
};

if (FOTOS.length === 0) {
  document.getElementById('fotos-vacio').hidden = false;
}

FOTOS.forEach(nombre => {
  const boton = document.createElement('button');
  boton.className = 'foto';
  boton.type = 'button';
  boton.setAttribute('aria-pressed', seleccion.includes(nombre));
  boton.innerHTML = `<img src="img/fotos/${nombre}" alt="${nombre}" loading="lazy"><span class="foto__marca">✓</span>`;

  boton.addEventListener('click', () => {
    const elegida = seleccion.includes(nombre);
    seleccion = elegida ? seleccion.filter(f => f !== nombre) : [...seleccion, nombre];
    boton.setAttribute('aria-pressed', !elegida);
    guardar();
    actualizar();
  });

  galeria.appendChild(boton);
});

actualizar();
