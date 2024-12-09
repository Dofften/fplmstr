
FROM node:18.0.0


WORKDIR /app


COPY . /app


RUN npm install


RUN npm run build


CMD ["npm", "start"]