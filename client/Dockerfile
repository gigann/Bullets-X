# What image do you want to start building on?
FROM node:20-alpine
# Make a folder in your image where your app's source code can live

# Tell your container where your app's source code will live
WORKDIR /src/app
# What source code do you what to copy, and where to put it?
COPY . /src/app
# What port will the container talk to the outside world with once created?
ENV CLIENT_PORT=$CLIENT_PORT
EXPOSE $CLIENT_PORT
# Does your app have any dependencies that should be installed?
RUN npm install
# How do you start your app?
CMD npm run dev