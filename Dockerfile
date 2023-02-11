# pull official base image
FROM node:18-alpine

# set work directory
WORKDIR /app/frontend/

# install dependencies
COPY package*.json /app/frontend/
RUN npm ci

# copy project
COPY . /app/frontend/

CMD ["npm", "start"]