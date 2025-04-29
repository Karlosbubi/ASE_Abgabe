# Start by specifying the base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install all node modules
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Your app binds to port 3000 so use the EXPOSE instruction
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]