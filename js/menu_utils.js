// MenuUtils.js
// Jeff Boothe
// 09.25.2014

$(document).ready(function(){

// --------------------------------------
// 		Shrink Header on Scroll
// --------------------------------------

	$(window).on("scroll touchmove", function () {
		var theOffset = 7;
		$('.navbar-default .container').toggleClass('tiny', $(document).scrollTop() > theOffset);
		$('body').toggleClass('tiny', $(document).scrollTop() > theOffset);
		$('.navbar-brand img').toggleClass('tiny', $(document).scrollTop() > theOffset);
		$('ul.nav.navbar-nav.navbar-right').toggleClass('tiny', $(document).scrollTop() > theOffset);	  
	});

// --------------------------------------
// 		Close Header Menu On Click
// --------------------------------------

    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

});