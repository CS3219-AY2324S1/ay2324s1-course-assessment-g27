# How to run the Assignment 4

## Usage

### Starting the Question-Service
1. Change directory to question-service using `cd question-service`.
2. Run `npm install`.
3. Make a copy of `.env.sample` and fill in the values of the variables.
4. Make the Docker image and container of this question repository application using `docker-compose up`.

### Starting the User-Service
1. Change directory to question-service using `cd user-service`.
2. Run `npm install`.
3. Make a copy of `.env.sample` and fill in the values of the variables.
4. Make the Docker image and container of this user profile management application using `docker-compose up`.

### Starting the Front-End for Testing
1. Change directory to front-end using `cd front-end`.
2. Run `npm install`.
3. Run the application using `npm run dev`.
4. Visit the site that is shown to see both the question and user services at work. e.g `http://localhost:5173`.
