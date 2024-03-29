# pull official base image
FROM node:16 as builder

# set work directory
WORKDIR /app
COPY ./package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# install dependencies
RUN npm install
COPY . .

# copy project
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]