FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm install && npm run build
ENV PORT 5050
EXPOSE 5050
CMD ["node","build"]