
AdobeEdge.bootstrapCallback(function(compId){

	var myComposition = AdobeEdge.getComposition('WevueSPA');
	var myStage = myComposition.getStage();

	var videoContainer = myStage.$(".videoContainer");


	// <source 
	// src="http://s3.amazonaws.com/wevue-production/vues/published/000/173/568/530/640x480/vue.mp4?1398882392" 
	// type="video/mp4">

	//alert('loaded video-controller');
	
	var videoSources = [
		{ 
			"src" : "http://s3.amazonaws.com/wevue-production/vues/published/000/173/568/530/640x480/vue.webm?1398882392",
			"type" : "video/webm"
		},
		{ 
			"src" : "http://s3.amazonaws.com/wevue-production/vues/published/000/173/568/530/640x480/vue.ogv?1398882392",
			"type" : "video/ogv"
		},
		{ 
			"src" : "http://s3.amazonaws.com/wevue-production/vues/published/000/173/568/530/640x480/vue.mp4?1398882392",
			"type" : "video/mp4"
		}

	];



	videoContainer.html('<source src='+videoSources[0].src+'>');
	console.log('videoContainer: ', videoContainer.html());



	function changeVideo(src){
		alert('src arg: '+ src);
		$('#Stage_vue3').children()[0].attr('src', videoSources[0].src).attr('type', videoSources[0].type);
		$('#Stage_vue3').children()[1].attr('src', videoSources[1].src).attr('type', videoSources[1].type);
		$('#Stage_vue3').children()[2].attr('src', videoSources[2].src).attr('type', videoSources[2].type);
	};

	//$("<link/>",{"rel":"stylesheet", "type":"text/css", "href":"css/myStyles.css" }).appendTo("#Stage");

});
