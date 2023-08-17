FROM node:alpine
WORKDIR /user/social-app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]