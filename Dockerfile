# pull official base image
FROM node:17-alpine as builder

# set work directory
COPY ./package.json .

# install dependencies
RUN npm install

COPY . .
# Build the project and copy the files
RUN npm run build

# copy project
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /build /usr/share/nginx/html/
COPY --from=builder /nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]