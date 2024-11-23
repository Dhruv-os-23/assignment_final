# Use the official Node.js image as a base
FROM node:18

# Install dependencies for LibreOffice
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libfontconfig1 \
  libreoffice \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4999
CMD ["node", "server.js"] 
