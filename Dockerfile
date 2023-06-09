# pull official base image
FROM node:17-alpine as builder

# set work directory
WORKDIR /app/frontend/
COPY . .
# install dependencies
RUN npm install

# Build the project and copy the files
RUN npm run build

# copy project
FROM nginx:stable-alpine
#!/bin/sh
RUN rm /etc/nginx/conf.d/default.conf
COPY -from=builder /app/frontend/build /usr/share/nginx/html/
COPY -from=builder /app/frontend/nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]