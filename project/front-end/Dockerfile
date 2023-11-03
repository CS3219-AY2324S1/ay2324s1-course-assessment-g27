FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
# Uncomment the following line for production
# RUN npm ci --omit-dev 
COPY . .
EXPOSE 5000
CMD ["npx", "vite"]
