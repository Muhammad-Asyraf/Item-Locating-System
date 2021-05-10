# Start from base image of Node.js of version 14.16.1
FROM node:14.16.1

# Set working directory of our container to be the '/app' within container
WORKDIR /app/client

# copy dependency into our image to './' = working directory
COPY package.json ./

# install our dependency into the container when buidling the image
RUN npm install --silent

# copy all src/client files to './' = working directory
COPY . ./

# expose container to port 3000
EXPOSE 3000

# command run by container
CMD ["npm", "start"]