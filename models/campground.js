var mongoose= require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description:String,
	price:String,
	createdAt: {
		type:Date,
		default:Date.now

	},
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[
	{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});

module.exports = mongoose.model("Campground",campgroundSchema);

//Schema setup

// Campgrounds.create(
// {
// 	name:"Himanchal" ,
// 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvBQMMJLYsKtBg28dlOGG0jyG3XwUAq7W-m3b6AOmxr8W1cZF"
//     description:"this really very nice campground"
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("newly created campground: ");
// 		console.log(campground);
// 	}
// });

// var campgrounds=[
// 	{name:"Himanchal" ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvBQMMJLYsKtBg28dlOGG0jyG3XwUAq7W-m3b6AOmxr8W1cZF"},
// 	{name:"Kashmir",image:"https://www.backpackerguide.nz/wp-content/uploads/2016/01/free-campsites-in-the-north-island.jpg"},
// 	{name:"Ladakh",image:"http://www.wavescampground.com/wp-content/uploads/2016/04/Waves-Campers-1200x800-1200x800.jpg"},
// 	{name:"masoori",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS98SrbJDxOuK8Bb9kCjY3Fpq2iSFTbfgKq_eFbv9aQr_Wd4Gc"}
// 	];