const Film = require("../models/filmSchema");

// name structure => film_vueFileName_methode

const film_addNewFilm_get = (req, res) => {
    res.render("film/add-new-film", { title: "Add new film" });
}

const film_post = (req, res) => {
    const film = new Film(req.body);

    film.save().then(() => { res.redirect('/home'); }).catch(err => { console.log(err) });
}

const film_filmDetails_get = (req, res) => {
    Film.findById(req.params.id).then(
        reslt => { res.render("film/filmDetails", { title: "Film details", film: reslt }); })
        .catch(err => { console.log(err) })
}

const film_filmEdit_get = (req, res) => {
    Film.findById(req.params.id).then(
        reslt => { res.render("film/filmEdit", { title: "Film Edit", film: reslt }); })
        .catch(err => { console.log(err) })
}

const film_filmEdit_post = (req, res) => {
    Film.findByIdAndUpdate(req.body.id, req.body)
    .then(() => { res.redirect('/home') })
    .catch(err => { console.log(err) });
}

const film_delete = (req, res) => {
    Film.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ mylink: "/home" });
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    film_addNewFilm_get,
    film_post,
    film_filmDetails_get,
    film_filmEdit_get,
    film_filmEdit_post,
    film_delete
}