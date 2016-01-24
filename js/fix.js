
$(document).ready(function(e) {			
	t = $('.menu').offset().top;
	mh = $('.container').height();
	fh = $('.menu').height();
	$('.menu').css('position','fixed');
	$(window).scroll(function(e){
		s = $(document).scrollTop();	
		if(s + fh > mh){
			$('.menu').css('top',mh-s-fh+'px');	
		}				
	})
});
