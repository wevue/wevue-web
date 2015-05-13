$(document).ready(function(){

// --------------------------------------
// 			JB: Shrinking Header
// --------------------------------------

$(window).on("scroll touchmove", function () {
	var theOffset = 7;
	$('.navbar-default .container').toggleClass('tiny', $(document).scrollTop() > theOffset);
	$('body').toggleClass('tiny', $(document).scrollTop() > theOffset);
	$('.navbar-brand img').toggleClass('tiny', $(document).scrollTop() > theOffset);
	$('ul.nav.navbar-nav.navbar-right').toggleClass('tiny', $(document).scrollTop() > theOffset);
	//$('.spa-wrapper').toggleClass('tiny', $(document).scrollTop() > theOffset);
  
});

});