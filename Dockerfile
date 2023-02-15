# pull official base image
FROM node:18-alpine

# set work directory
WORKDIR /app/frontend/

# install dependencies
COPY package*.json /app/frontend/
RUN npm install

# copy project
COPY . /app/frontend/
EXPOSE 3000

CMD ["npm", "start"]