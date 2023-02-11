docker run --env-file <path-env> -it -d --name <containername> -p <port>:<port> <image>:<tag>
docker run -it -d --name social-media-fe -p 3000:3000 waflol/social-media-fe:lastest