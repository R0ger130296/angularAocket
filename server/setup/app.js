const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  userRoutes = require("../routes/users.routes"),
  db = connectDB(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/", (req, res) => {
  res.send(
    `Your session: ${req.sessionID}, number of visits: ${req.session.views["/"]} times`
  );
});

app.use("/api", userRoutes);

module.exports = app;
