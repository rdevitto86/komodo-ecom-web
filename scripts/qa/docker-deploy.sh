#!/bin/bash

# scripts/setup-onprem.sh - Setup home server for deployment

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🏠 Setting up on-premises server...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create application directory
APP_DIR="$HOME/react-app"
echo -e "${GREEN}📁 Creating application directory: $APP_DIR${NC}"
mkdir -p $APP_DIR
cd $APP_DIR

# Setup environment file for on-prem
echo -e "${GREEN}⚙️  Creating on-premises environment file...${NC}"
cat > .env.onprem << EOF
NODE_ENV=production
VITE_API_URL=http://$(hostname -I | awk '{print $1}'):3001
VITE_APP_NAME="My React App (On-Prem)"
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
EOF

# Setup systemd service for auto-start (optional)
echo -e "${YELLOW}🔧 Do you want to setup auto-start on boot? (y/n)${NC}"
read -r SETUP_AUTOSTART

if [[ $SETUP_AUTOSTART =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}⚙️  Setting up systemd service...${NC}"
    
    sudo tee /etc/systemd/system/react-app.service > /dev/null << EOF
[Unit]
Description=React App Container
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose --profile onprem up -d
ExecStop=/usr/local/bin/docker-compose --profile onprem down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable react-app.service
    echo -e "${GREEN}✅ Auto-start configured${NC}"
fi

# Setup port forwarding info
echo -e "${GREEN}🌐 Network Configuration:${NC}"
echo -e "${YELLOW}Internal IP: $(hostname -I | awk '{print $1}')${NC}"
echo -e "${YELLOW}App will be available at: http://$(hostname -I | awk '{print $1}'):8080${NC}"
echo ""
echo -e "${YELLOW}To access from other devices on your network:${NC}"
echo -e "1. Make sure port 8080 is open on this machine"
echo -e "2. Access via: http://$(hostname -I | awk '{print $1}'):8080"
echo ""
echo -e "${YELLOW}To setup a local domain (optional):${NC}"
echo -e "Add this to your router's DNS or /etc/hosts on client machines:"
echo -e "$(hostname -I | awk '{print $1}')    app.home.local"

# Setup firewall rule (Ubuntu/Debian)
if command -v ufw &> /dev/null; then
    echo -e "${GREEN}🔥 Setting up firewall rule...${NC}"
    sudo ufw allow 8080/tcp
    sudo ufw allow 8090/tcp  # Traefik dashboard
fi

# Create deployment script
cat > deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 Deploying to on-premises server..."

# Pull latest code (if using git)
if [ -d ".git" ]; then
    git pull origin main
fi

# Build and deploy
docker-compose --profile onprem up -d --build

echo "✅ Deployment complete!"
echo "🌐 App available at: http://$(hostname -I | awk '{print $1}'):8080"
echo "📊 Traefik dashboard: http://$(hostname -I | awk '{print $1}'):8090"
EOF

chmod +x deploy.sh

echo -e "${GREEN}✅ On-premises setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Copy your React app code to: $APP_DIR"
echo -e "2. Run: make onprem (or ./deploy.sh)"
echo -e "3. Access your app at: http://$(hostname -I | awk '{print $1}'):8080"