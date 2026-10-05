/* ==========================================================================
   main.js — wire every waitlist form on the page.
   Redirects to thanks.html on successful submit.
   ========================================================================== */

import { joinWaitlist } from './supabase.js';

const THANKS_URL = '/thanks.html';

document.querySelectorAll('[data-waitlist-form]').forEach((form) => {
  const source  = form.getAttribute('data-source') || 'unknown';
  const input   = form.querySelector('input[type="email"]');
  const button  = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!input.value || !input.checkValidity()) {
      if (message) {
        message.textContent = 'Please enter a valid email.';
        message.className = 'form-message is-error';
      }
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Adding…';
    if (message) message.textContent = '';

    try {
      await joinWaitlist(input.value, source);
      window.location.href = `${THANKS_URL}?source=${encodeURIComponent(source)}`;
    } catch (err) {
      console.error('Waitlist failed:', err);
      if (message) {
        message.textContent = 'Something went wrong. Please try again.';
        message.className = 'form-message is-error';
      }
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});