<div align="center">
  <img alt="Logo" src="./src/assets/images/logo.png" width="100" />
</div>
<h1 align="center">
  Explorify
</h1>
<p align="center">
  A music streaming web application inspired by Spotify.
</p>
<p align="center">
  View the app <a href="https://explorifyy.herokuapp.com/" target="_blank" rel="nofollow noopener noreferrer">here</a>!
</p>
<br />

## Built With MERN Stack

* MongoDB (Database)
* Express (Web app framework)
* React (Build user interfaces)
* Node (Js runtime environment)

## Notable Packages Used

* Axios (Server api calls)
* Bcrypt (Password hashing)
* Cors (Express middleware)
* Jsonwebtoken (JSON web tokens)
* Mongoose (MongoDB connector)
* React-Redux (Global states)
* React-Router-Dom (Routing)

## User Stories

* Users can register for an account, log into their account, log into a demo account, and log out
* Users can search for an artist, album, or song
* Users can view artists, albums, and an artist's top 8 most played songs
* Users can save an album into their library
* Users can create a new playlist and delete their playlists
* Users can add/remove songs from their liked songs and playlists
* Users can shuffle songs, go to previous song, play songs, go to next song, and loop songs
* Users can play an entire album or playlist

## Entity Relationship Diagram (ERD)

<div align="center">
  <img alt="ERD" src="./src/assets/images/erd.png" width="1000" />
</div>


## Authentication and Security

User authentication was done using Bcrypt (password hashing). When a user signs up, a hashed password is stored along with their user information in the database. When a user tries to log in again, the inputted password is validated by Bcrypt by comparing it to stored hashed password.

## Sessions

User sessions was done using JSON Web Tokens (JWT). When a user logs in or signs up, a JWT with an expiry time of 1 hour is created and stored in the user's local storage and in Redux. On each screen load, the client makes an server call to decode the stored JWT in Redux. If the JWT has expired, the user is redirected out back to the landing page and must log in again to access the application. If the user closes the application tab in their browser and revists the site, the application will look for a JWT stored in the local storage of the browser. After decoding the JWT and seeing that it is still valid, the application will fill the JWT and user information into redux resuming the user session. 


## Deployment

The client and server side of this application were both deployed seperately using heroku. The server side uses the cloud database service MongoDB Atlas. 

## Authors

* **Michael Li** - Full stack development
