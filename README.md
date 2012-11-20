# Branding Area plugin for jQuery

A simple branding area (slideshow) plugin that is made to be used out of the box.

## Quick Start

### Include the jQuery plugin and files

Download the plugin and replace any instances of `/path/to/` in the snippet below with what is appropriate for your hosting environment.

```html
<link rel="stylesheet" href="/path/to/jquery.matrix.branding.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="/path/to/jquery.matrix.branding.js"></script>
```

### Write/generate the markup

You must have one container element. Within that element, there should be a DIV for every slide. The slide should contain an image for the background (assigned via the *slide-background* class) and a DIV for the optional slide content (assigned via the *slide-content* class).

```html
<div id="branding">
	<div>
		<img src="image1.jpg" alt="" class="slide-background">
		<div class="slide-content">first slide</div>
	</div>
	<div>
		<img src="image2.jpg" alt="" class="slide-background">
		<div class="slide-content">second slide</div>
	</div>
	<div>
		<img src="image3.jpg" alt="" class="slide-background">
		<div class="slide-content">third slide</div>
	</div>
</div>
```

### Initiate the branding area plugin

This snippet should go right before your closing `</body>` tag.

```html
<script>
	$(function(){
		$("#branding").matrixBranding();
	});
</script>
```

For more information and options, view the [documentation](http://demonstration.dev.matrixgroup.net/branding/).