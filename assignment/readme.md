# Question service

## Usage

1. Rename .env.sample to .env, and change the values of variables ```MONGO_URL``` and ```JWT_SECRET```. You can get these values by emailing any of our group members. 
2. Install npm packages using ```npm install```.
3. Run Question Service using ```npm run dev```.

# User service

## Usage

### First time set up:

1. Ensure that you have PostgreSQL downloaded on your local machine. If not, please refer to this [section](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g27/edit/Assignment-2/assignment/readme.md#setting-up-your-postgresql) for more information about setting up PostgreSQL.
2. In the file ```assignment/server/dbConnection.ts```, change the username and password to the one you have set up during the installation of PostgreSQL.
3. Run ```npm run initdb``` to initialise the database.
    - Note that doing this will clear any user profile data saved in the database before this.
4. The app is now set up for you to register and login.

### Subsequent usage:
1. As long as you do not re-initialise the databse, your user data should persist, and you can login as per normal.

## Setting up your PostgreSQL
1. [Guide](https://www.w3schools.com/postgresql/postgresql_install.php) to installing PostgreSQL.
    - Take note that your default username is ```postgres```. 
    - Note down your ```password``` for connection to the user profile database in the app. You can set it to ```postgres``` as default.
    - It is alright to keep all the installation settings to the default ie. components, directory, port _(default 5432)_
2. Open SQL Shell from your start menu, you will be prompted to confirm your connection information. Press enter to confirm until you are prompted to enter your password. For more information, refer to this [guide](https://www.w3schools.com/postgresql/postgresql_getstarted.php).
3. Enter the ```password``` that you have set.
4. You are now logged in to the database and you can run SQL queries in it.
