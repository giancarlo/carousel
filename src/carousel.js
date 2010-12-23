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
	/* Private Methods */

	/** @const */ VISIBLE_CLASS = 'visible',

	setImage = function(img, x, y, w, h)
	{
		img.style.cssText = "left:" + x + "px; top:"+y+"px;width:"+w+"px;height:"+h+"px;";
	},

	resetImage = function(img)
	{
		setImage(img, 0, 0, img.owidth, img.oheight);
	},

	/* Constructor */
	Carousel = function(element, options)
	{
	var 
		images  = element.getElementsByTagName('IMG'),
		figures = element.getElementsByTagName('FIGURE'),
		links=[],
		i,
		expansion = 0,
		/* OPTIONS */
		timeout = (options && options.timeout) || 4000, 
		expand  = (options && options.expand)  || 30, 
		/* ELEMENTS */
		nav = document.createElement('DIV'),
		span,
		visible = 0,

		/* Event Handlers */

		onTimeout = function()
		{
			var vis  = images[visible]; 

			if (expansion++ == expand)
			{
				var fig     = figures[visible], link = links[visible],
				    next    = images[++visible] || images[visible = 0],
				    nextfig = figures[visible], nextlink = links[visible]
				;

				resetImage(next);
				expansion = 0;
				fig.className = link.className = '';
				nextfig.className = nextlink.className = VISIBLE_CLASS;
			}
			else
				setImage(vis, -expansion, -expansion, vis.owidth+expansion*2, vis.oheight+expansion*2);
		},
		onClick = function() 
		{ 
			figures[visible].className='';
			links[visible].className='';
			visible=(this.value==0 ? images.length : this.value)-1;
			expansion=expand;
		}
	;
		// Hide All Images
		for (i=0; i<images.length; i++)
		{
			span = document.createElement('A');
			span.href="javascript:";
			span.onclick = onClick;
			span.value = i;

			images[i].owidth = images[i].width;
			images[i].oheight = images[i].height;

			links.push(span);
			nav.appendChild(span);
		}

		// Show First
		figures[0].className = VISIBLE_CLASS;
		links[0].className   = VISIBLE_CLASS;

		// Add Navigation Bar		
		element.appendChild(nav);

		// Set Timeout
		setInterval(onTimeout, timeout/expand);
	}
;
	
	if (!window.pH)
		window.pH = {};
	
	window.pH.carousel = Carousel;

})(this, document);

