const Article = require("../models/articleSchema");
const Film = require("../models/filmSchema");

const index_get = (req,res) => {
    res.redirect("/home");
}

const index_index_get = async (req,res) => {
    const rsltFilms = await Film.find();
    await Article.find().then(
        reslt => { res.render("index", { title: "Home", trendings: reslt, trendingFilms: rsltFilms }); })
        .catch(err => { console.log(err) })
}

module.exports = {
    index_index_get,
    index_get,
}