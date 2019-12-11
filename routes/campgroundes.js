var express=require("express");
var router = express.Router();
var Campgrounds =require("../models/campground");
var middleware  =require("../middleware/index.js");
router.get("/campgrounds",function(req,res){
	//res.render("campgrounds",{campgrounds:campgrounds});
    //Get all campgrounds from the db
    Campgrounds.find({},function(err,allCampgrounds){
    	if(err)
    	{
    		console.log(err);
    	}
    	else{
    		res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds,currentUser:req.user});
    	}
    });

});

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	//get data from form and add to campground
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var price=req.body.price;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCampground={name:name,image:image,description:desc,price:price,author:author};
	//create a new campground and save to db
	Campgrounds.create(newCampground,function(err,newlyCreated){
		if(err)
		{
			console.log(err);
		}
		else
			res.redirect("/campgrounds");
	});
	//campgrounds.push(newCampground); ---used when array was used
	//redirect back to campgrounds page
	//res.redirect("/campgrounds");
});

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id",function(req,res){
	//find the campground with provided
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundCampground)
    {
    	if(err)
    	{
    		console.log(err);
    	}else{
    		console.log(foundCampground);
    		res.render("campgrounds/show",{campground: foundCampground});
    	}
    });
	
   // res.send("this page is show page");
});
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	req.flash("error","Please Login First");
// 	res.redirect("/login");
// }
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

    Campgrounds.findById(req.params.id,function(err,foundCampground){
		    
		    res.render("campgrounds/edit",{campground: foundCampground});
		});
	
});
//update campground route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){

	Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
		{
			res.redirect("/campgrounds");
		}else
		{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//delete campground
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campgrounds.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else
		{
			req.flash("success","Campground deleted successfully");
			res.redirect("/campgrounds");
		}
	});
});
module.exports=router;