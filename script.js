const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.querySelector('#contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = `Solicitação de proposta — ${data.get('nome')}`;
  const body = `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\nTelefone: ${data.get('telefone')}\n\n${data.get('mensagem')}`;
  window.location.href = `mailto:wolnei@servicont.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Conclua o envio no seu aplicativo de e-mail. Se ele não abrir, entre em contato pelo telefone 41 - 3023 - 2005.';
});
