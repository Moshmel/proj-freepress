const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const addUserRoutes = require("./routes/user-route");
const addPostRoutes = require("./routes/post-route");
const App = express();


// App.use(express.static(path.join(__dirname, 'client/build')));
App.use(bodyParser.json());
App.use(cookieParser());
App.use(
  cors({
    origin: ["http://localhost:3000",'https://moshegram.herokuapp.com','http://moshegram.herokuapp.com'],
    credentials: true // enable set cookie
  })
);
App.use(
  session({
    secret: "pressiketatov",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);


const PORT = process.env.PORT || 3001;
App.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
addUserRoutes(App);
addPostRoutes(App);

// App.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });