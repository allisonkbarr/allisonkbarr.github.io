---
layout: post
title:  "Calculating Coordinates for a Kata"
date:   2016-04-08 16:50:00 +0100
categories:
---

Just a brief post to share another kata solution I am happy with from my recent time on Codewars.  [The problem](http://www.codewars.com/kata/54da539698b8a2ad76000228/train/javascript) asks you to calculate whether a walk described in an array (with one-block lengths of n, s, e, and w that each take 1 minute to walk) will:
a) take 10 minutes, and
b) get you back to where you started.

At first, I approached the problem by thinking of the coordinates as an ordered pair. For example, your starting position could be described as [0, 0], and at the end of the function you would check if the ending coordinates were also [0, 0].

With that in mind, I built out a switch statement so that, for instance, the case of 'n' would return [x, y+1]. My intention was to then use reduce on the given walk array to calculate the ending coordinates. This got me tripped up, though, and I couldn't quite figure out how to implement reduce in a simple manner to work with the given data.

So I took a step back and thought about the problem a little differently. Ultimately, what you are looking for is for the N's and S's to cancel each other out, and likewise for the E's and W's. So you can just count the occurrence of each, subtract for each pair, and see if you get 0.

Here's what I came up with:

{% highlight javascript %}
function occurDiff(arr, x, y) {
  return arr.filter(a => a === x).length - arr.filter(b => b === y).length
}

function isValidWalk(walk) {
  if (walk.length != 10) return false
  return occurDiff(walk, 'n', 's') === 0 && occurDiff(walk, 'e', 'w') === 0
}
{% endhighlight %}

A couple more notes on things I tried to do here:
- For a small performance improvement, I put my check for the 10-minute requirement at the top of the function.
- I broke out the function that calculates the difference in occurrences of two values in an array. This would allow it to be reused, makes it easier to test each individual part of the overall solution, and hopefully also makes the code a bit easier to read.

If I were to revisit this problem again, I would look for a way to improve the efficiency by reducing the number of times it runs over the walk array. Including calculating the length, it currently does so four times.
