# Kaya — Landing page

Marketing and waitlist page for Kaya, a booking system for South African salons.
Standalone repo. No dependency on the app repo.

No framework, no build step.

## Setup

1. Copy `assets/js/config.example.js` to `assets/js/config.js`.
2. Fill in your Supabase project URL and anon key.
3. Run `supabase/waitlist.sql` in the Supabase SQL editor.
4. Serve the folder with any static server:

```bash
python3 -m http.server 8000