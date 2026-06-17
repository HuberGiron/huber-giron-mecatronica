// Puente local hacia el cargador central de contenidos.
// Este archivo reemplaza al antiguo js/content-loader.js que leía data/*.json locales.
// Ahora el perfil consume el catálogo general publicado en /data dentro de mecatronica-v2.
(function () {
  'use strict';

  window.PROFILE_CONFIG = Object.assign({
    personaId: '',
    dataBaseUrl: '/data',
    detalleBaseUrl: '/academia/detalle.html',
    listingPage: 'mas-contenido.html',
    homeLimit: 3
  }, window.PROFILE_CONFIG || {});

  function loadCentralProfileLoader() {
    if (window.__PROFILE_CONTENT_LOADER_REQUESTED__) return;
    window.__PROFILE_CONTENT_LOADER_REQUESTED__ = true;

    const script = document.createElement('script');
    script.src = '/assets/js/profile-content-loader.js?v=2026-06-17-3';
    script.defer = true;
    script.onerror = function () {
      console.error('No se pudo cargar /assets/js/profile-content-loader.js. Verifica que el archivo exista en mecatronica-v2/assets/js/.');
      document.querySelectorAll('[data-dynamic-section], [data-profile-section], [data-listing-page]').forEach(function (mount) {
        mount.innerHTML = '<div class="alert alert-warning">No fue posible cargar el contenido del perfil.</div>';
      });
    };
    document.head.appendChild(script);
  }

  loadCentralProfileLoader();
})();
