FROM node:16

COPY apps/api/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/


WORKDIR /app
COPY dist/apps/api .

CMD ["node", "main.js"]

EXPOSE 3333
