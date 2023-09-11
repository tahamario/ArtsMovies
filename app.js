//  to controll ur website
const express = require("express");
const app = express();
const port = 3000;
const helmet = require("helmet");
const articleController = require('./controllers/articleController');
const filmController = require('./controllers/filmController');

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


// send data to mongo db
app.get("/", articleController.article_get);

app.post("/all-articles", articleController.article_post);

app.get("/all-articles", articleController.article_index_get);

app.get("/add-new-article", articleController.article_addNewArticle_get);

app.get("/article-details/:id", articleController.article_articleDetails_get);

app.delete("/all-articles/:id", articleController.article_delete); 

app.post("/all-films", filmController.film_post);

app.post("/all-films/:id", filmController.film_put);

app.get("/add-new-film", filmController.film_addNewFilm_get);

app.get("/film-details/:id", filmController.film_filmDetails_get);

app.get("/film-edit/:id", filmController.film_filmEdit_get);

//helmet secure your website by adding http cors
app.use(helmet()); 

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
