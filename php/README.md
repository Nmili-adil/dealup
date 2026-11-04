# Leads endpoint (`/leads`)

Standalone PHP endpoint behind `NEXT_PUBLIC_API_URL`. The website is a static
export, so the three lead forms (`contact`, `book-demo`, homepage final CTA) post
JSON here and this script emails the lead over SMTP.

## Deploy

1. Upload `leads.php`, `smtp.php`, `.htaccess` to the document root of
   `api.dealup.ma` (the host serving `NEXT_PUBLIC_API_URL`).
2. `cp config.example.php config.php` and fill in the SMTP credentials, the
   `from`/`to` mailboxes, and `allowed_origins`.
3. Make sure `config.php` is not world-readable: `chmod 600 php/config.php`.

Nginx instead of Apache — `.htaccess` is ignored, add the route:

```nginx
location = /leads { try_files /leads.php =404; }
location ~ /config\.php$ { deny all; }
```

## Contract

`POST /leads`, `Content-Type: application/json`:

```json
{ "name": "…", "email": "…", "phone": "…", "company": "", "source": "contact_page" }
```

`source` must be one of `contact_page`, `book_demo_page`, `homepage_final_cta`.

Replies `200 {"ok":true}`, `422 {"error":"invalid_field","field":"…"}` on bad
input, `502 {"error":"delivery_failed"}` when SMTP refuses. SMTP errors go to the
PHP error log, never to the response.

## Smoke test

```bash
curl -i -X POST https://api.dealup.ma/leads \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://dealup.ma' \
  -d '{"name":"Test","email":"you@example.com","phone":"+212600000000","company":"","source":"contact_page"}'
```
