/**
 *
 *	Matrix Group Branding Area jQuery Plugin
 *	Author: Roger Vandawalker <rvandawalker@matrixgroup.net>, @rjv
 *	Version: 1.0
 *
 *	Dependencies: jQuery 1.4+ (http://jquery.com)
 *	Supports: IE7+, Chrome, Safari, Firefox 3.6+
 *
 *	Copyright (c) 2012 Matrix Group International	<http://matrixgroup.net>
 *	Released under the MIT license
 *	http://www.opensource.org/licenses/mit-license.php
 *
 */

;(function( $, window, document, undefined ) {
	var Branding = {

		init: function( options, elem ) {
			var self = this;

			self.elem = elem;
			self.$elem = $(elem);

			self.options = $.extend( {}, $.fn.matrixBranding.options, options );

			self.$elem.addClass("mtx-branding");
			self.wrapSlides();

			if ( self.getSlideCount() > 1 ) { // only append slide navigation if there is more than one slide
				self.appendSlideNavigation();
			}

			if ( self.options.showSlideIndicators && self.getSlideCount() > 1 ) { // only append slide
				self.appendSlideIndicators();
			}

			self.selectInitialSlide();

			if ( self.options.autoPlay ) {
				self.showTimer = setTimeout(function() {
					self.playSlideshow();
				}, self.options.slideDuration);
			}
		},

		wrapSlides: function() {
			var self = this;

			self.$elem.children().addClass("slide").wrapAll($('<div/>', { "class": "slides-container" }));
		},

		selectInitialSlide: function() {
			var self = this,
					slideNumber = self.options.initialSlide - 1;

			if ( self.options.startWithRandomSlide ) {
				slideNumber = Math.floor(Math.random() * self.getSlideCount());
			}

			self.showSlide(self.$elem.find(".slide").eq(slideNumber));
		},

		appendSlideNavigation: function() {
			var self = this,
					$apn = self.options.assignPreviousNavigation,
					$ann = self.options.assignNextNavigation;

			// assign or create the "previous slide" navigation button

			// if the previous button has been explicitly assigned with a jquery object,
			// add the "previous" click event to it
			if ( $apn instanceof jQuery ) {
				$apn.bind("click",function(e) {
					e.preventDefault();
					if (self.options.pauseOnClick) {
						self.pauseSlideshow();
					}
					self.showPreviousSlide();
				});
			} else {
				$("<a/>", {
					href: 'javascript:void(0);',
					html: self.options.previousButtonText,
					title: "Previous Slide",
					"class": self.options.previousButtonClass,
					click: function(e) {
						e.preventDefault();
						if (self.options.pauseOnClick) {
							self.pauseSlideshow();
						}
						self.showPreviousSlide();
					}
				}).appendTo(self.$elem);
			}

			// if the next button has been explicitly assigned with a jquery object,
			// add the "next" click event to it
			if ( $ann instanceof jQuery ) {
				$ann.bind("click",function(e) {
					e.preventDefault();
					if (self.options.pauseOnClick) {
						self.pauseSlideshow();
					}
					self.showNextSlide();
				});
			} else {
				$("<a/>", {
					href: 'javascript:void(0);',
					html: self.options.nextButtonText,
					title: "Next Slide",
					"class": self.options.nextButtonClass,
					click: function(e) {
						e.preventDefault();
						if (self.options.pauseOnClick) {
							self.pauseSlideshow();
						}
						self.showNextSlide();
					}
				}).appendTo(self.$elem);
			}
		},

		appendSlideIndicators: function() {
			var self = this,
					$indicators = $('<ul/>', { "class": "slide-indicators" }),
					$slides = self.$elem.find(".slide");

			$slides.each( function(i) {
				$('<a>',
					{
						text: (i+1),
						href: '#',
						click: function() {
							var $li = $(this).parent();

							if ( self.options.pauseOnClick ) {
								self.pauseSlideshow();
							}
							self.showSlide( $slides.eq($li.index()) );
						}
					}
				).appendTo($indicators);
			});

			$indicators.children().wrap('<li/>');
			$indicators.appendTo(self.$elem);
		},

		showNextSlide: function() {
			var self = this,
					$slides = self.$elem.find(".slide"),
					$current = $slides.filter("."+self.options.selectedSlideClass);

			if ( ($current.index() + 1) % $slides.length === 0 ) {
				// the last slide has been reached; jump to first slide
				self.showSlide($slides.first());
			} else {
				self.showSlide($current.next(".slide"));
			}
		},

		showPreviousSlide: function() {
			var self = this,
					$slides = self.$elem.find(".slide"),
					$current = $slides.filter("."+self.options.selectedSlideClass);

			if ( $current.index() === 0 ) {
				// we're at the first slide; jump to last slide
				self.showSlide($slides.last());
			} else {
				self.showSlide($current.prev(".slide"));
			}
		},

		showSlide: function( $slide ) {
			var self = this,
					index = $slide.index();

			$slide.addClass(self.options.selectedSlideClass).fadeIn(self.options.transitionDuration)
				.siblings().removeClass(self.options.selectedSlideClass).fadeOut(self.options.transitionDuration);

			self.showSlideIndicator($slide);
		},

		showSlideIndicator: function( $slide ) {
			var self = this,
					index = $slide.index();

			if ( self.options.showSlideIndicators ) {
				self.$elem.find(".slide-indicators").children().eq(index).addClass(self.options.selectedSlideClass)
					.siblings().removeClass(self.options.selectedSlideClass);
			}
		},

		playSlideshow: function() {
			var self = this;

			self.showNextSlide();

			self.showTimer = setTimeout(function() {
				self.playSlideshow();
			}, self.options.slideDuration);
		},

		pauseSlideshow: function() {
			var self = this;
			clearTimeout(self.showTimer);
		},

		getSlideCount: function() {
			var self = this,
					$slides = self.$elem.find(".slide");

			return $slides.length;
		}

	};

	$.fn.matrixBranding = function( options ) {
		return this.each(function() {

			var branding = Object.create( Branding );
			branding.init( options, this );

		});
	};

	$.fn.matrixBranding.options = {
		nextButtonClass: 'next',				// class name applied to the "next" button
		previousButtonClass: 'prev',		// class name applied to the "previous" button
		nextButtonText: '&rarr;',				// text for the auto-generated "next" button
		previousButtonText: '&larr;',		// text for the auto-generated "previous" button
		selectedSlideClass: 'current',	// class name applied to the visible slide
		transitionDuration: 400,				// number in ms for how long a slide transition should be
		slideDuration: 6000,						// number in ms for how long a slide should show
		autoPlay: true,									// set to false to prevent an automatic slideshow
		pauseOnClick: true,							// set to false to prevent pausing the slideshow on clicking slide navigation
		showSlideIndicators: false,			// set to true to automatically add a slide navigation list
		initialSlide: 1,								// explictly set a slide to show first
		startWithRandomSlide: false,		// set to true for a random initial slide
		assignNextNavigation: '',				// a jquery object to be binded as slide navigation
		assignPreviousNavigation: ''		// a jquery object to be binded as slide navigation
	};
})( jQuery, window, document );


// Polyfill for Object.create method
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}