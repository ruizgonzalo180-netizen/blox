(() => {
  'use strict';
  const link = document.getElementById('relay-continue');
  const status = document.getElementById('relay-status');
  try {
    // Never accept a redirect target from query parameters.
    const url = new URL(window.GUIDE_CONFIG?.destinations?.find(item => item?.id === 'web')?.url || '');
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Destino inválido');
    link.href = url.href;
    window.location.replace(url.href);
  } catch (_) {
    link.hidden = true;
    status.textContent = 'Não foi possível continuar. Volte ao guia e tente novamente.';
  }
})();
