# Tiny Hub

Tiny Hub is a clone website of AirBnB, as my first fullstack application this site gives users the ability to create, read, update and delete spots for other users to stay at. It also gives users the ability to create, read and delete reviews for the spots so long as they are signed in, do not own the spot, and havent previously left a review.


[TinyHub](https://tinyhub-x81c.onrender.com)

<img width="1261" alt="Screenshot 2022-11-20 at 5 41 42 PM" src="https://user-images.githubusercontent.com/102694854/202936047-d8ad2606-ff13-4ee6-aba2-474f66c5c260.png">


---------------------------------------
## list of technologies used on this project

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&style=plastic)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white&style=plastic)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white&style=plastic)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=plastic)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB&style=plastic)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB&style=plastic)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white&style=plastic)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white&style=plastic)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white&style=plastic)

---------------------------------------

### if you would like to run this application locally:
1. first clone the repo locally into a directory of your choice
2. then run npm install in the backend and frontend directories
3. next you will need to make a .env file with these keys a `PORT` whose value is represented by the port number you will be using, `DB_FILE` which represents the location of you local database, `JWT_SECRET` which is your code for checking JWT tokens, and finally a `JWT_EXPIRES_IN` which represents the length of time in seconds until the token expires please make sure to set the .env file in the root of the backend folder.
4. in order to migrate and seed the database make sure to run the following scripts from your terminal:
```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
5. finally make sure to run in your backend and frontend (from 2 different terminals) `npm start` once you run `npm start` in your frontend terminal it should open a window for you to the website however if this doesnt happen just navigate to http://localhost:3000 in your browser.
