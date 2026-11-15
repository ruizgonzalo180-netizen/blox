(() => {
  'use strict';
  const action = document.getElementById('browser-open');
  const label = document.getElementById('browser-open-label');
  const note = document.getElementById('browser-open-note');
  const status = document.getElementById('browser-open-status');
  const chrome = document.getElementById('browser-open-chrome');
  const platform = document.getElementById('browser-open-platform');
  if (!action || !label || !note || !status || !chrome || !platform) return;

  let destination;
  try {
    destination = new URL(window.GUIDE_CONFIG?.destinations?.find(item => item?.id === 'web')?.url || '');
    if (!['http:', 'https:'].includes(destination.protocol) || destination.username || destination.password) throw new Error('Destino inválido');
  } catch (_) {
    action.removeAttribute('href');
    action.setAttribute('aria-disabled', 'true');
    note.textContent = 'O link ainda não está disponível.';
    return;
  }

  const ua = navigator.userAgent || '';
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const fallback = new URL(window.location.href);
  fallback.searchParams.set('ajuda', '1');
  fallback.hash = 'abrir';
  let browserName = '';

  if (android) {
    // The actual anchor is followed by the user's tap, preserving user activation.
    const target = destination.href.slice(destination.protocol.length).replaceAll('#', '%23');
    action.href = 'intent:' + target + '#Intent;scheme=' + destination.protocol.slice(0, -1) + ';package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(fallback.href) + ';end';
    label.textContent = 'ABRIR NO CHROME';
    platform.textContent = 'ANDROID';
    note.textContent = 'Toque para tentar abrir fora do TikTok.';
    browserName = 'Chrome';
  } else if (ios) {
    // Safari's scheme is not a documented cross-app guarantee. Keep manual and
    // Chrome alternatives. The HTTPS relay preserves an HTTP destination as-is.
    const relay = new URL('ir.html', window.location.href);
    relay.protocol = 'https:';
    relay.search = '';
    relay.hash = '';
    action.href = 'x-safari-' + relay.href;
    label.textContent = 'ABRIR NO SAFARI';
    platform.textContent = 'IPHONE / IPAD';
    note.textContent = 'Toque e confirme a abertura, se o celular pedir.';
    chrome.href = (destination.protocol === 'https:' ? 'googlechromes:' : 'googlechrome:') + destination.href.slice(destination.protocol.length);
    chrome.hidden = false;
    browserName = 'Safari';
  } else {
    action.href = destination.href;
    label.textContent = 'CONTINUAR PARA O SITE';
    platform.textContent = 'ANDROID + IPHONE';
    note.textContent = 'No celular, o botão tenta abrir no navegador.';
  }

  let timer = null;
  let attempted = false;
  function clearAttempt() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
  }
  function showHelp() {
    clearAttempt();
    status.hidden = false;
    status.textContent = 'Não abriu? No TikTok, toque em ••• e escolha «Abrir no navegador». Veja o exemplo abaixo.';
  }
  function onAttempt(name) {
    clearAttempt();
    attempted = true;
    status.hidden = false;
    status.textContent = 'Tentando abrir o ' + name + '… Confirme no celular, se aparecer uma mensagem.';
    // A timeout only offers help; it never claims the browser opened or failed.
    timer = window.setTimeout(() => {
      if (!document.hidden) showHelp();
    }, 2200);
  }
  if (browserName) action.addEventListener('click', event => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    onAttempt(browserName);
  });
  chrome.addEventListener('click', () => onAttempt('Chrome'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearAttempt();
    else if (attempted) showHelp();
  });
  window.addEventListener('pagehide', clearAttempt);
  window.addEventListener('pageshow', () => { if (attempted) showHelp(); });
  if (new URL(window.location.href).searchParams.get('ajuda') === '1') showHelp();
})();
