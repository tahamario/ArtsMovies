const Film = require("../models/filmSchema");

// name structure => film_vueFileName_methode


const film_post = (req, res) => {
    const film = new Film(req.body);

    console.log(req.body);

    film.save().then(() => { res.redirect('/'); }).catch(err => { console.log(err) });
}

const film_put = (req, res) => {
    Film.findByIdAndUpdate(req.params.id,req.body).then(() => { res.redirect('/') }).catch(err => { console.log(err) });
}

const film_addNewFilm_get = (req, res) => {
    res.render("add-new-film", { title: "Add new film" });
}

const film_filmDetails_get = (req, res) => {
    Film.findById(req.params.id).then(
        reslt => { res.render("FilmDetails", { title: "Film details", film: reslt }); })
        .catch(err => { console.log(err) })
}

const film_filmEdit_get = (req, res) => {
    Film.findById(req.params.id).then(
        reslt => { res.render("FilmEdit", { title: "Film Edit", film: reslt }); })
        .catch(err => { console.log(err) })
}

module.exports = {
    film_post,
    film_addNewFilm_get,
    film_filmDetails_get,
    film_filmEdit_get,
    film_put
}