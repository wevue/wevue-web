$(document).ready(function(){
	// prettyPhoto
	$("a[class^='prettyPhoto']").prettyPhoto();

	// plugin carousel
	$('.carousel').carousel();

	// jQuery onePageNav 
	$('.one-page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollOffset: 94,
		scrollThreshold: 0.1,
		easing: 'swing',
		filter: ':not(.external-link)'
	});
	

	// jquery plugin cycle
	$('.list-testimonial').cycle({
		slides: 'li',
		pager: ".testimonial-bullets",
		timeout: 0,
		autoHeight: 0,
		centerHorz: true
	});

	// size testimonial 
	$('.list-testimonial').on( 'cycle-update-view', function(e,o,sh,cs) {
		var $this = $(this);

        $this.animate({
          height: $(cs).height()
        }, 500);

        $(window).resize(function() {
          $this.stop().animate({
            height: $(cs).height()
          }, 500);
        });
      });


	// JB: smooth scroll to download section
	$('.download-nav').on('click', function() {
		$.scrollTo($('#section-download'), 750, {
			axis: 'y',
			easing: 'swing',
			offset: {
				top: 2
			},
		});
	});

});
