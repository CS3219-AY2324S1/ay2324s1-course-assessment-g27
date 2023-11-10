# Question service

## Usage

1. Rename .env.sample to .env, and change the values of variables `MONGO_URL` and `JWT_SECRET`. You can get these values by any of our group members. 
2. Install npm packages using npm install.
3. Ensure postgresdb is available locally.
4. Run Question Service using `npm run dev`.

## Docker

-   Via docker-compose: `docker-compose up --build`

Then visit `http://localhost:8080` to see that hello from question-service!
