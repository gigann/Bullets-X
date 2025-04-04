# What image do you want to start building on?
FROM node:20-alpine
# Make a folder in your image where your app's source code can live

# Tell your container where your app's source code will live
WORKDIR /src/index
# What source code do you what to copy, and where to put it?
COPY . /src/index
# What port will the container talk to the outside world with once created?
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT
# Does your app have any dependencies that should be installed?
RUN npm install
# How do you start your app?
CMD npm start