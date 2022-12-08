# Black Stars

### Discription
This is a simple app that provides authorized user with information of the black star players, which includes 
* Rating
* Height
* Weight
* Positions. etc
  
### Features
* Update Player info
* Add Players
* Delete Players

### Technologies
* NodeJs
* Typescript
* MongoDB
* Express

### How it works
Users are to create an account to have access to the players database. 
To create an account you are to provide your email __(not authenticated)__ and create a password to be given access.
When Registration is complete you now have access to the database of all the current players of the black stars of the year 2022.
You can go on and update, create and delete any player at will.

### Possible future feature updates
* Email authentication
* Web hosted

### Project Setup
Follow these instructions to setup this project on your PC.
To begin, make sure you already have ___node, npm, and a MongoDB__ installed on your PC.

* Clone this Repository
on your pc, open your prefered cli, move to your prefered folder and run `git clone https://github.com/FiifiYawson/black-stars.git`.

* After cloning is complete, Run `npm i` to install all dependencies

* Create a .env file in the root directory. Fill it with these info
```.env
    SECRET = __random secret for jwt__ (just a random string will do)    
    MONGO_ATLAS_URI = __your personal mongoDB atlas uri__ (optional)
    MONGO_LOCAL_URI = mongodb://localhost/black-stars
    NODE_ENV = development (use "production" if you want to use your mongoDB atlas database. "development" will you a local database)
    PORT = 5000 (this is the port the server will run on)
```

* after setting up your environment variable, Run `npm run start`.
  If for any reason it refused to start, Run `npm run build` then run `npm run start` again.

* Server will start and you can run the project on your browser at localhost:(__PORT number in .env__)