var express=require("express");
var router = express.Router();
var Campgrounds =require("../models/campground");
var Comment = require("../models/comment");
var middleware  =require("../middleware/index.js");

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campgrounds.findById(req.params.id,function(err,campground){
		if(err)
		{
			req.flash("error","Something went wrong");
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	});
	
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	Campgrounds.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
			req.flash("error","Something went wrong");
			redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
				{
					req.flash("error","something went wrong");
					console.log(err);
				}
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","succesfully added comment")
					res.redirect(`/campgrounds/`+campground._id);
				}
			});
		}
	});
});
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	req.flash("error","Please Login First");
// 	res.redirect("/login");
// }
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
		{
			
			res.redirect("back");
		}
		else
		{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
	
});
//update route
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//delete route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			req.flash("success","Comment deleted succesfully");
			res.redirect("back");
		}
	});
});
module.exports=router;