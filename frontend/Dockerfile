FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./

# Install all dependencies including devDeps (vite)
RUN npm install --silent --no-audit --no-fund

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]