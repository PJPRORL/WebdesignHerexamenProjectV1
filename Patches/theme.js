// Theme toggle script
// This script toggles between dark and light modes by adding/removing
// `.dark` and `.light` classes on the <html> element. It also updates
// the displayed icon to reflect the current theme and persists the
// preference in localStorage.
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');

    // Apply syntax highlighting if highlight.js is loaded
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    const updateIcons = (theme) => {
        if (theme === 'dark') {
            // show sun icon when dark (to switch back to light)
            themeIconLight.classList.remove('hidden');
            themeIconDark.classList.add('hidden');
        } else {
            // show moon icon when light (to switch to dark)
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        }
    };

    const applyTheme = (theme) => {
        const htmlEl = document.documentElement;
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            htmlEl.classList.remove('light');
        } else {
            htmlEl.classList.remove('dark');
            htmlEl.classList.add('light');
        }
        updateIcons(theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
});