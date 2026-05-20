document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            item.classList.toggle('open');
        });
    });

    // Channel table region filter
    document.querySelectorAll('.region-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const region = tab.dataset.region;
            document.querySelectorAll('.cable-table tbody tr').forEach(row => {
                if (row.dataset.region === region) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});
