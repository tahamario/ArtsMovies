const Article = require("../models/articleSchema");
const Film = require("../models/filmSchema");
// name structure => article_vueFileName_methode

const article_post = (req, res) => {
    const article = new Article(req.body);

    console.log(req.body);

    //-------- can do this code 
    // article.save((err) => {
    //   if (err) {
    //     console.error(err);
    //     res.send('An error occurred while saving the document.');
    //   } else {
    //     // Redirect to a new link after saving
    //     res.redirect('/all-articles');
    //   }
    // }); 

    //-------- or this code 
    article.save().then(() => { res.redirect('/all-articles'); }).catch(err => { console.log(err) });
}

const article_get = (req, res) => {
    res.redirect("/all-articles");
}

const article_index_get = async  (req, res) => {
    const rsltFilms = await Film.find();
    console.log(rsltFilms);
    Article.find().then(
        reslt => { res.render("index", { title: "Home", trendings: reslt, trendingFilms: rsltFilms }); })
        .catch(err => { console.log(err) })
}

const article_delete = (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ mylink: "/all-articles" });
        })
        .catch((err) => {
            console.log(err);
        });
}

const article_addNewArticle_get = (req, res) => {
    res.render("add-new-article", { title: "Add new article" });
}

const article_articleDetails_get = (req, res) => {
    Article.findById(req.params.id).then(
        reslt => { res.render("articleDetails", { title: "Article details", article: reslt }); })
        .catch(err => { console.log(err) })
}

module.exports = {
    article_post,
    article_get,
    article_index_get,
    article_delete,
    article_addNewArticle_get,
    article_articleDetails_get
}