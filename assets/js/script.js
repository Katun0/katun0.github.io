// script.js — Interações básicas da página
// - Alerta de boas-vindas ao clicar no botão
// - Mostrar/ocultar seção de habilidades (toggle)
// - Saudação dinâmica com base no nome digitado
// - Ano atual no rodapé e contador de visitas com localStorage
// - Desenho simples no <canvas>

(function () {
  'use strict';

  // Util: seleção segura
  const $ = (sel) => document.querySelector(sel);

  // Elementos
  const btnAlert = $('#btn-alert');
  const toggleSkillsBtn = $('#toggle-skills-btn');
  const skillsSection = $('#habilidades');
  const aplicarNomeBtn = $('#aplicar-nome');
  const inputNome = $('#nome');
  const saudacaoSpan = $('#saudacao');
  const anoAtualSpan = $('#ano-atual');
  const visitasEl = $('#visitas');
  const canvas = $('#decor-canvas');

  // 1) Alerta simples
  if (btnAlert) {
    btnAlert.addEventListener('click', function () {
      alert('Olá! Obrigado por visitar meu portfólio.');
    });
  }

  // 2) Toggle de habilidades com acessibilidade
  if (toggleSkillsBtn && skillsSection) {
    toggleSkillsBtn.addEventListener('click', function () {
      const isHidden = skillsSection.hasAttribute('hidden');
      if (isHidden) {
        skillsSection.removeAttribute('hidden');
        toggleSkillsBtn.setAttribute('aria-expanded', 'true');
        toggleSkillsBtn.textContent = 'Ocultar habilidades';
      } else {
        skillsSection.setAttribute('hidden', '');
        toggleSkillsBtn.setAttribute('aria-expanded', 'false');
        toggleSkillsBtn.textContent = 'Mostrar habilidades';
      }
    });
  }

  // 3) Saudação dinâmica
  function aplicarSaudacao() {
    const nome = (inputNome?.value || '').trim();
    if (nome) {
      saudacaoSpan.textContent = `Olá, ${nome}! 👋`;
      // Opcional: persistir nome para próxima visita
      try { localStorage.setItem('nomeUsuario', nome); } catch (e) {}
    } else {
      saudacaoSpan.textContent = 'Olá! 👋';
      try { localStorage.removeItem('nomeUsuario'); } catch (e) {}
    }
  }

  if (aplicarNomeBtn) aplicarNomeBtn.addEventListener('click', aplicarSaudacao);
  if (inputNome) {
    inputNome.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); aplicarSaudacao(); }
    });
  }

  // 4) Ano atual no rodapé
  if (anoAtualSpan) anoAtualSpan.textContent = String(new Date().getFullYear());

  // 5) Contador de visitas local
  try {
    const key = 'contadorVisitas';
    const raw = localStorage.getItem(key);
    const count = (raw ? parseInt(raw, 10) : 0) + 1;
    localStorage.setItem(key, String(count));
    if (visitasEl) {
      visitasEl.textContent = `Visitas nesta máquina: ${count}`;
    }
    // Restaurar nome, se existir
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    if (nomeSalvo && inputNome && saudacaoSpan) {
      inputNome.value = nomeSalvo;
      saudacaoSpan.textContent = `Olá, ${nomeSalvo}! 👋`;
    }
  } catch (e) {
    // localStorage indisponível (modo privado etc.)
  }

  // 6) Canvas: desenho simples (gradiente + círculos)
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    // Fundo gradiente
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(34,211,238,0.35)');
    grad.addColorStop(1, 'rgba(167,139,250,0.35)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Bolhas decorativas
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 10 + Math.random() * 28;
      ctx.beginPath();
      ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.15)' : 'rgba(2,6,23,0.25)';
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Borda
    ctx.strokeStyle = 'rgba(148,163,184,0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, h - 8);
  }
})();
