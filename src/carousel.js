/**
 * Carousel - pH Namespace
 *
 * Copyright (c) Giancarlo Bellido 2010
 *
 * See LICENSE.
 *
 * Options:
 *
 * timeout	Timeout in microseconds.
 * expand       Value to expand images in pixels.
 */

(function(window, document, undefined)
{
var
	Carousel = function(element, options)
	{
	var 
		images = element.getElementsByTagName('IMG'),
		figures = element.getElementsByTagName('FIGURE'),
		links=[],
		i,
		expansion = 0,
		/* OPTIONS */
		timeout = options ? (options.timeout ? options.timeout : 4000) : 4000,
		expand  = options ? (options.expand  ? options.expand  : 30) : 30,
		/* ELEMENTS */
		nav = document.createElement('DIV'),
		span,
		visible = 0,
		/* METHODS */
		setImage = function(img, x, y, w, h)
		{
			img.style.left = x + "px";
			img.style.top  = y + "px";
			img.width = w;
			img.height = h;
		},
		resetImage = function(img)
		{
			setImage(img, 0, 0, img.owidth, img.oheight);
		},
		onTimeout = function()
		{
			var
				vis  = images[visible], fig = figures[visible], link = links[visible]
			;

			setImage(vis, -expansion, -expansion, vis.owidth+expansion*2, vis.oheight+expansion*2);

			if (++expansion == expand)
			{
				var 
					next = images[++visible] || images[visible = 0],
					nextfig = figures[visible], nextlink = links[visible]
				;

				vis.className = '';
				resetImage(next);
				expansion = 0;
				fig.className = '';
				link.className = '';
				next.className = 'visible';
				nextfig.className = 'visible';
				nextlink.className = 'visible';
			}
		},
		onClick = function() { }
	;
		// Hide All Images
		for (i=0; i<images.length; i++)
		{
			span = document.createElement('A');
			span.href="javascript:";
			span.onclick = onClick;

			images[i].owidth = images[i].width;
			images[i].oheight = images[i].height;

			links.push(span);
			nav.appendChild(span);
		}

		// Show First
		images[0].className = 'visible';
		images[0].owidth = images[0].width;
		images[0].oheight = images[0].height;
		figures[0].className = 'visible';
		links[0].className = 'visible';

		// Add Navigation Bar		
		element.appendChild(nav);

		element.v = element.firstChild;

		// Set Timeout
		setInterval(onTimeout, timeout/expand);
	}
;
	
	if (!window.pH)
		window.pH = {};
	
	window.pH.carousel = Carousel;

})(this, document);

