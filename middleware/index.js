var Campgrounds=require("../models/campground");
var Comment=require("../models/comment");
var flash=require("connect-flash");

var middlewareObj={};
middlewareObj.checkCampgroundOwnership =function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated())
	{

		Campgrounds.findById(req.params.id,function(err,foundCampground){
		    if(err)
		    {
		    	req.flash("error","Campground not found");
			    res.redirect("back");
		    }
		    else
		    {
		    	//does user own the campground
		    	if(foundCampground.author.id.equals(req.user._id)){
		    		next();
		    	}
		    	else
		    	{
		    		req.flash("error","You do not have the permission to do this");
		    		res.redirect("back");
		    	}
			    
		    }
		});
	}
	else{
		req.flash("error","Please Login First");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next)
{
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err)
			{
				req.flash("error","Comment not found");
				res.redirect("back");
			}
			else
			{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else
				{
					req.flash("error","You do not have permission to do that");
					res.redirect("back");
				}
			}
		});
	}else
	{
		req.flash("error","Please Login First");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn= function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First");
	res.redirect("/login");
}
module.exports=middlewareObj;