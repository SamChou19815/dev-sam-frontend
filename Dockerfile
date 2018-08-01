FROM node:8.11.3-alpine
RUN mkdir /app
WORKDIR  /app
COPY ./ ./
EXPOSE 4000
CMD ["npm", "run", "serve:ssr"]
