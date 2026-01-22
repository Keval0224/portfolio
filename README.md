# Keval Parmar - Portfolio Website

A modern, animated, dark-theme personal portfolio website built with HTML, CSS, JavaScript, and Node.js.

## Features
- **Dark Theme** with gradient accents.
- **Glassmorphism** design elements.
- **Scroll Animations** using AOS.
- **Typed Text Effects** for role switching.
- **Particle Background** for a futuristic feel.
- **Responsive Design** for all devices.

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript
- Libraries: Particles.js, Typed.js, AOS, FontAwesome
- Backend: Node.js, Express (for serving static files)

## Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Server:**
    ```bash
    node server.js
    ```
    Or if you have `nodemon` (optional):
    ```bash
    npx nodemon server.js
    ```

3.  **View locally:**
    Open [http://localhost:3000](http://localhost:3000)

## Deployment (AWS + Nginx + PM2)

### 1. Setup AWS EC2
- Launch an EC2 instance (Ubuntu/Linux default).
- Open ports 80 (HTTP), 443 (HTTPS), and 22 (SSH).
- SSH into your instance.

### 2. Install Node.js & PM2
```bash
# Update packages
sudo apt update

# Install Node.js (v18 or later recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

### 3. Deploy Code
- Clone this repository to your server or copy files.
- Install dependencies:
  ```bash
  npm install
  ```

### 4. Run with PM2
```bash
# Start the app
pm2 start server.js --name "portfolio"

# Ensure PM2 restarts on reboot
pm2 startup
pm2 save
```

### 5. Configure Nginx (Reverse Proxy)
Install Nginx:
```bash
sudo apt install nginx
```

Edit the default config:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace contents with:
```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

Your portfolio should now be live!
