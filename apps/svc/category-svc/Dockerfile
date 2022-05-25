FROM node:16

COPY apps/svc/category-svc/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY dist/apps/svc/category-svc .

CMD ["node", "./main.js"]

EXPOSE 4000

