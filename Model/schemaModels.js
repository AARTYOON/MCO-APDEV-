const mongoose = require('mongoose'); // Database
mongoose.connect('mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt'); // Database Link

const replySchema = new mongoose.Schema({
    owner_id    :   {type: mongoose.Schema.ObjectId},
    resto_id    :   {type: mongoose.Schema.ObjectId},
    reviewofR   :   {type: mongoose.Schema.ObjectId},
    reply       :   {type: String},
    datemade    :   {type: Date}
},{versionKey: false})

const reviewSchema = new mongoose.Schema({
    users_id    :   {type: mongoose.Schema.ObjectId},
    restuarant  :   {type: String},
    review      :   {type: String},
    likes       :   {type: Number, default: 0},
    dislikes    :   {type: Number, default: 0},
    reply       :   {type: mongoose.Schema.ObjectId},
    isRecommend :   {type: Boolean},
    datemade    :   {type: Date}
},{versionKey: false});

const restaurantSchema = new mongoose.Schema({
    restaurantimgs  :   {type: [String]},
    restoname       :   {type: String},
    restodesc       :   {type: String},
    location        :   {type: String},
    address         :   {type: String},
    openingHours    :   {type: String},
    owner_id        :   {type: mongoose.Schema.ObjectId},
    contactnum      :   {type: Number},
    foodtype        :   {type: [String]},
    restotype       :   {type: String},
    address         :   {type: String},
    likes           :   {type: Number, default: 0},
    dislikes        :   {type: Number, default: 0},
    stars           :   {type: Number, default: 0},
    reviews         :   {type: [reviewSchema], default: []}
},{versionKey: false});

const userSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    likedresto  :   {type: [String], default : []}, //names
    preferences : {
        isLike      : { type: [String], default: [] }, 
        isDislike   : { type: [String], default: [] } 
    },
    reviews     :   {type: [reviewSchema], default : []},
    friends     :   {type: [mongoose.Schema.ObjectId], default : []}
},{versionKey: false});

const ownerSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    contactinfo : {
        title       : { type: [String], default: [] }, 
        links       : { type: [String], default: [] } 
    },
    replies     :   {type: [replySchema], default : []},
    restaurants :   {type: [restaurantSchema], default: []}
},{versionKey: false});

const replyModel = mongoose.model('replies', replySchema);
const reviewModel = mongoose.model('reviews', reviewSchema);
const restaurantModel = mongoose.model('restaurants', restaurantSchema);
const userModel = mongoose.model('users', userSchema);
const ownerModel = mongoose.model('owners', ownerSchema);

module.exports = {
    replyModel,
    reviewModel,
    restaurantModel,
    userModel,
    ownerModel
}