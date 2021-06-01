var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campgrounds=require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/users");
var flash=require("connect-flash");
//var User = require("./models/user");
//var seedDB=require("./seeds");
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgroundes");
var authRoutes=require("./routes/index")

//seedDB();
const port= process.env.PORT||3000;
mongoose.connect("mongodb+srv://root:root@cluster0.bflaf.mongodb.net/kAmp14?retryWrites=true&w=majority");


app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(flash());

app.locals.moment =require("moment");

//passport configuration
app.use(require("express-session")({
	secret:"anju",
	resave: false,
	saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 app.use(function(req,res,next){
 	res.locals.currentUser=req.user;
 	res.locals.error=req.flash("error");
 	res.locals.success=req.flash("success");
 	next();
 });

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(port,(req,res) =>{
	console.log("app is listening");
});
