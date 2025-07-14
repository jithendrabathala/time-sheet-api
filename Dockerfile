FROM node:22-alpine as production

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine as runtime
COPY --from=production /dist ./dist
COPY --from=production package*.json ./
RUN npm install --omit=dev

EXPOSE 8000

CMD ["npm", "run", "start"]