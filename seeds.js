var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment= require("./models/comment");

var data=[
	{name:"Himanchal" ,
	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvBQMMJLYsKtBg28dlOGG0jyG3XwUAq7W-m3b6AOmxr8W1cZF",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
	{name:"Kashmir",
	image:"https://www.backpackerguide.nz/wp-content/uploads/2016/01/free-campsites-in-the-north-island.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
	{name:"Ladakh",
	image:"http://www.wavescampground.com/wp-content/uploads/2016/04/Waves-Campers-1200x800-1200x800.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
	{name:"masoori",
	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS98SrbJDxOuK8Bb9kCjY3Fpq2iSFTbfgKq_eFbv9aQr_Wd4Gc",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
	];

function seedDB(){
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
		console.log("removed campground");
		data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){
				console.log(err);
			}else{
				console.log("added a campground");
				Comment.create( {
					text:"thgdyeincgbrdjlofmdbhn",
					author:"Homer"
				},function(err,comment){
					if(err)
					{
						console.log(err);
					}else{
						campground.comments.push(comment);
						campground.save();
						console.log("created comment");
					}
				});
			}
		});
	});
});

}
module.exports =seedDB;

// Comment.create(
// {
// 	text:"thidgjshyfbkkllf,fmjgkm",
// 	author:"homer"
// },function(err,comment){
// 	if(err)
// 	{
// 	console.log(err);
// 	}
// 	else
// 	{
// 	     Campground.comments.push(comment);
// 	     Campground.save();
// 	}
// });