var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    hashed_password: String,
    Recipes: [{id: String, title: String, instruction: String}]
});
mongoose.model('User', UserSchema);

var RecipeSchema = new Schema({
    username: String,
    title: String,
    instruction: String,

});
mongoose.model('Recipe', RecipeSchema);