document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerar Cards de Posições Dinamicamente
    const positionsContainer = document.getElementById('positions-container');
    if (positionsContainer) {
        const positions = [
            { title: 'Levantador', desc: 'O cérebro do time, responsável por distribuir as jogadas.' },
            { title: 'Oposto', desc: 'Principal atacante, geralmente posicionado na diagonal do levantador.' },
            { title: 'Ponteiro', desc: 'Ataca pelas pontas e tem papel fundamental no passe.' },
            { title: 'Central', desc: 'Especialista em bloqueio e ataques rápidos pelo meio.' },
            { title: 'Líbero', desc: 'Especialista em defesa e recepção, usa uniforme de cor diferente.' }
        ];

        positions.forEach(pos => {
            const card = document.createElement('div');
            card.className = 'position-card';
            card.innerHTML = `
                <h3>${pos.title}</h3>
                <p>${pos.desc}</p>
            `;
            positionsContainer.appendChild(card);
        });
    }

    // 2. Validação Simples de Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const feedback = document.getElementById('form-feedback');
            
            feedback.innerHTML = `<p style="color: green; margin-top: 1rem;">Obrigado, ${name}! Sua mensagem foi enviada com sucesso.</p>`;
            contactForm.reset();
        });
    }

    // 3. Animação de Scroll Suave
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Menu Mobile (Burger)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
});
