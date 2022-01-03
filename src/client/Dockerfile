# Start from base image of Node.js of version 14.16.1
FROM node:16.13.1
# FROM node:14.16.1

# Set working directory of our container to be the '/app' within container
WORKDIR /app/client

# copy dependency into our image to './' = working directory
COPY package.json ./

# update latest version of npm
RUN npm install -g npm@latest npm-check-updates --silent

# install our dependency into the container when buidling the image
RUN npm install --silent

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


# copy all src/client files to './' = working directory
COPY . ./

# expose container to port 3000
EXPOSE 3000

# command run by container
CMD ["npm", "start"]