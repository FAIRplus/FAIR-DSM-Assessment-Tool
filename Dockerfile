#STAGE 1: Build Stage
#slim version of node is highly recommended
FROM node:16.10-slim as build_stage

#set working directory in the container where all our local files will be copied and run. If the directory is not found then docker will create it
WORKDIR /home/app
 
#copy the package.json file from our local system(Pc) to the working directory(container)
COPY package.json package-lock.json* ./
 
#install npm packages (node_modules) in the container as we will build and run the application in the container
RUN npm install
 
#copy all the sources from the host(local PC) to the working directory of the container
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096 
ENV GENERATE_SOURCEMAP=false
 
#now have all source files and node_modules in our container, so build the project
RUN npm run build
 
# In this stage, we have our production files in the dist folder. So, in the next step we will serve our application from dist folder of that container directory using a nginx server.
  
 
 
#STAGE 2: Run Stage###
FROM nginx:1.17.1-alpine
 
#copy the nginx config file from the host(local PC) to the nginx container specific location. This will configure our nginx server.
COPY nginx.conf /etc/nginx/nginx.conf
 
#copy the built files( from the dist folder) from our build_stage to the docker container 
COPY --from=build_stage /home/app/dist/server-manager /usr/share/nginx/html