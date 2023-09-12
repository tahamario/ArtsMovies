const Article = require("../models/articleSchema");
// name structure => article_vueFileName_methode


const article_addNewArticle_get = (req, res) => {
    res.render("article/add-new-article", { title: "Add new article" });
}

const article_post = (req, res) => {
    const article = new Article(req.body);

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
    article.save().then(() => { res.redirect('/home'); }).catch(err => { console.log(err) });
}

const article_articleDetails_get = (req, res) => {
    Article.findById(req.params.id).then(
        reslt => { res.render("article/articleDetails", { title: "Article details", article: reslt }); })
        .catch(err => { console.log(err) })
}

const article_articleEdit_get = (req, res) => {
    Article.findById(req.params.id).then(
        reslt => { res.render("article/articleEdit", { title: "Article Edit", article: reslt }); })
        .catch(err => { console.log(err) })
}

const article_articleEdit_post = (req, res) => {
    Article.findByIdAndUpdate(req.body.id, req.body)
        .then(() => { res.redirect('/home') })
        .catch(err => { console.log(err) });
}

const article_delete = (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ mylink: "/home" });
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    article_addNewArticle_get,
    article_post,
    article_articleDetails_get,
    article_articleEdit_get,
    article_articleEdit_post,
    article_delete,
}