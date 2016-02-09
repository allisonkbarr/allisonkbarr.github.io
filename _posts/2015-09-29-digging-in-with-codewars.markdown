---
layout: post
title:  "Digging in with Codewars"
date:   2015-09-29 18:53:33 +0100
categories:
---
I have recently been enjoying learning via the problems - or katas, as they call them - on <a href="http://www.codewars.com/">Codewars</a>. You can choose from different levels, either training at your own level or challenging yourself with katas that are a level up from you. The entry level is 8 kyu, and I'm currently at 7 kyu, but trying out some of the 6 kyu katas.

In the couple weeks I have been training on Codewars, I feel like I've made a lot of progress in my ability to problem-solve in javascript, both drawing on my knowledge and recent lessons as well as improving at Googling things - an important skill for every developer.

Today, I took on a kata they call Color Choice, which you can find <a href="http://www.codewars.com/kata/55be10de92aad5ef28000023/train/javascript">here</a> if you have a Codewars account.  The problem is math heavy, dealing with factorials and binomial coefficients.  I was very pleased and proud of myself to have solved it, passing all their first tests, only to then find that it fails their second round of (hidden) tests because it times out.

Here's my code:

{% highlight javascript %}
function factorial(n) {
  var multipliers = []
  for (var i = 1; i <= n; i++) {
    multipliers.push(i)
  }
  return multipliers.reduce(function(a, b) { return a * b}, 1)
}

var computeBiCo = (n, x) => factorial(n) / (factorial(x) * factorial(n-x))

function checkchoose(m, n) {
  if (n <= 0 || m <= 0) return -1
  var result = -1
  for (var i = 1; i <= (factorial(n)); i++) {
    if (m <= computeBiCo(n, i)) {
      return result = i
    }
  }
  return result
}
{% endhighlight %}

Any insights?
