# FAIR-DSM-Assessment-Tool


## Run locally

### Step1: Setup
First install [node](https://nodejs.org/en/download/) in your machine 

### Step2: Clone
Clone the project

### Step3: Download node_modules inside the project
Open the in the command line into the project root and run ` npm i`


### Step4: Run the project
Open the in the command line into the project root and run ` npm start`.
Navigate to `http://localhost:4200/`.


## Build docker image and push to dockerhub
first change locally and check if everything works fine.
### build docker image
Then build the docker image and push the image to dockerhub. 
We can tag the image while building as it is necessary to tag the image when u want to push it in the dockerhub
So we will use
`docker build -t your_dockerhub_username/your_image_name :version_name .`
example: docker build -t imonbayazid/fair-dsm-tool:v2 .
change the tag everytime you change something.

### run docker image with local image
Check docker images in the docker
docker images
Run the docker image
`docker run -p 4200:4200 -d your_dockerhub_username/your_image_name:version_name`
example: docker run -p 4200:4200 -d imonbayazid/fair-dsm-tool:v2

check the running container and it’s port
`docker ps -a`
check the localhost:port
### push docker image to dockerhub
Now push the docker image that we just built to the dockerhub.
So, first login to your dockerhub account.
`docker login -u your_dockerhub_username`
then just push the image
`docker push your_dockerhub_username/your_image_name :version_name`
example: docker push imonbayazid/fair-dsm-tool:v2

To check whether your image works or not,run the docker image that you pushed to dockerhub.
First, remove your local image that you run previously also remove the container.
docker rm -f YOUR_DOCKER_CONTAINER_ID
docker rmi -f YOUR_DOCKER_IMAGE_ID

## Run with docker image from dockerhub
`docker run -p 4200:4200 -d your_dockerhub_username/your_image_name :version_name`

example: docker run -p 4200:4200 -d imonbayazid/fair-dsm-tool:v2
Finally, navigate to `http://localhost:4200/`.
