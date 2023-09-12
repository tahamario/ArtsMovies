//  to controll ur website
const express = require("express");
const app = express();
const port = 3000;
//hlmet for web cors securties
const helmet = require("helmet");
//call for controllers
const articleController = require('./controllers/articleController');
const filmController = require('./controllers/filmController');
const indexController = require('./controllers/indexController');

//this code to mention which template engine you will use
app.set("view engine", "ejs");
//this for call directly files from public in ejs fils
app.use(express.static("public"));

// mongoose
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  // "mongodb://127.0.0.1:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true }
  "mongodb+srv://tmoudnib:colocolo2015@cluster0.tzdpxrr.mongodb.net/artsmovies?retryWrites=true&w=majority"
).then((result) => {
    app.listen(process.env.PORT  || port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// End for auto refresh


// index routes
app.get("/", indexController.index_get);

app.get("/home", indexController.index_index_get);

//article routes
app.get("/add-new-article", articleController.article_addNewArticle_get);

app.get("/article-details/:id", articleController.article_articleDetails_get);

app.get("/article-edit/:id", articleController.article_articleEdit_get);

app.post("/article", articleController.article_post);

app.post("/article-edit", articleController.article_articleEdit_post); 

app.delete("/article/:id", articleController.article_delete);

//film routes
app.get("/add-new-film", filmController.film_addNewFilm_get);

app.get("/film-details/:id", filmController.film_filmDetails_get);

app.get("/film-edit/:id", filmController.film_filmEdit_get);

app.post("/film", filmController.film_post);

app.post("/film-edit", filmController.film_filmEdit_post);

app.delete("/film/:id", filmController.film_delete); 

//helmet secure your website by adding http cors
app.use(helmet()); 

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
