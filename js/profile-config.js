// Configuración mínima del perfil académico.
// Para nuevos profesores, copia este archivo y cambia solamente personaId.
window.PROFILE_CONFIG = {
  personaId: 'huber-giron',

  // En producción, el repo del profesor vive como subcarpeta:
  // https://mecatronica.ibero.mx/huber-giron/
  // Por eso /data apunta al catálogo general de mecatronica-v2.
  dataBaseUrl: '/data',

  // Página institucional de detalle para cursos, proyectos, publicaciones y recursos.
  detalleBaseUrl: '/academia/detalle.html',

  // Página local existente del perfil para listar todos los elementos por categoría.
  listingPage: 'mas-contenido.html',

  // Número de tarjetas mostradas en el home del perfil.
  homeLimit: 3
};
