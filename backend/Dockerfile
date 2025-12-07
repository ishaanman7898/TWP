FROM node:20-bullseye-slim

# Install Chromium and dependencies for puppeteer-core
RUN apt-get update && apt-get install -y \
    ca-certificates wget gnupg --no-install-recommends && \
    apt-get install -y \
    fonts-liberation libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libdrm2 libxkbcommon0 libgbm1 libxrandr2 libgtk-3-0 libnss3 libxss1 \
    libxcb1 libx11-xcb1 libxcomposite1 libxdamage1 libxfixes3 libpango-1.0-0 \
    libpangocairo-1.0-0 libxshmfence1 && \
    rm -rf /var/lib/apt/lists/*

# Install Chromium
RUN apt-get update && apt-get install -y chromium

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
