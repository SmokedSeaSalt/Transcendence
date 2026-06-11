FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --silent

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]