/* ==========================================================================
   main.js — wire every waitlist form on the page.
   ========================================================================== */

import { joinWaitlist } from './supabase.js';

document.querySelectorAll('[data-waitlist-form]').forEach((form) => {
  const source  = form.getAttribute('data-source') || 'unknown';
  const input   = form.querySelector('input[type="email"]');
  const button  = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.form-message');
  const success = form.parentElement.querySelector('.waitlist-success');

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

      if (success) {
        form.style.display = 'none';
        success.classList.add('is-visible');
      } else {
        form.reset();
        if (message) {
          message.textContent = "You're on the list. We'll be in touch.";
          message.className = 'form-message is-success';
        }
      }
    } catch (err) {
      console.error('Waitlist failed:', err);
      if (message) {
        message.textContent = 'Something went wrong. Please try again.';
        message.className = 'form-message is-error';
      }
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});