/* ==========================================================================
   supabase.js — Kaya landing page Supabase client.
   Only knows about the `waitlist` table. Nothing else.
   ========================================================================== */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { CONFIG } from './config.js';

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY
);

/**
 * Add an email to the waitlist. Silent on duplicates.
 * @param {string} email
 * @param {string} [source] — where on the page the form lives
 * @returns {Promise<{ok: true}>}
 */
export async function joinWaitlist(email, source) {
  const { error } = await supabase.from('waitlist').insert({
    email: email.trim().toLowerCase(),
    source: source || 'unknown',
    referrer: document.referrer || null,
  });

  /* 23505 = unique_violation — already on the list. Treat as success. */
  if (error && error.code !== '23505') throw error;
  return { ok: true };
}