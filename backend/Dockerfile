# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies (ci for lockfile-based clean install)
RUN npm ci --silent

COPY . .

EXPOSE 4000

# Run in dev mode (with nodemon)
CMD ["npm", "run", "dev"]