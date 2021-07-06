FROM node:14
# RUN apk add --no-cache python g++ make?
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "./bin/www"]