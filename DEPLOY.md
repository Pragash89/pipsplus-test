# PipsPlus — Deployment Guide (Hostinger / GoDaddy VPS)

## What you need

- A **VPS plan** (not shared hosting — Next.js requires Node.js server)
  - Hostinger: KVM 1 or above (~$5–8/mo)
  - GoDaddy: VPS Economy or above
- A **domain name** pointed to your server IP
- **PostgreSQL** running on the server (or use a managed DB)

---

## How to change images after publishing

**Yes, you can change any image at any time.**

- All site images live in the `public/` folder on your server
- To swap an image: upload the new file with the **same filename** to `public/`
- Logo: `public/logo-dark.png` (navbar) and `public/logo-light.png` (footer)
- No rebuild needed for static images in `public/`
- For images hardcoded in pages (like hero backgrounds), edit the source file and run `npm run build` + restart the server

---

## Step-by-Step Deployment

### Step 1 — Set up the VPS

SSH into your server:
```bash
ssh root@YOUR_SERVER_IP
```

Install Node.js 20+ (LTS):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version   # should show v20.x.x
```

Install PostgreSQL:
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Create the database and user:
```bash
sudo -u postgres psql << 'EOF'
CREATE DATABASE pipsplus;
CREATE USER pipsuser WITH ENCRYPTED PASSWORD 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE pipsplus TO pipsuser;
ALTER DATABASE pipsplus OWNER TO pipsuser;
EOF
```

Install PM2 (keeps the site running after logout):
```bash
npm install -g pm2
```

Install Git:
```bash
sudo apt install -y git
```

---

### Step 2 — Upload the project

**Option A — Git (recommended):**
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/pipsplus.git
cd pipsplus
```

**Option B — File transfer (FTP/SFTP):**
Upload everything EXCEPT:
- `node_modules/` (too large, will install on server)
- `.next/` (will build on server)
- `.env` and `.env.local` (upload manually, see Step 3)

Use FileZilla or WinSCP to upload to `/var/www/pipsplus/`

---

### Step 3 — Configure environment

Create the production environment file:
```bash
nano /var/www/pipsplus/.env.local
```

Paste this (edit all values):
```env
DATABASE_URL="postgresql://pipsuser:YourStrongPassword123!@127.0.0.1:5432/pipsplus"

NEXTAUTH_SECRET="generate-a-random-64-char-string-here"
NEXTAUTH_URL="https://www.pipsplus.com"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

RESEND_API_KEY=""
EMAIL_FROM="noreply@pipsplus.com"

NEXT_PUBLIC_SITE_URL="https://www.pipsplus.com"
NODE_ENV="production"
```

Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 48
```
Copy the output and paste it as the NEXTAUTH_SECRET value.

---

### Step 4 — Install dependencies & build

```bash
cd /var/www/pipsplus
npm install --production=false
npm run build
```

---

### Step 5 — Set up the database

```bash
cd /var/www/pipsplus
npx prisma db push
npm run db:seed
```

---

### Step 6 — Start the server with PM2

```bash
cd /var/www/pipsplus
pm2 start npm --name "pipsplus" -- run start
pm2 save
pm2 startup
```

Run the command PM2 prints (it looks like `sudo env PATH=...`) to auto-start on reboot.

Verify it's running:
```bash
pm2 status
pm2 logs pipsplus
```

The site is now running on port 3000.

---

### Step 7 — Set up Nginx reverse proxy (so port 80/443 work)

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/pipsplus
```

Paste:
```nginx
server {
    listen 80;
    server_name pipsplus.com www.pipsplus.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/pipsplus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Step 8 — SSL certificate (HTTPS) — Free via Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d pipsplus.com -d www.pipsplus.com
```

Follow prompts. Certbot auto-renews every 90 days.

---

### Step 9 — Point your domain

In your domain registrar (Hostinger/GoDaddy DNS panel):

| Type | Name | Value |
|------|------|-------|
| A | @ | YOUR_SERVER_IP |
| A | www | YOUR_SERVER_IP |

DNS propagation takes 5–30 minutes.

---

## Updating the site after changes

```bash
cd /var/www/pipsplus
git pull              # if using Git
npm install           # only if package.json changed
npm run build
pm2 restart pipsplus
```

## Changing images

```bash
# Upload new image to public/ folder via SFTP, then:
# No restart needed for public/ images
# For images in code, rebuild:
npm run build && pm2 restart pipsplus
```

---

## Performance checklist (already done)

- [x] Security headers (CSP, HSTS, X-Frame-Options)
- [x] Rate limiting (60 req/min API, 10 req/min auth)
- [x] Next.js image optimization (automatic WebP conversion)
- [x] Server-side rendering for SEO
- [x] 4-locale i18n (en, ar, es, fr) with RTL support
- [x] Mobile-responsive on all pages
- [x] PostgreSQL with Prisma ORM

## Browser compatibility

The site uses modern CSS and React — compatible with:
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome for Android

---

## Demo accounts (for testing on live server)

- Admin: `admin@pipsplus.com` / `Admin@123456`
- Trader: `trader@pipsplus.com` / `Trader@123456`

**Change these passwords immediately after going live.**
