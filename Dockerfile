FROM node:18

COPY frontend /frontend

WORKDIR /frontend

RUN npm install

RUN npm run build

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
