FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
# Uncomment the following line for production
# RUN npm ci --omit-dev 
COPY . .
EXPOSE 80
CMD ["npx", "vite"]
