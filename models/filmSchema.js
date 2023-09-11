const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const filmSchema = new Schema({
  title: String,
  releaseDate: Date,
  type: String,
});
 
 
// Create a model based on that schema
const Film = mongoose.model("Film", filmSchema);
 
 
// export the model
module.exports = Film; 