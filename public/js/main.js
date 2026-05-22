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

    document.querySelectorAll('.share-copy').forEach(btn => {
        btn.addEventListener('click', async () => {
            const url = btn.dataset.copyUrl || location.href;
            try {
                await navigator.clipboard.writeText(url);
                const original = btn.textContent;
                btn.textContent = '✓';
                setTimeout(() => { btn.textContent = original; }, 1200);
            } catch (e) {
                location.href = url;
            }
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
