## Assignment 3

- Assumption: You have done the basic set up mentioned in the previous assignments

- To evaluate this assignment, you will need to change a user admin status in postgresSQL. (Assume you have followed Assignment 2 and have created a user inside the postgres database)
    - Go to postgresSQL command prompt
    - Enter `UPDATE users SET isadmin = true WHERE username = <username>;` and press enter

- In the server folder, create a `.env` file and copy the format from `.env-sample` file to it.
    - Set the `MONGO_URL` same as Assignment 2
    - Set `JWT_SECRET` to random string
    - Set `PORT` to 3000

- Enter the command `npm run dev` in both the client and server file
