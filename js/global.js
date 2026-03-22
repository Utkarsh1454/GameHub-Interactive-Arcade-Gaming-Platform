// global.js
// Overrides the native browser alert with a premium glassmorphic toast notification

window.alert = function(message) {
    // Remove existing toast if it exists to prevent spam overlap
    const existing = document.querySelector('.custom-toast');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = message.replace(/\n/g, '<br>');
    document.body.appendChild(toast);
    
    // Trigger entry animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto-remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Wait for CSS transition
    }, 3500);
};
