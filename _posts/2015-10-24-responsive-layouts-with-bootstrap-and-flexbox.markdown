---
layout: post
title:  "Responsive Layouts with Bootstrap and Flexbox"
date:   2015-10-24 18:53:33 +0100
categories:
---
I recently picked up a small project that gave me an opportunity to play around with CSS and, in particular, responsive layouts.  The task was to build the front-end for a new, WIP image server product. My cohort sketched up a couple wireframes - a landing page, dashboard, and documentation page - and suggested I check out Bootstrap as a starting point.

To see the site as it currently stands, you can check it out <a href="http://www.tempus-app.com/">here</a>.  Sign up with your Google account to see the dashboard and documentation pages.  Note that though the site is functional and hooked up to Firebase, the service itself is in Beta.  Description text is currently lorem ipsum, and documentation is stubbed.

This was a fun discovery process for me, and for 3 days, it was hard to pull me away from my computer.  I chose Bootstrap's own <a href="http://getbootstrap.com/">landing page</a> as inspiration for the landing page, with its bold masthead and large type.  I was perhaps most excited to play with the responsive layout tools that Bootstrap offers with its grid system.

The longer I worked on the styles, though, the more I found myself overwriting all the default Bootstrap styles.  Similarly, as I worked on the layout, I came across alignment issues for which I didn't find any solutions in Bootstrap.

Enter Flexbox.  Asking my partner for advice in the alignment of the items in the horizontal header, he introduced me to a simple solution - display: flex; align-items: center.  And to pull the log-out button over to the right edge - margin-left: auto.  Et voila!

I was very impressed and intrigued by Flexbox, but I quickly discovered that Flexbox and Bootstrap's grid system do not play together nicely.  Items aligned through flex properties will override the Bootstrap column settings - so that horizontal header will remain horizontal, even though you told its items to be col-xs-12.  Discovering this, I began removing the Bootstrap column classes I had added and replacing them with flex styles - and found myself really loving it.

Through my short experience now using both technologies, I would say the concepts behind them are quite different. Bootstrap's grid is based on width percentages and breakpoints, and to adjust space between the items you have to work with margins and padding explicitly.  On the other hand, Flexbox allows you to set widths of your items separately from setting how you would like them to be aligned and spaced out, and the alignment properties are higher level and more intuitive.

Flexbox also allows you to set what amount to guidelines for how content should respond to changing screen widths, rather than strict rules with breakpoints.  You can set a container to either wrap or no-wrap, accordingly.  That said, I still ultimately found it easiest to set breakpoints and specify new flex properties for small screens.  My three "features" columns on the landing page become vertically stacked (flex-direction: column, instead of the default, row), as does the form on the dashboard.

It feels like creating layouts has gotten so much easier since I first began to learn basic CSS years ago, and it is exciting to see new developments continuing, as well.  Flexbox works really well for simpler layouts, but for more complexity, it will be cool to see how the <a href="http://www.w3.org/TR/2015/WD-css-grid-1-20150917/">CSS Grid layout module</a> develops, and how it compares with Bootstrap's grid.

A couple resources I've found really helpful for figuring out Flexbox are:
<ul>
	<li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">CSS-Tricks's "A Complete Guide to Flexbox"</a></li>
	<li><a href="https://drafts.csswg.org/css-flexbox-1/">The W3C Editor's Draft for the CSS Flexible Box Layout</a></li>
</ul>
Revisiting that question I first had about the horizontal header, I've now found a solution through Flexbox I like even better.  You still use display: flex and align-items: center - but instead of setting the margin-left, you use justify-content: space-between.  This brings your left- and right-most elements to their respective edges, and spaces out the content in between.  Perfect.

I haven't yet made the full swap out to Flexbox on this project, though.  On the dashboard, there is one section where I have found Bootstrap's grid system to be just what I need - a table. Because what is more grid-like than a table?
